// category.js - FreshMart Categories Page
// COMPLETE & WORKING VERSION

console.log('🔄 FreshMart Categories JS Loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Content Loaded - Initializing Categories');
    initializeAllFeatures();
});

function initializeAllFeatures() {
    console.log('🔄 Initializing all category features...');
    
    loadCategoriesGrid();
    initializeMobileMenu();
    initializeCartFunctionality();
    initializeNewsletter();
    updateActiveNavLink();
    
    console.log('✅ All features initialized successfully');
}

// ===== LOAD CATEGORIES GRID =====
function loadCategoriesGrid() {
    console.log('🔄 Loading categories grid...');
    
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    if (!categoriesGrid) {
        console.error('❌ ERROR: categoriesGrid element not found!');
        console.log('💡 Check if element with id="categoriesGrid" exists in HTML');
        return;
    }
    
    console.log('✅ categoriesGrid found, loading categories...');

    const categories = [
        {
            id: 'fruits',
            name: 'Fruits',
            description: 'Fresh, organic fruits delivered daily. Packed with vitamins and natural sweetness.',
            icon: 'fa-apple-alt',
            color: '#FF5252',
            image: 'https://media.istockphoto.com/id/1718516554/photo/full-frame-of-assortment-of-healthy-and-fresh-fruits.jpg?s=612x612&w=0&k=20&c=vMziY5XGWKDh_JhrsDGlwtcjqAARNazVj_7hL-14ufg=',
            productCount: 25,
            link: 'Fruits.html',
            features: ['Organic', 'Fresh Daily', 'Vitamin Rich']
        },
        {
            id: 'vegetables',
            name: 'Vegetables',
            description: 'Farm-fresh vegetables sourced from local organic farms. Crisp, nutritious, and delicious.',
            icon: 'fa-carrot',
            color: '#4CAF50',
            image: 'https://t3.ftcdn.net/jpg/01/47/51/60/360_F_147516063_hCXI8VUIdBYud0B0hhS3Yo5CFTT1a4g8.jpg',
            productCount: 30,
            link: 'Vegetables.html',
            features: ['Farm Fresh', 'Organic', 'Locally Sourced']
        },
        {
            id: 'dairy',
            name: 'Dairy Products',
            description: 'Premium dairy products including milk, cheese, yogurt, and more. Fresh from local dairies.',
            icon: 'fa-cheese',
            color: '#FFEB3B',
            image: 'https://t4.ftcdn.net/jpg/01/45/60/21/360_F_145602173_05uVexifBuCvWIKvsHGWNuIpPtp5ShkI.jpg',
            productCount: 20,
            link: 'Diary.html',
            features: ['Fresh Daily', 'High Protein', 'Calcium Rich']
        },
        {
            id: 'meat',
            name: 'Meat & Poultry',
            description: 'Premium quality meat and poultry. Fresh, tender, and perfect for your meals.',
            icon: 'fa-drumstick-bite',
            color: '#795548',
            image: 'https://img.freepik.com/premium-photo/assortment-meat-seafood-beef-chicken-fish-pork_996271-13179.jpg',
            productCount: 18,
            link: 'Meat.html',
            features: ['Premium Cut', 'Fresh', 'Hormone Free']
        },
        {
            id: 'beverages',
            name: 'Beverages',
            description: 'Refreshing drinks, juices, and beverages. Stay hydrated with our wide selection.',
            icon: 'fa-wine-bottle',
            color: '#2196F3',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/026/500/574/small_2x/summer-refreshing-beverages-photo.jpg',
            productCount: 35,
            link: 'Beverages.html',
            features: ['Refreshing', 'Natural', 'Sugar Free Options']
        },
        {
            id: 'snacks',
            name: 'Snacks',
            description: 'Delicious snacks and treats for every craving. Perfect for students and busy lifestyles.',
            icon: 'fa-cookie',
            color: '#FF9800',
            image: 'https://www.shutterstock.com/image-photo/salty-snacks-pretzels-chips-crackers-600nw-1055819942.jpg',
            productCount: 40,
            link: 'Snacks.html',
            features: ['Tasty', 'Convenient', 'Student Friendly']
        },
        {
            id: 'pantry',
            name: 'Pantry Staples',
            description: 'Essential pantry items including rice, flour, sugar, and cooking essentials.',
            icon: 'fa-utensils',
            color: '#9C27B0',
            image: 'https://familystylefood.com/wp-content/uploads/2019/03/pantry-essentials-familystylefood.jpg',
            productCount: 50,
            link: 'PantryStaples.html',
            features: ['Essentials', 'Long Lasting', 'Budget Friendly']
        },
        {
            id: 'bakery',
            name: 'Bakery',
            description: 'Fresh-baked bread, pastries, and baked goods. Made fresh daily in our bakery.',
            icon: 'fa-bread-slice',
            color: '#FF5722',
            image: 'https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg',
            productCount: 22,
            link: 'Bakery.html',
            features: ['Fresh Baked', 'Artisan', 'Daily Specials']
        }
    ];

    // Create HTML for all categories
    let categoriesHTML = '';
    
    categories.forEach(category => {
        categoriesHTML += `
            <div class="category-card" data-category="${category.id}">
                <img src="${category.image}" alt="${category.name}" class="category-image">
                <div class="category-content">
                    <div class="category-icon" style="background: ${category.color};">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <div class="category-info">
                        <h3 class="category-title">${category.name}</h3>
                        <p class="category-description">${category.description}</p>
                        <div class="category-stats-small">
                            <div class="category-stat-small">
                                <i class="fas fa-box"></i>
                                <span>${category.productCount}+ Products</span>
                            </div>
                            <div class="category-stat-small">
                                <i class="fas fa-truck"></i>
                                <span>Fast Delivery</span>
                            </div>
                        </div>
                        <div class="category-features">
                            ${category.features.map(feature => 
                                `<span class="feature-tag">${feature}</span>`
                            ).join('')}
                        </div>
                        <div class="category-actions">
                            <a href="${category.link}" class="btn-category" style="background: ${category.color}; border-color: ${category.color};">
                                <i class="fas fa-shopping-bag"></i>
                                Shop Now
                            </a>
                            <a href="${category.link}" class="btn-category-outline" style="color: ${category.color}; border-color: ${category.color};">
                                <i class="fas fa-eye"></i>
                                View All
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Insert categories into grid
    categoriesGrid.innerHTML = categoriesHTML;
    
    console.log(`✅ Successfully loaded ${categories.length} categories!`);
    
    // Add hover effects
    addCategoryCardEffects();
}

// ===== CATEGORY CARD EFFECTS =====
function addCategoryCardEffects() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-title').textContent;
            console.log(`🛒 Category clicked: ${categoryName}`);
        });
    });
    
    console.log('✅ Category card effects added');
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        console.log('✅ Mobile menu elements found');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            console.log('📱 Mobile menu toggled:', navMenu.classList.contains('active'));
        });

        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('📱 Mobile menu closed via link click');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('📱 Mobile menu closed via outside click');
            }
        });
    } else {
        console.log('⚠️ Mobile menu elements not found');
    }
}

// ===== CART FUNCTIONALITY =====
function initializeCartFunctionality() {
    console.log('🔄 Initializing cart functionality...');
    
    // This will be used on individual product pages
    // For category page, we just initialize the cart counter
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        // Initialize cart count from localStorage or set to 0
        const savedCount = localStorage.getItem('freshmartCartCount') || '0';
        cartCount.textContent = savedCount;
        console.log('🛒 Cart count initialized:', savedCount);
    }
}

// ===== ADD TO CART FUNCTION =====
function addToCart(productName, productPrice, productId = null) {
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        count++;
        cartCount.textContent = count;
        
        // Save to localStorage
        localStorage.setItem('freshmartCartCount', count.toString());
        
        // Add animation to cart icon
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
        }
        
        console.log(`🛒 Added to cart: ${productName} - $${productPrice}`);
        showToast(`${productName} added to cart!`, 'success');
    }
}

// ===== NEWSLETTER FUNCTIONALITY =====
function initializeNewsletter() {
    const newsletterForm = document.getElementById('categoryNewsletter');
    
    if (newsletterForm) {
        console.log('✅ Newsletter form found');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate successful subscription
                console.log('📧 Newsletter subscription:', email);
                showToast('Thank you for subscribing! You will receive exclusive category deals.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showToast('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });
    } else {
        console.log('⚠️ Newsletter form not found');
    }
}

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    let activeFound = false;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Check if this link matches current page
        if (linkHref === currentPage) {
            link.classList.add('active');
            activeFound = true;
            console.log(`📍 Active nav link: ${linkHref}`);
        }
    });
    
    // If no exact match found, check for category pages
    if (!activeFound && currentPage !== 'category.html') {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'category.html') {
                link.classList.add('active');
                console.log('📍 Setting Categories as active page');
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message, type = 'success') {
    console.log(`📢 Toast: ${message} (${type})`);
    
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type, 'show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('❌ Global error:', e.error);
});

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.addToCart = addToCart;
window.showToast = showToast;
window.validateEmail = validateEmail;

console.log('✅ FreshMart Categories JS Loaded Successfully!');
console.log('🎯 Ready to display 8 categories on the page');

/*..............................................*/
// Universal Product Category Functions
// This works for all category pages automatically

// Extract product data from the current page
function getProductDataFromPage() {
    const products = {};
    const productCards = document.querySelectorAll('.category-product-card');
    
    productCards.forEach((card, index) => {
        const productId = index + 1;
        const badge = card.querySelector('.category-product-badge');
        const image = card.querySelector('.category-product-image');
        const title = card.querySelector('.category-product-title');
        const description = card.querySelector('.category-product-description');
        const rating = card.querySelector('.category-product-rating span:first-of-type');
        const reviews = card.querySelector('.category-product-rating span:last-of-type');
        const currentPrice = card.querySelector('.category-product-current');
        const originalPrice = card.querySelector('.category-product-original');
        const stock = card.querySelector('.category-product-stock');
        
        // Get category from page header
        const categoryHeader = document.querySelector('.category-header h1');
        const category = categoryHeader ? categoryHeader.textContent : 'Products';
        
        products[productId] = {
            id: productId,
            name: title ? title.textContent : 'Product',
            category: category,
            price: currentPrice ? parseFloat(currentPrice.textContent.replace('$', '')) : 0,
            originalPrice: originalPrice ? parseFloat(originalPrice.textContent.replace('$', '')) : null,
            image: image ? image.src : '',
            rating: rating ? parseFloat(rating.textContent) : 0,
            reviews: reviews ? parseInt(reviews.textContent.replace(/[()]/g, '')) : 0,
            description: description ? description.textContent : '',
            badge: badge ? badge.textContent : null,
            stock: stock ? stock.textContent : 'In Stock',
            unit: 'per unit',
            features: [
                { icon: 'leaf', title: 'Fresh Quality', text: 'Handpicked and quality checked' },
                { icon: 'truck', title: 'Fast Delivery', text: 'Delivered within 30 minutes' },
                { icon: 'shield-alt', title: 'Quality Guaranteed', text: 'Fresh or your money back' }
            ]
        };
    });
    
    return products;
}

// Wishlist storage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Open Product View Modal
function openProductViewModal(productId) {
    const products = getProductDataFromPage();
    const product = products[productId];
    
    if (!product) {
        showToast('Product not found', 'error');
        return;
    }

    // Create modal if it doesn't exist
    let modal = document.getElementById('productViewModal');
    if (!modal) {
        modal = createModalElement();
        document.body.appendChild(modal);
    }
    
    const contentDiv = document.getElementById('productViewContent');
    
    const savings = product.originalPrice ? (product.originalPrice - product.price).toFixed(2) : 0;
    const discountPercent = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    contentDiv.innerHTML = `
        <div class="product-view-layout">
            <div class="product-view-image">
                ${product.badge ? `<div class="product-view-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-main-image">
            </div>
            
            <div class="product-view-details">
                <h2 class="product-view-title">${product.name}</h2>
                <p class="product-view-category">${product.category}</p>
                
                <div class="product-view-rating">
                    <div class="rating-stars">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    </div>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                
                <p class="product-view-description">${product.description}</p>
                
                <div class="product-view-specs">
                    <div class="spec-item">
                        <i class="fas fa-box"></i>
                        <span>Unit: ${product.unit}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Status: <strong>${product.stock}</strong></span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-truck"></i>
                        <span>Delivery: Within 30 minutes</span>
                    </div>
                </div>
                
                <div class="product-view-pricing">
                    <div class="price-main">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        ` : ''}
                    </div>
                    ${savings > 0 ? `
                        <p class="savings">Save $${savings} (${discountPercent}% off)</p>
                    ` : ''}
                </div>
                
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity()">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" id="modalQuantity" class="quantity-input" value="1" min="1" max="99">
                        <button class="quantity-btn" onclick="increaseQuantity()">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="addToCartFromModal(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" id="modalWishlistBtn" onclick="toggleWishlistFromModal(${product.id})">
                        <i class="${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                        ${isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
                
                <div class="product-view-features">
                    ${product.features.map(feature => `
                        <div class="feature">
                            <i class="fas fa-${feature.icon}"></i>
                            <div>
                                <strong>${feature.title}</strong>
                                <p>${feature.text}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Create modal element dynamically
function createModalElement() {
    const modalHTML = `
        <div class="modal" id="productViewModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Product Details</h2>
                    <button class="modal-close" onclick="closeProductViewModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="product-view-content" id="productViewContent">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const temp = document.createElement('div');
    temp.innerHTML = modalHTML;
    return temp.firstElementChild;
}

// Close Product View Modal
function closeProductViewModal() {
    const modal = document.getElementById('productViewModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('modalQuantity');
    if (input && parseInt(input.value) < 99) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('modalQuantity');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart from modal
function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('modalQuantity').value) || 1;
    
    // Get product data
    const products = getProductDataFromPage();
    const product = products[productId];
    
    if (product && typeof addToCart === 'function') {
        addToCart(productId, quantity);
    } else {
        // Fallback: add to cart manually
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast(`${product.name} added to cart!`, 'success');
    }
    
    closeProductViewModal();
}

// Wishlist functions
function isInWishlist(productId) {
    const wishlistKey = `wishlist_${getCurrentCategory()}`;
    const categoryWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    return categoryWishlist.includes(productId);
}

function getCurrentCategory() {
    const categoryHeader = document.querySelector('.category-header h1');
    return categoryHeader ? categoryHeader.textContent.toLowerCase().replace(/\s+/g, '_') : 'general';
}

function toggleWishlist(productId) {
    const products = getProductDataFromPage();
    const product = products[productId];
    if (!product) return;

    const wishlistKey = `wishlist_${getCurrentCategory()}`;
    let categoryWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    if (categoryWishlist.includes(productId)) {
        categoryWishlist = categoryWishlist.filter(id => id !== productId);
        showToast(`${product.name} removed from wishlist`, 'warning');
    } else {
        categoryWishlist.push(productId);
        showToast(`${product.name} added to wishlist!`, 'success');
    }
    
    localStorage.setItem(wishlistKey, JSON.stringify(categoryWishlist));
    updateWishlistButtons();
}

function toggleWishlistFromModal(productId) {
    toggleWishlist(productId);
    
    // Update the modal button
    const modalBtn = document.getElementById('modalWishlistBtn');
    if (modalBtn) {
        if (isInWishlist(productId)) {
            modalBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
        } else {
            modalBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
        }
    }
}

function updateWishlistButtons() {
    document.querySelectorAll('.btn-category-wishlist').forEach((btn, index) => {
        const productId = index + 1;
        const icon = btn.querySelector('i');
        
        if (isInWishlist(productId)) {
            icon.className = 'fas fa-heart';
            btn.style.color = '#e74c3c';
        } else {
            icon.className = 'far fa-heart';
            btn.style.color = '';
        }
    });
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    
    // Create toast if it doesn't exist
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modal on outside click
window.addEventListener('click', function(event) {
    const modal = document.getElementById('productViewModal');
    if (event.target === modal) {
        closeProductViewModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductViewModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update wishlist buttons
    updateWishlistButtons();
    
    // Update cart count
    updateCartCount();
    
    // Add onclick handlers to all buttons
    const productCards = document.querySelectorAll('.category-product-card');
    
    productCards.forEach((card, index) => {
        const productId = index + 1;
        
        // Add to cart button
        const addToCartBtn = card.querySelector('.btn-category-add-cart');
        if (addToCartBtn && !addToCartBtn.onclick) {
            addToCartBtn.onclick = function(e) {
                e.preventDefault();
                const products = getProductDataFromPage();
                const product = products[productId];
                
                if (typeof addToCart === 'function') {
                    addToCart(productId);
                } else {
                    // Fallback
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existingItem = cart.find(item => item.id === productId);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({
                            id: productId,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                        });
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    showToast(`${product.name} added to cart!`, 'success');
                }
            };
        }
        
        // Wishlist button
        const wishlistBtn = card.querySelector('.btn-category-wishlist');
        if (wishlistBtn && !wishlistBtn.onclick) {
            wishlistBtn.onclick = function(e) {
                e.preventDefault();
                toggleWishlist(productId);
            };
        }
        
        // View button
        const viewBtn = card.querySelector('.btn-category-view');
        if (viewBtn && !viewBtn.onclick) {
            viewBtn.onclick = function(e) {
                e.preventDefault();
                openProductViewModal(productId);
            };
        }
    });
});