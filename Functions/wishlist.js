// Wishlist Management System
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wishlist system initializing...');
    updateWishlistCount();
    updateCartCount();
    
    if (document.getElementById('wishlistItems')) {
        loadWishlistItems();
        initializeWishlistFilters();
        loadRecommendedProducts();
    }
});

// Get all products from store - prefer the store's product list when available
// Fallback to a small embedded list only if the store product function is not present.
const WISHLIST_FALLBACK_PRODUCTS = [
    { id: 1, name: 'Artisan Bread', price: 4.99, originalPrice: 5.99, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'bakery', stock: 25, rating: 4.6, reviews: 145, description: 'Traditional artisan bread with crispy crust and soft interior. Baked fresh daily.' },
    { id: 2, name: 'Chocolate Cake', price: 18.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'bakery', stock: 8, rating: 4.9, reviews: 92, description: 'Rich, moist chocolate cake with creamy frosting. Perfect for celebrations.' },
    { id: 3, name: 'French Croissants', price: 6.99, originalPrice: 7.99, image: '../Images/Croissants.jpg', category: 'bakery', stock: 15, rating: 4.7, reviews: 178, description: 'Buttery, flaky French croissants with delicate layers.' },
    { id: 4, name: 'Farm Fresh Milk', price: 3.49, originalPrice: null, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'dairy', stock: 12, rating: 4.3, reviews: 89, description: 'Premium whole milk from local farms. Rich and creamy.' },
    { id: 5, name: 'Aged Cheddar Cheese', price: 8.99, originalPrice: 9.99, image: '../Images/Cheese.jpg', category: 'dairy', stock: 10, rating: 4.8, reviews: 178, description: 'Premium aged cheddar with rich, sharp flavor.' },
    { id: 6, name: 'Greek Yogurt', price: 5.99, originalPrice: 6.99, image: '../Images/Yogurt.jpg', category: 'dairy', stock: 20, rating: 4.6, reviews: 112, description: 'Thick, creamy Greek yogurt packed with protein.' },
    { id: 7, name: 'Fresh Organic Apples', price: 4.99, originalPrice: 6.99, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'fruits', stock: 35, rating: 4.5, reviews: 128, description: 'Premium organic red apples, crisp and sweet.' },
    { id: 8, name: 'Fresh Bananas', price: 2.49, originalPrice: null, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'fruits', stock: 50, rating: 4.4, reviews: 156, description: 'Naturally ripened bananas, perfect sweetness.' },
    { id: 9, name: 'Fresh Mangoes', price: 5.99, originalPrice: 7.99, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'fruits', stock: 15, rating: 4.7, reviews: 89, description: 'Sweet, juicy mangoes packed with vitamins.' },
    { id: 10, name: 'Premium Chicken Breast', price: 12.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'meat', stock: 8, rating: 4.7, reviews: 203, description: 'Boneless, skinless chicken breast. Lean protein.' }
];

function getAllProducts() {
    // Prefer the store's product source when available (prevents duplicate lists and keeps a single source of truth)
    if (typeof window.getStoreProducts === 'function') {
        try {
            const storeProducts = window.getStoreProducts();
            if (Array.isArray(storeProducts) && storeProducts.length > 0) return storeProducts;
        } catch (e) {
            console.warn('wishlist.js: failed to call window.getStoreProducts()', e);
        }
    }

    // If the store product list isn't available, fall back to the embedded (small) list
    return WISHLIST_FALLBACK_PRODUCTS.slice();
}

// Wishlist Management
function getWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('freshmartWishlist')) || [];
    console.log('Current wishlist:', wishlist);
    return wishlist;
}

function saveWishlist(wishlist) {
    localStorage.setItem('freshmartWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    console.log('Wishlist saved:', wishlist);
}

function updateWishlistCount() {
    const wishlist = getWishlist();
    const totalCount = wishlist.length;
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    
    wishlistCountElements.forEach(element => {
        element.textContent = totalCount;
        element.style.display = totalCount > 0 ? 'flex' : 'none';
        
        // Add animation
        if (totalCount > 0) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'heartBeat 1s ease';
            }, 10);
        }
    });
}

// Toggle Wishlist - if the store already provides a toggleWishlist function prefer that
if (typeof window.toggleWishlist === 'undefined') {
    window.toggleWishlist = function (productId) {
        let wishlist = getWishlist();
        const productIndex = wishlist.findIndex(id => id === productId);
        const product = getProductById(productId);

        if (!product) {
            showNotification('Product not found!', 'error');
            return;
        }

        // Create floating heart animation
        createFloatingHeart();

        if (productIndex !== -1) {
            // Remove from wishlist
            wishlist.splice(productIndex, 1);
            showNotification(`${product.name} removed from wishlist 💔`, 'info');
            
            // Update button states
            updateWishlistButtons(productId, false);
        } else {
            // Add to wishlist
            wishlist.push(productId);
            showNotification(`${product.name} added to wishlist! ❤️`, 'success');
            
            // Update button states
            updateWishlistButtons(productId, true);
        }

        saveWishlist(wishlist);
        
        // Reload wishlist if on wishlist page
        if (document.getElementById('wishlistItems')) {
            loadWishlistItems();
        }
    };
}

function updateWishlistButtons(productId, isInWishlist) {
    const buttons = document.querySelectorAll(`[onclick*="toggleWishlist(${productId})"]`);
    buttons.forEach(btn => {
        if (isInWishlist) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-heart';
            }
        } else {
            btn.classList.remove('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'far fa-heart';
            }
        }
    });
}

// Create floating heart animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        font-size: 3rem;
        color: #e74c3c;
        z-index: 10000;
        pointer-events: none;
        animation: floatUpHeart 1s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Add floating heart animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUpHeart {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            transform: translate(-50%, -80%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -120%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Get product by ID
// Robust getProductById that uses the unified product source and handles numeric/string ids
function getProductById(id) {
    const productId = parseInt(id, 10);
    if (Number.isNaN(productId)) return undefined;

    const products = getAllProducts();
    return products.find(product => product.id === productId);
}

// Load Wishlist Items
function loadWishlistItems() {
    const wishlist = getWishlist();
    const wishlistContainer = document.getElementById('wishlistItems');
    const emptyWishlist = document.getElementById('emptyWishlist');
    const itemsCount = document.getElementById('itemsCount');
    const addAllBtn = document.getElementById('addAllToCart');
    
    console.log('Loading wishlist items:', wishlist.length);

    if (wishlist.length === 0) {
        if (wishlistContainer) wishlistContainer.innerHTML = '';
        if (emptyWishlist) emptyWishlist.classList.add('show');
        if (itemsCount) itemsCount.textContent = '0 items';
        if (addAllBtn) addAllBtn.disabled = true;
        updateWishlistStats([]); return;
    }

    if (emptyWishlist) emptyWishlist.classList.remove('show');

    // Get full product details
    const wishlistProducts = wishlist.map(id => getProductById(id)).filter(p => p !== undefined);

    wishlistContainer.innerHTML = wishlistProducts.map((product, index) => `
        <div class="wishlist-item" data-id="${product.id}" style="animation: slideInUp 0.5s ease ${index * 0.1}s both;">
            ${product.originalPrice && product.originalPrice > product.price ? 
                `<div class="wishlist-item-badge">Save $${(product.originalPrice - product.price).toFixed(2)}</div>` : ''}
            
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150x150?text=Product+Image'">
            </div>
            
            <div class="wishlist-item-info">
                <div class="wishlist-item-header">
                    <h3 class="wishlist-item-name">${product.name}</h3>
                    <div class="wishlist-item-category">${product.category}</div>
                </div>
                
                <p class="wishlist-item-description">${product.description}</p>
                
                <div class="wishlist-item-meta">
                    <div class="wishlist-item-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="wishlist-item-stock ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}">
                        ${product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? '⚡ Low Stock' : '✗ Out of Stock'}
                    </div>
                </div>
                
                <div class="wishlist-item-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                    ` : ''}
                </div>
            </div>
            
            <div class="wishlist-item-actions">
                <button class="btn-add-to-cart" onclick="addToCartFromWishlist(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="btn-remove" onclick="removeFromWishlist(${product.id})">
                    <i class="fas fa-trash-alt"></i>
                    Remove
                </button>
            </div>
        </div>
    `).join('');

    if (itemsCount) {
        itemsCount.textContent = `${wishlistProducts.length} ${wishlistProducts.length === 1 ? 'item' : 'items'}`;
    }

    if (addAllBtn) {
        const inStockItems = wishlistProducts.filter(p => p.stock > 0);
        addAllBtn.disabled = inStockItems.length === 0;
    }

    updateWishlistStats(wishlistProducts);
}

// Update Wishlist Statistics
function updateWishlistStats(products) {
    // Total items
    const totalItems = document.getElementById('totalWishlistItems');
    if (totalItems) totalItems.textContent = products.length;

    // Items on sale
    const onSaleItems = products.filter(p => p.originalPrice && p.originalPrice > p.price).length;
    const onSaleElement = document.getElementById('itemsOnSale');
    if (onSaleElement) onSaleElement.textContent = onSaleItems;

    // In stock items
    const inStockItems = products.filter(p => p.stock > 0).length;
    const inStockElement = document.getElementById('inStockItems');
    if (inStockElement) inStockElement.textContent = inStockItems;

    // Total value
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const totalValueElement = document.getElementById('totalValue');
    if (totalValueElement) {
        totalValueElement.textContent = `${totalValue.toFixed(2)}`;
        totalValueElement.style.animation = 'pulse 0.5s ease';
    }

    // Total savings
    const totalSavings = products.reduce((sum, p) => {
        if (p.originalPrice) {
            return sum + (p.originalPrice - p.price);
        }
        return sum;
    }, 0);
    const savingsElement = document.getElementById('totalSavings');
    if (savingsElement) {
        savingsElement.textContent = `Potential savings: ${totalSavings.toFixed(2)}`;
    }

    // Category breakdown
    updateCategoryBreakdown(products);
}

// Update Category Breakdown
function updateCategoryBreakdown(products) {
    const categoryList = document.getElementById('categoryList');
    if (!categoryList) return;

    const categories = {};
    products.forEach(product => {
        const cat = product.category;
        if (!categories[cat]) {
            categories[cat] = 0;
        }
        categories[cat]++;
    });

    categoryList.innerHTML = Object.entries(categories).map(([category, count]) => `
        <div class="category-item">
            <span class="category-name">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <span class="category-count">${count}</span>
        </div>
    `).join('');
}

// Wishlist Filters
function initializeWishlistFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            const filter = this.getAttribute('data-filter');
            filterWishlistItems(filter);
        });
    });
}

function filterWishlistItems(filter) {
    const wishlist = getWishlist();
    let products = wishlist.map(id => getProductById(id)).filter(p => p !== undefined);

    switch(filter) {
        case 'sale':
            products = products.filter(p => p.originalPrice && p.originalPrice > p.price);
            break;
        case 'stock':
            products = products.filter(p => p.stock > 0);
            break;
        case 'outofstock':
            products = products.filter(p => p.stock === 0);
            break;
        case 'all':
        default:
            // Show all
            break;
    }

    displayFilteredWishlist(products);
    
    if (products.length === 0) {
        showNotification('No items match this filter', 'info');
    }
}

function displayFilteredWishlist(products) {
    const wishlistContainer = document.getElementById('wishlistItems');
    
    if (products.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist show">
                <div class="empty-wishlist-content">
                    <div class="empty-icon">
                        <i class="fas fa-filter"></i>
                    </div>
                    <h3>No items match this filter</h3>
                    <p>Try selecting a different filter option</p>
                </div>
            </div>
        `;
        return;
    }

    wishlistContainer.innerHTML = products.map((product, index) => `
        <div class="wishlist-item" data-id="${product.id}" style="animation: slideInUp 0.5s ease ${index * 0.1}s both;">
            ${product.originalPrice && product.originalPrice > product.price ? 
                `<div class="wishlist-item-badge">Save ${(product.originalPrice - product.price).toFixed(2)}</div>` : ''}
            
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150x150?text=Product+Image'">
            </div>
            
            <div class="wishlist-item-info">
                <div class="wishlist-item-header">
                    <h3 class="wishlist-item-name">${product.name}</h3>
                    <div class="wishlist-item-category">${product.category}</div>
                </div>
                
                <p class="wishlist-item-description">${product.description}</p>
                
                <div class="wishlist-item-meta">
                    <div class="wishlist-item-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="wishlist-item-stock ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}">
                        ${product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? '⚡ Low Stock' : '✗ Out of Stock'}
                    </div>
                </div>
                
                <div class="wishlist-item-price">
                    <span class="current-price">${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">${product.originalPrice.toFixed(2)}</span>
                        <span class="discount-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                    ` : ''}
                </div>
            </div>
            
            <div class="wishlist-item-actions">
                <button class="btn-add-to-cart" onclick="addToCartFromWishlist(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="btn-remove" onclick="removeFromWishlist(${product.id})">
                    <i class="fas fa-trash-alt"></i>
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

// Remove from Wishlist
function removeFromWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    showConfirmDialog(
        `Remove ${product.name}?`,
        'Are you sure you want to remove this item from your wishlist?',
        () => {
            const wishlistItem = document.querySelector(`.wishlist-item[data-id="${productId}"]`);
            if (wishlistItem) {
                wishlistItem.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    let wishlist = getWishlist();
                    wishlist = wishlist.filter(id => id !== productId);
                    saveWishlist(wishlist);
                    loadWishlistItems();
                    showNotification(`${product.name} removed from wishlist`, 'success');
                }, 300);
            }
        }
    );
}

// Clear Wishlist
function clearWishlist() {
    const wishlist = getWishlist();
    if (wishlist.length === 0) {
        showNotification('Your wishlist is already empty', 'info');
        return;
    }

    showConfirmDialog(
        'Clear Wishlist?',
        `Are you sure you want to remove all ${wishlist.length} items from your wishlist?`,
        () => {
            const wishlistItems = document.querySelectorAll('.wishlist-item');
            wishlistItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'slideOutRight 0.3s ease';
                }, index * 50);
            });

            setTimeout(() => {
                localStorage.removeItem('freshmartWishlist');
                loadWishlistItems();
                updateWishlistCount();
                showNotification('Wishlist cleared successfully! 🗑️', 'success');
            }, wishlistItems.length * 50 + 300);
        }
    );
}

// Add to Cart from Wishlist
function addToCartFromWishlist(productId) {
    const product = getProductById(productId);
    if (!product || product.stock === 0) {
        showNotification('Product is out of stock', 'error');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
            showNotification(`${product.name} quantity updated in cart!`, 'success');
        } else {
            showNotification(`Cannot add more. Only ${product.stock} in stock.`, 'warning');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            brand: product.brand || 'FreshMart',
            quantity: 1,
            stock: product.stock
        });
        showNotification(`${product.name} added to cart! 🛒`, 'success');
    }

    localStorage.setItem('freshmartCart', JSON.stringify(cart));
    updateCartCount();
}

// Add All to Cart
function addAllToCart() {
    const wishlist = getWishlist();
    const products = wishlist.map(id => getProductById(id)).filter(p => p && p.stock > 0);

    if (products.length === 0) {
        showNotification('No items available to add to cart', 'warning');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    let addedCount = 0;

    products.forEach(product => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity += 1;
                addedCount++;
            }
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                category: product.category,
                brand: product.brand || 'FreshMart',
                quantity: 1,
                stock: product.stock
            });
            addedCount++;
        }
    });

    localStorage.setItem('freshmartCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${addedCount} items added to cart! 🛒`, 'success');
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounts = document.querySelectorAll('.cart-count');
    
    cartCounts.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Load Recommended Products
function loadRecommendedProducts() {
    const recommendedContainer = document.getElementById('recommendedProducts');
    if (!recommendedContainer) return;

    const wishlist = getWishlist();
    const allProducts = getAllProducts();
    
    // Get products not in wishlist
    const availableProducts = allProducts.filter(p => !wishlist.includes(p.id));
    
    // Shuffle and take 4 random products
    const shuffled = availableProducts.sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 4);

    recommendedContainer.innerHTML = recommended.map((product, index) => `
        <div class="product-card" style="animation: fadeInScale 0.5s ease ${index * 0.1}s both;">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.originalPrice ? `
                    <div class="product-badge">
                        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-category">${product.category}</div>
                <div class="product-price">
                    <span class="current-price">${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">${product.originalPrice.toFixed(2)}</span>
                    ` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-wishlist-toggle" onclick="toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Quick Actions
function shareWishlist() {
    const wishlist = getWishlist();
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }

    const products = wishlist.map(id => getProductById(id)).filter(p => p);
    const shareText = `Check out my FreshMart wishlist!\n\n${products.map(p => `• ${p.name} - ${p.price}`).join('\n')}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My FreshMart Wishlist',
            text: shareText
        }).then(() => {
            showNotification('Wishlist shared successfully!', 'success');
        }).catch(() => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('Wishlist copied to clipboard!', 'success');
}

function printWishlist() {
    const wishlist = getWishlist();
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }

    window.print();
    showNotification('Opening print dialog...', 'info');
}

function exportWishlist() {
    const wishlist = getWishlist();
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }

    const products = wishlist.map(id => getProductById(id)).filter(p => p);
    const content = `FreshMart Wishlist\n\n${products.map(p => `${p.name}\n${p.price}${p.originalPrice ? ` (was ${p.originalPrice})` : ''}\n${p.description}\n`).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'freshmart-wishlist.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Wishlist exported successfully!', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    // If category's unified toast exists, delegate to it for consistent UI
    if (window && typeof window.showToast === 'function') {
        window.showToast(message, type === 'error' ? 'error' : (type === 'warning' ? 'warning' : (type === 'success' ? 'success' : 'info')));
        return;
    }

    const existingToast = document.querySelector('.custom-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `custom-notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Custom Confirm Dialog
function showConfirmDialog(title, message, onConfirm) {
    const existingDialog = document.querySelector('.custom-confirm-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }

    const dialog = document.createElement('div');
    dialog.className = 'custom-confirm-dialog';
    dialog.innerHTML = `
        <div class="confirm-overlay"></div>
        <div class="confirm-content">
            <div class="confirm-header">
                <i class="fas fa-question-circle"></i>
                <h3>${title}</h3>
            </div>
            <div class="confirm-body">
                <p>${message}</p>
            </div>
            <div class="confirm-actions">
                <button class="btn btn-outline cancel-btn">Cancel</button>
                <button class="btn btn-primary confirm-btn">Confirm</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    setTimeout(() => {
        dialog.classList.add('show');
    }, 10);
    
    const confirmBtn = dialog.querySelector('.confirm-btn');
    const cancelBtn = dialog.querySelector('.cancel-btn');
    const overlay = dialog.querySelector('.confirm-overlay');
    
    const closeDialog = () => {
        dialog.classList.remove('show');
        setTimeout(() => {
            dialog.remove();
        }, 300);
    };
    
    confirmBtn.addEventListener('click', () => {
        onConfirm();
        closeDialog();
    });
    
    cancelBtn.addEventListener('click', closeDialog);
    overlay.addEventListener('click', closeDialog);
}

// Global function exports
window.toggleWishlist = toggleWishlist;
window.removeFromWishlist = removeFromWishlist;
window.clearWishlist = clearWishlist;
window.addToCartFromWishlist = addToCartFromWishlist;
window.addAllToCart = addAllToCart;
window.shareWishlist = shareWishlist;
window.printWishlist = printWishlist;
window.exportWishlist = exportWishlist;

console.log('✅ Wishlist system initialized!');