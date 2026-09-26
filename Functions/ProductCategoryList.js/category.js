// ===== ENHANCED CATEGORY PAGE JAVASCRIPT =====
// Works for all 8 category pages with cart functionality

console.log('🔄 FreshMart Category System Loading...');

// ===== CART MANAGEMENT SYSTEM =====
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartDisplay();
    }

    loadCart() {
        try {
            const saved = localStorage.getItem('freshmartCart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error loading cart:', e);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('freshmartCart', JSON.stringify(this.cart));
            this.updateCartDisplay();
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                category: product.category
            });
        }
        
        this.saveCart();
        return true;
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getCartCount();
        
        cartCountElements.forEach(element => {
            element.textContent = count;
            if (count > 0) {
                element.style.display = 'flex';
            }
        });
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// ===== PRODUCT DATA EXTRACTION =====
function getProductsByCategory() {
    const categoryHeader = document.querySelector('.category-header h1');
    if (!categoryHeader) return [];
    
    const categoryName = categoryHeader.textContent.trim().toLowerCase();
    let categoryKey = '';
    
    // Map category names to store category keys
    switch(categoryName.toLowerCase()) {
        case 'fresh fruits':
        case 'fruits':
            categoryKey = 'fruits';
            break;
        case 'fresh vegetables':
        case 'vegetables':
            categoryKey = 'vegetables';
            break;
        case 'bakery':
        case 'fresh bakery':
            categoryKey = 'bakery';
            break;
        case 'beverages':
        case 'fresh beverages':
            categoryKey = 'beverages';
            break;
        case 'diary':
        case 'dairy':
        case 'fresh dairy':
            categoryKey = 'dairy';
            break;
        case 'meat':
        case 'fresh meat':
            categoryKey = 'meat';
            break;
        case 'pantry staples':
        case 'pantry':
            categoryKey = 'pantry';
            break;
        case 'snacks':
        case 'fresh snacks':
            categoryKey = 'snacks';
            break;
        default:
            return [];
    }
    
    // Get products from store
    if (typeof window.getStoreProducts === 'function') {
        try {
            const allProducts = window.getStoreProducts();
            return allProducts.filter(product => product.category === categoryKey);
        } catch (e) {
            console.warn('Failed to get store products:', e);
        }
    }
    
    return [];
}

function extractProductData(card, index) {
    // Try to get actual product data from store first
    const categoryProducts = getProductsByCategory();
    if (categoryProducts.length > index) {
        return categoryProducts[index];
    }
    
    // Fallback to extracting from HTML (for backward compatibility)
    const badge = card.querySelector('.category-product-badge');
    const image = card.querySelector('.category-product-image');
    const title = card.querySelector('.category-product-title');
    const description = card.querySelector('.category-product-description');
    const currentPrice = card.querySelector('.category-product-current');
    const originalPrice = card.querySelector('.category-product-original');
    const rating = card.querySelector('.category-product-rating span:first-of-type');
    const reviews = card.querySelector('.category-product-rating span:last-of-type');
    const stock = card.querySelector('.category-product-stock');
    
    const categoryHeader = document.querySelector('.category-header h1');
    const category = categoryHeader ? categoryHeader.textContent.trim() : 'Products';
    
    return {
        id: `${category.toLowerCase().replace(/\s+/g, '_')}_${index + 1}`,
        name: title ? title.textContent.trim() : 'Product',
        category: category,
        price: currentPrice ? parseFloat(currentPrice.textContent.replace('$', '')) : 0,
        originalPrice: originalPrice ? parseFloat(originalPrice.textContent.replace('$', '')) : null,
        image: image ? image.src : '',
        rating: rating ? parseFloat(rating.textContent) : 0,
        reviews: reviews ? parseInt(reviews.textContent.replace(/[()]/g, '')) : 0,
        description: description ? description.textContent.trim() : '',
        badge: badge ? badge.textContent : null,
        stock: stock ? stock.textContent : 'In Stock',
        unit: 'per unit'
    };
}

// ===== ADD TO CART FUNCTIONALITY =====
function addToCart(arg) {
    // Accept either a button element (from event listeners) or a numeric/string index/id (from inline handlers)
    let buttonElement = null;
    let card = null;
    const cards = Array.from(document.querySelectorAll('.category-product-card'));

    if (arg instanceof Element) {
        buttonElement = arg;
        card = buttonElement.closest('.category-product-card');
    } else {
        // Try parse as a 1-based index
        const parsed = parseInt(arg, 10);
        if (!Number.isNaN(parsed)) {
            const idx = Math.max(0, parsed - 1);
            card = cards[idx];
            if (card) {
                buttonElement = card.querySelector('.btn-category-add-cart');
            }
        }

        // If not found yet, try to find by data-product-id attribute or by matching title text
        if (!card && typeof arg === 'string') {
            card = document.querySelector(`.category-product-card[data-product-id="${arg}"]`);
            if (card) buttonElement = card.querySelector('.btn-category-add-cart');
        }
    }

    if (!card) {
        showToast('Error: Product not found', 'error');
        return;
    }

    const index = cards.indexOf(card);
    const product = extractProductData(card, index);

    // Add to cart
    const success = cartManager.addItem(product);

    if (success) {
        // Button animation (if a button is available)
        if (buttonElement) {
            const originalHTML = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i class="fas fa-check"></i> Added!';
            buttonElement.style.background = '#27ae60';
            buttonElement.disabled = true;
            setTimeout(() => {
                buttonElement.innerHTML = originalHTML;
                buttonElement.style.background = '';
                buttonElement.disabled = false;
            }, 2000);
        }

        // Cart icon animation
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.classList.add('cart-bounce');
            setTimeout(() => cartIcon.classList.remove('cart-bounce'), 600);
        }

        // Show success message with product name (new unified format)
        showToast(`Successfully ${product.name} Added To The Cart`, 'success');
    }
}

// ===== WISHLIST FUNCTIONALITY =====
class WishlistManager {
    constructor() {
        this.wishlist = this.loadWishlist();
    }

    loadWishlist() {
        try {
            const saved = localStorage.getItem('freshmartWishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveWishlist() {
        localStorage.setItem('freshmartWishlist', JSON.stringify(this.wishlist));
    }

    toggle(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.saveWishlist();
            return false;
        } else {
            this.wishlist.push(productId);
            this.saveWishlist();
            return true;
        }
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    updateWishlistCount() {
        const wishlistCountElements = document.querySelectorAll('.wishlist-count');
        const count = this.wishlist.length;
        
        wishlistCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });
    }
}

const wishlistManager = new WishlistManager();

function toggleWishlist(arg) {
    // Accept button element or numeric/index
    let buttonElement = null;
    let card = null;
    const cards = Array.from(document.querySelectorAll('.category-product-card'));

    if (arg instanceof Element) {
        buttonElement = arg;
        card = buttonElement.closest('.category-product-card');
    } else {
        const parsed = parseInt(arg, 10);
        if (!Number.isNaN(parsed)) {
            card = cards[Math.max(0, parsed - 1)];
            if (card) buttonElement = card.querySelector('.btn-category-wishlist');
        }

        if (!card && typeof arg === 'string') {
            card = document.querySelector(`.category-product-card[data-product-id="${arg}"]`);
            if (card) buttonElement = card.querySelector('.btn-category-wishlist');
        }
    }

    if (!card || !buttonElement) return;

    const index = cards.indexOf(card);
    const product = extractProductData(card, index);
    const icon = buttonElement.querySelector('i');
    const isAdded = wishlistManager.toggle(product.id);
    
    if (isAdded) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        buttonElement.style.color = '#e74c3c';
        showToast(`${product.name} added to wishlist!`, 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        buttonElement.style.color = '';
        showToast(`${product.name} removed from wishlist`, 'warning');
    }
    
    // Update wishlist count
    wishlistManager.updateWishlistCount();
    
    // Animation
    buttonElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
        buttonElement.style.transform = 'scale(1)';
    }, 300);
}

// ===== PRODUCT VIEW MODAL =====
let currentModalQuantity = 1;

function openProductViewModal(arg) {
    // Accept either a button element or a 1-based index / data-product-id
    let card = null;
    const cards = Array.from(document.querySelectorAll('.category-product-card'));

    if (arg instanceof Element) {
        card = arg.closest('.category-product-card');
    } else {
        const parsed = parseInt(arg, 10);
        if (!Number.isNaN(parsed)) {
            card = cards[Math.max(0, parsed - 1)];
        }
        if (!card && typeof arg === 'string') {
            card = document.querySelector(`.category-product-card[data-product-id="${arg}"]`);
        }
    }

    if (!card) return;

    const index = cards.indexOf(card);
    const product = extractProductData(card, index);
    const modal = document.getElementById('productViewModal');
    const contentDiv = document.getElementById('productViewContent');
    
    if (!modal || !contentDiv) return;
    
    const savings = product.originalPrice ? (product.originalPrice - product.price).toFixed(2) : 0;
    const discountPercent = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    currentModalQuantity = 1;
    
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
                        <button class="quantity-btn" onclick="decreaseModalQuantity()">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" id="modalQuantity" class="quantity-input" value="1" min="1" max="99" readonly>
                        <button class="quantity-btn" onclick="increaseModalQuantity()">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="addToCartFromModal('${product.id}')">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="toggleWishlistFromModal('${product.id}')">
                        <i class="${wishlistManager.isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                        ${wishlistManager.isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
                
                <div class="product-view-features">
                    <div class="feature">
                        <i class="fas fa-leaf"></i>
                        <div>
                            <strong>Fresh Quality</strong>
                            <p>Handpicked and quality checked</p>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-truck"></i>
                        <div>
                            <strong>Fast Delivery</strong>
                            <p>Delivered within 30 minutes</p>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <div>
                            <strong>Quality Guaranteed</strong>
                            <p>Fresh or your money back</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProductViewModal() {
    const modal = document.getElementById('productViewModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function increaseModalQuantity() {
    if (currentModalQuantity < 99) {
        currentModalQuantity++;
        document.getElementById('modalQuantity').value = currentModalQuantity;
    }
}

function decreaseModalQuantity() {
    if (currentModalQuantity > 1) {
        currentModalQuantity--;
        document.getElementById('modalQuantity').value = currentModalQuantity;
    }
}

function addToCartFromModal(productId) {
    const cards = Array.from(document.querySelectorAll('.category-product-card'));
    
    for (let i = 0; i < cards.length; i++) {
        const product = extractProductData(cards[i], i);
        if (product.id === productId) {
            for (let j = 0; j < currentModalQuantity; j++) {
                cartManager.addItem(product);
            }
            showToast(`Successfully ${product.name} (x${currentModalQuantity}) Added To The Cart`, 'success');
            closeProductViewModal();
            return;
        }
    }
}

function toggleWishlistFromModal(productId) {
    const cards = Array.from(document.querySelectorAll('.category-product-card'));
    
    for (let i = 0; i < cards.length; i++) {
        const product = extractProductData(cards[i], i);
        if (product.id === productId) {
            const isAdded = wishlistManager.toggle(productId);
            if (isAdded) {
                showToast(`${product.name} added to wishlist!`, 'success');
            } else {
                showToast(`${product.name} removed from wishlist`, 'warning');
            }
            closeProductViewModal();
            return;
        }
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    // Remove legacy/other notification elements so only the unified toast is visible
    try {
        const legacySelectors = ['.custom-toast', '.custom-notification', '.custom-notification-panel', '.notification-panel', '#toast', '#category_toast', '.toast-panel'];
        legacySelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(n => n.remove());
        });
    } catch (e) {
        // ignore DOM errors
    }

    // Create or reuse a single toast container dedicated for category pages
    let toast = document.getElementById('category_toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'category_toast';

        // Basic visual wrapper
        toast.style.position = 'fixed';
        toast.style.top = '24px';
        toast.style.right = '24px';
        toast.style.zIndex = 9999;
        toast.style.pointerEvents = 'none';
        document.body.appendChild(toast);
    }

    // Create an inner bubble for each message so animations look smooth
    const bubble = document.createElement('div');
    bubble.className = `category-toast-bubble ${type}`;
    bubble.style.minWidth = '320px';
    bubble.style.maxWidth = '420px';
    bubble.style.background = type === 'success' ? '#27ae60' : (type === 'warning' ? '#f39c12' : '#e74c3c');
    bubble.style.color = '#fff';
    bubble.style.display = 'flex';
    bubble.style.alignItems = 'center';
    bubble.style.gap = '12px';
    bubble.style.padding = '14px 18px';
    bubble.style.borderRadius = '8px';
    bubble.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    bubble.style.marginTop = '8px';
    bubble.style.transform = 'translateX(24px)';
    bubble.style.opacity = '0';
    bubble.style.transition = 'transform 320ms cubic-bezier(.2,.9,.3,1), opacity 320ms ease';
    bubble.style.pointerEvents = 'auto';

    // Icon
    const icon = document.createElement('span');
    icon.style.display = 'inline-flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.width = '28px';
    icon.style.height = '28px';
    icon.style.flex = '0 0 28px';
    icon.style.borderRadius = '6px';
    icon.style.background = 'rgba(255,255,255,0.12)';
    icon.innerHTML = type === 'success' ? '&#10003;' : (type === 'warning' ? '!' : '&#10005;');
    icon.style.fontWeight = '700';
    icon.style.fontSize = '16px';

    // Message node
    const msg = document.createElement('div');
    msg.style.flex = '1 1 auto';
    msg.style.fontSize = '15px';
    msg.style.lineHeight = '1.2';
    msg.textContent = message;

    bubble.appendChild(icon);
    bubble.appendChild(msg);
    toast.appendChild(bubble);

    // Force reflow then animate in
    requestAnimationFrame(() => {
        bubble.style.transform = 'translateX(0)';
        bubble.style.opacity = '1';
    });

    // Auto-dismiss
    const dismissMs = 3200;
    const timer = setTimeout(() => {
        bubble.style.transform = 'translateX(24px)';
        bubble.style.opacity = '0';
        // remove after transition
        setTimeout(() => {
            if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
            // if no children left, remove the container
            if (toast && toast.children.length === 0 && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 360);
    }, dismissMs);

    // Allow manual dismiss on click (fast feedback)
    bubble.addEventListener('click', () => {
        clearTimeout(timer);
        bubble.style.transform = 'translateX(24px)';
        bubble.style.opacity = '0';
        setTimeout(() => {
            if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
            if (toast && toast.children.length === 0 && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 260);
    });
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ===== INITIALIZATION =====
// Capture local references immediately so later scripts (e.g., cart.js) cannot overwrite them
const CATEGORY_LOCAL_ADD_TO_CART = addToCart;
const CATEGORY_LOCAL_TOGGLE_WISHLIST = toggleWishlist;
const CATEGORY_LOCAL_OPEN_PRODUCT_VIEW_MODAL = openProductViewModal;

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Category page initialized');
    
    initializeMobileMenu();
    // Initialize wishlist count
    wishlistManager.updateWishlistCount();
    
    // Setup add to cart buttons
    document.querySelectorAll('.btn-category-add-cart').forEach(button => {
        button.addEventListener('click', () => CATEGORY_LOCAL_ADD_TO_CART(button));
    });
    
    // Setup wishlist buttons
    document.querySelectorAll('.btn-category-wishlist').forEach(button => {
        button.addEventListener('click', () => CATEGORY_LOCAL_TOGGLE_WISHLIST(button));
        
        // Set initial wishlist state
        const card = button.closest('.category-product-card');
        const cards = Array.from(document.querySelectorAll('.category-product-card'));
        const index = cards.indexOf(card);
        const product = extractProductData(card, index);
        
        if (wishlistManager.isInWishlist(product.id)) {
            const icon = button.querySelector('i');
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#e74c3c';
        }
    });
    
    // Setup view buttons
    document.querySelectorAll('.btn-category-view').forEach(button => {
        // Use the captured local reference so later global overwrites won't break this
        button.addEventListener('click', () => CATEGORY_LOCAL_OPEN_PRODUCT_VIEW_MODAL(button));
    });
    
    // Close modal on outside click
    const modal = document.getElementById('productViewModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProductViewModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductViewModal();
        }
    });
    
    console.log('✅ All event listeners attached');
    console.log('🛒 Cart count:', cartManager.getCartCount());
});

// Export functions for global use
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.openProductViewModal = openProductViewModal;
window.closeProductViewModal = closeProductViewModal;
window.increaseModalQuantity = increaseModalQuantity;
window.decreaseModalQuantity = decreaseModalQuantity;
window.addToCartFromModal = addToCartFromModal;
window.toggleWishlistFromModal = toggleWishlistFromModal;
window.showToast = showToast;

// Provide backward-compatible aliases so older modules (cart.js, wishlist.js, product.js)
// that call `showNotification` or `showEnhancedToast` will use the same unified toast UI.
if (!window.showNotification) window.showNotification = showToast;
if (!window.showEnhancedToast) window.showEnhancedToast = showToast;

console.log('✅ FreshMart Category System Ready!');