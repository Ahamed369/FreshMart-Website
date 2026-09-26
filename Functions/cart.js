// Enhanced Cart Management System
document.addEventListener('DOMContentLoaded', function () {
    console.log('Cart system initializing...');
    initializeProducts();
    updateCartCount();
    if (document.getElementById('cartItems')) {
        loadCartItems();
        initializeCheckoutModal();
        initializePaymentMethods();
        initializePromoCode();
        loadRecentlyViewed();
    }
});

// Product Initialization - Expanded product list
function initializeProducts() {
    const existingProducts = JSON.parse(localStorage.getItem('freshmartProducts'));
    if (!existingProducts || existingProducts.length < 18) {
        const products = 
        [
                {
                id: 1,
                name: "Fresh Kiwis",
                price: 6.99,
                originalPrice: 8.99,
                stock: 12,
                image: "https://images.unsplash.com/photo-1669144454866-5a66bcef6393?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtpd2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
                category: "Fruits",
                weight: "1kg",
                brand: "Exotic Fruits"
            },
            {
                id: 2,
                name: "Fresh Strawberries",
                price: 6.99,
                originalPrice: 8.99,
                stock: 15,
                image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Fruits",
                weight: "250g",
                brand: "Berry Fresh"
            },
            {
                id: 3,
                name: "Cashew Nuts",
                price: 5.99,
                originalPrice: 6.99,
                stock: 20,
                image: "https://images.unsplash.com/photo-1729796350013-ebb27f079c76?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
                category: "Nuts",
                weight: "500g",
                brand: "Fresh Farms"
            },
            {
                id: 4,
                name: "Roasted Almonds",
                price: 7.49,
                originalPrice: 8.99,
                stock: 18,
                image: "https://images.unsplash.com/photo-1674454676947-710339c549b7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
                category: "Nuts",
                weight: "500g",
                brand: "Nutty Delight"
            },
            {
                id: 5,
                name: "Fresh Prawns",
                price: 12.99,
                originalPrice: 14.99,
                stock: 8,
                image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Seafood",
                weight: "500g",
                brand: "Ocean Fresh"
            },
            {
                id: 6,
                name: "Sausages",
                price: 8.99,
                originalPrice: null,
                stock: 14,
                image: "https://plus.unsplash.com/premium_photo-1669984110630-b1acf513fcfa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
                category: "Meat",
                weight: "1kg",
                brand: "Butcher's Choice"
            },
            {
                id: 7,
                name: "Olive Oil",
                price: 8.49,
                originalPrice: 9.99,
                stock: 22,
                image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=718",
                category: "Pantry Staples",
                weight: "750ml",
                brand: "Mediterranean Gold"
            },
            {
                id: 8,
                name: "Chili Powder",
                price: 3.99,
                originalPrice: null,
                stock: 30,
                image: "https://images.unsplash.com/photo-1607672632458-9eb56696346b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1257",
                category: "Spices",
                weight: "200g",
                brand: "Spicy Blend"
            },
            {
                id: 9,
                name: "Fresh Lettuce",
                price: 2.99,
                originalPrice: null,
                stock: 28,
                image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Vegetables",
                weight: "300g",
                brand: "Leafy Greens"
            },
            {
                id: 10,
                name: "Fresh Capsicums",
                price: 5.49,
                originalPrice: null,
                stock: 24,
                image: "https://images.unsplash.com/photo-1592801062201-04fd6cf3d5ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
                category: "Vegetables",
                weight: "500g",
                brand: "Green Valley"
            },
            {
                id: 11,
                name: "Herbal Soap",
                price: 3.49,
                originalPrice: null,
                stock: 35,
                image: "https://images.unsplash.com/photo-1672665970821-b7b7c279afce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
                category: "Personal Care",
                weight: "125g",
                brand: "Pure Essence"
            },
            {
                id: 12,
                name: "Herbal Shampoo",
                price: 4.49,
                originalPrice: null,
                stock: 20,
                image: "https://images.unsplash.com/photo-1701992679010-7cf5dfee49d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNoYW1wb298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
                category: "Personal Care",
                weight: "400ml",
                brand: "Herbal Care"
            },
            {
                id: 13,
                name: "Chocolate Eclairs",
                price: 5.99,
                originalPrice: null,
                stock: 16,
                image: "https://images.unsplash.com/photo-1613992258436-7d744cb20893?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
                category: "Confectionery",
                weight: "300g",
                brand: "Sweet Treats"
            },
            {
                id: 14,
                name: "Glazed Donuts",
                price: 6.49,
                originalPrice: 7.49,
                stock: 12,
                image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Bakery",
                weight: "6 pack",
                brand: "Donut Delights"
            },
            {
                id: 15,
                name: "Assorted Toffees",
                price: 3.49,
                originalPrice: null,
                stock: 40,
                image: "https://images.unsplash.com/photo-1579343702811-6f32e2b1bb93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
                category: "Confectionery",
                weight: "250g",
                brand: "Candy Corner"
            },
            {
                id: 16,
                name: "Chewing Gums",
                price: 2.49,
                originalPrice: null,
                stock: 50,
                image: "https://images.unsplash.com/photo-1610961138779-2433f6fd227a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnViYmxlJTIwZ3Vtc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
                category: "Confectionery",
                weight: "100g",
                brand: "Fresh Mint"
            },
            {
                id: 17,
                name: "Raspberry Ice-Cream",
                price: 7.99,
                originalPrice: 8.99,
                stock: 10,
                image: "https://plus.unsplash.com/premium_photo-1678198786424-c2cc6593f59c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aWNlY3JlYW1zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
                category: "Frozen",
                weight: "1L",
                brand: "Creamy Delights"
            },
            {
                id: 18,
                name: "Mineral Water Bottles",
                price: 4.99,
                originalPrice: null,
                stock: 45,
                image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Beverages",
                weight: "6x1.5L",
                brand: "Pure Spring"
            }
        ];
        localStorage.setItem('freshmartProducts', JSON.stringify(products));
        console.log('Products initialized:', products.length);
    }
}

// Product Management
function getProductById(productId) {
    const products = JSON.parse(localStorage.getItem('freshmartProducts')) || [];
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        console.error('Product not found with ID:', productId);
        return null;
    }

    return product;
}

// Cart Management
function getCart() {
    const cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    console.log('Current cart:', cart);
    return cart;
}

function saveCart(cart) {
    localStorage.setItem('freshmartCart', JSON.stringify(cart));
    updateCartCount();
    console.log('Cart saved:', cart);
}

function updateCartCount() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');

    cartCountElements.forEach(element => {
        element.textContent = totalCount;
        element.style.display = totalCount > 0 ? 'flex' : 'none';

        // Add bounce animation
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'bounceIn 0.5s ease';
        }, 10);
    });
}

// Enhanced Add to Cart Function
function addToCart(productId, quantity = 1) {
    console.log('Adding to cart:', productId, quantity);
    const product = getProductById(productId);

    if (!product) {
        showNotification('Product not found!', 'error');
        return false;
    }

    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === parseInt(productId));

    if (existingItemIndex !== -1) {
        const newQuantity = cart[existingItemIndex].quantity + quantity;
        if (newQuantity <= product.stock) {
            cart[existingItemIndex].quantity = newQuantity;
            showNotification(`Updated ${product.name} quantity to ${newQuantity}`, 'success');
        } else {
            showNotification(`Cannot add more ${product.name}. Only ${product.stock} in stock.`, 'warning');
            return false;
        }
    } else {
        if (quantity <= product.stock) {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice || null,
                image: product.image,
                category: product.category,
                brand: product.brand || 'FreshMart',
                quantity: quantity,
                stock: product.stock,
                weight: product.weight || null
            };
            cart.push(cartItem);
            showNotification(`${product.name} added to cart! 🛒`, 'success');
        } else {
            showNotification(`Cannot add ${quantity} items. Only ${product.stock} in stock.`, 'warning');
            return false;
        }
    }

    saveCart(cart);
    updateCartCount();

    if (document.getElementById('cartItems')) {
        loadCartItems();
    }

    return true;
}

// Load Cart Items with Enhanced UI
function loadCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const itemsCount = document.getElementById('itemsCount');
    const proceedBtn = document.getElementById('proceedToCheckout');

    console.log('Loading cart items:', cart.length);

    if (cart.length === 0) {
        if (cartItemsContainer) cartItemsContainer.innerHTML = '';
        if (emptyCart) emptyCart.classList.add('show');
        if (itemsCount) itemsCount.textContent = '0 items';
        if (proceedBtn) proceedBtn.disabled = true;
        return;
    }

    if (emptyCart) emptyCart.classList.remove('show');

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-id="${item.id}" style="animation: slideInLeft 0.5s ease ${index * 0.1}s both;">
            ${item.originalPrice && item.originalPrice > item.price ?
            `<div class="cart-item-badge">Save $${(item.originalPrice - item.price).toFixed(2)}</div>` : ''}
            
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=Product+Image'">
            </div>
            
            <div class="cart-item-info">
                <div class="cart-item-header">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-brand">${item.brand}</div>
                    <div class="cart-item-category">${item.category}</div>
                    ${item.weight ? `<div class="cart-item-weight">${item.weight}</div>` : ''}
                </div>
                
                <div class="cart-item-details">
                    <div class="cart-item-pricing">
                        <div class="price-comparison">
                            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                            ${item.originalPrice ?
            `<span class="cart-item-original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        ${item.originalPrice ?
            `<div class="discount-percent">${Math.round((1 - item.price / item.originalPrice) * 100)}% OFF</div>` : ''}
                    </div>
                    
                    <div class="stock-status">
                        ${item.quantity > item.stock ?
            `<span class="out-of-stock-text">⚠️ Only ${item.stock} in stock</span>` :
            item.stock < 10 ?
                `<span class="low-stock">⚡ Low stock - ${item.stock} left</span>` :
                `<span class="in-stock">✓ In stock</span>`
        }
                    </div>
                </div>
            </div>
            
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-id="${item.id}" 
                            ${item.quantity <= 1 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" max="${item.stock}" data-id="${item.id}" readonly>
                    <button class="quantity-btn increase-btn" data-id="${item.id}"
                            ${item.quantity >= item.stock ? 'disabled' : ''}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for quantity buttons
    attachQuantityListeners();
    attachRemoveListeners();

    if (itemsCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        itemsCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }

    if (proceedBtn) {
        proceedBtn.disabled = cart.length === 0;
    }

    updateCartSummary();
    updateFreeDeliveryProgress();
}

// Attach Event Listeners for Quantity Controls
function attachQuantityListeners() {
    // Increase quantity buttons
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            increaseQuantity(productId);
        });
    });

    // Decrease quantity buttons
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            decreaseQuantity(productId);
        });
    });
}

// Attach Event Listeners for Remove Buttons
function attachRemoveListeners() {
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Enhanced Quantity Functions
function increaseQuantity(productId) {
    console.log('Increasing quantity for:', productId);
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === parseInt(productId));

    if (itemIndex !== -1) {
        const product = getProductById(productId);
        if (cart[itemIndex].quantity < product.stock) {
            cart[itemIndex].quantity++;
            saveCart(cart);
            loadCartItems();
            showNotification(`Quantity increased to ${cart[itemIndex].quantity}`, 'success');

            // Add pulse animation to item total
            const cartItem = document.querySelector(`.cart-item[data-id="${productId}"] .item-total`);
            if (cartItem) {
                cartItem.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    cartItem.style.animation = '';
                }, 300);
            }
        } else {
            showNotification(`Maximum quantity reached! Only ${product.stock} in stock.`, 'warning');
        }
    }
}

function decreaseQuantity(productId) {
    console.log('Decreasing quantity for:', productId);
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === parseInt(productId));

    if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
        saveCart(cart);
        loadCartItems();
        showNotification(`Quantity decreased to ${cart[itemIndex].quantity}`, 'info');

        // Add pulse animation to item total
        const cartItem = document.querySelector(`.cart-item[data-id="${productId}"] .item-total`);
        if (cartItem) {
            cartItem.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                cartItem.style.animation = '';
            }, 300);
        }
    } else if (itemIndex !== -1 && cart[itemIndex].quantity === 1) {
        showNotification('Quantity cannot be less than 1. Remove item instead.', 'warning');
    }
}

function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === parseInt(productId));

    if (itemIndex !== -1) {
        const product = getProductById(productId);
        newQuantity = parseInt(newQuantity);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        }

        if (newQuantity > product.stock) {
            showNotification(`Only ${product.stock} items available in stock`, 'warning');
            newQuantity = product.stock;
        }

        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        loadCartItems();
    }
}

function removeFromCart(productId) {
    const cart = getCart();
    const item = cart.find(item => item.id === parseInt(productId));

    if (!item) return;

    // Show confirmation with custom styling
    showConfirmDialog(
        `Remove ${item.name}?`,
        'Are you sure you want to remove this item from your cart?',
        () => {
            const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
            if (cartItem) {
                cartItem.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    const updatedCart = cart.filter(item => item.id !== parseInt(productId));
                    saveCart(updatedCart);
                    loadCartItems();
                    showNotification('Item removed from cart', 'success');
                }, 300);
            }
        }
    );
}

// Clear Entire Cart Function
function clearCart() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is already empty', 'info');
        return;
    }

    showConfirmDialog(
        'Clear Cart?',
        `Are you sure you want to remove all ${cart.length} items from your cart?`,
        () => {
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'slideOutRight 0.3s ease';
                }, index * 50);
            });

            setTimeout(() => {
                localStorage.removeItem('freshmartCart');
                loadCartItems();
                updateCartCount();
                showNotification('Cart cleared successfully! 🗑️', 'success');
            }, cartItems.length * 50 + 300);
        }
    );
}

// Cart Summary and Calculations
function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 50 ? 0 : 7.99;
    const tax = subtotal * 0.08;
    const discount = calculateDiscount(subtotal);
    const total = subtotal + deliveryFee + tax - discount;

    const subtotalElement = document.getElementById('subtotalAmount');
    const deliveryElement = document.getElementById('deliveryFee');
    const taxElement = document.getElementById('taxAmount');
    const discountElement = document.getElementById('discountAmount');
    const discountRow = document.querySelector('.summary-row.discount');
    const totalElement = document.getElementById('totalAmount');

    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        subtotalElement.style.animation = 'fadeIn 0.3s ease';
    }

    if (deliveryElement) {
        deliveryElement.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
        deliveryElement.className = deliveryFee === 0 ? 'free' : '';
        if (deliveryFee === 0) {
            deliveryElement.style.animation = 'bounceIn 0.5s ease';
        }
    }

    if (taxElement) {
        taxElement.textContent = `$${tax.toFixed(2)}`;
    }

    if (discountElement && discountRow) {
        discountElement.textContent = `-$${discount.toFixed(2)}`;
        discountRow.style.display = discount > 0 ? 'flex' : 'none';
        if (discount > 0) {
            discountElement.style.animation = 'bounceIn 0.5s ease';
        }
    }

    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
        totalElement.style.animation = 'pulse 0.5s ease';
    }

    updateReviewSection();
}

function updateFreeDeliveryProgress() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeDeliveryThreshold = 50;
    const progress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
    const amountNeeded = Math.max(freeDeliveryThreshold - subtotal, 0);

    const progressElement = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    if (progressElement) {
        progressElement.style.width = `${progress}%`;
        progressElement.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    if (progressText) {
        if (subtotal >= freeDeliveryThreshold) {
            progressText.innerHTML = '<strong>🎉 You qualify for FREE delivery!</strong>';
            progressText.style.color = 'var(--success-color)';
            progressText.style.animation = 'bounceIn 0.5s ease';
        } else {
            progressText.innerHTML = `Add <strong>$${amountNeeded.toFixed(2)}</strong> more for FREE delivery! 🚚`;
            progressText.style.color = 'var(--text-color)';
        }
    }
}

function calculateDiscount(subtotal) {
    const promoCode = localStorage.getItem('freshmartPromoCode');
    if (!promoCode) return 0;

    const discounts = {
        'FRESH15': 0.15,
        'STUDENT20': 0.20,
        'SAVE10': 0.10,
        'WELCOME25': 0.25
    };

    const discountRate = discounts[promoCode] || 0;
    return subtotal * discountRate;
}

// Load Recently Viewed / Recommended Products
function loadRecentlyViewed() {
    const recentlyViewedContainer = document.getElementById('recentlyViewed');
    if (!recentlyViewedContainer) return;

    const products = JSON.parse(localStorage.getItem('freshmartProducts')) || [];
    const cart = getCart();
    const cartProductIds = cart.map(item => item.id);

    // Get products not in cart
    const availableProducts = products.filter(p => !cartProductIds.includes(p.id));

    // Shuffle and take 4 random products
    const shuffled = availableProducts.sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 4);

    recentlyViewedContainer.innerHTML = recommended.map((product, index) => `
        <div class="product-card" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both;">
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
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    ` : ''}
                </div>
                <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for add to cart buttons
    recentlyViewedContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            if (addToCart(productId, 1)) {
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                this.style.background = 'var(--success-color)';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    this.style.background = '';
                }, 2000);
            }
        });
    });
}

// Promo Code System
function initializePromoCode() {
    const promoToggle = document.getElementById('promoToggle');
    const promoForm = document.getElementById('promoForm');
    const applyPromo = document.getElementById('applyPromo');
    const promoCodeInput = document.getElementById('promoCode');
    const promoTags = document.querySelectorAll('.promo-tag');

    if (promoToggle && promoForm) {
        promoToggle.addEventListener('click', function () {
            promoForm.style.display = promoForm.style.display === 'none' ? 'flex' : 'none';
            if (promoForm.style.display === 'flex') {
                promoCodeInput.focus();
            }
        });
    }

    if (applyPromo && promoCodeInput) {
        applyPromo.addEventListener('click', applyPromoCode);
        promoCodeInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyPromoCode();
            }
        });
    }

    promoTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const code = this.dataset.code;
            promoCodeInput.value = code;
            applyPromoCode();
        });
    });

    const existingPromo = localStorage.getItem('freshmartPromoCode');
    if (existingPromo) {
        showAppliedPromo(existingPromo);
    }
}

function applyPromoCode() {
    const promoCodeInput = document.getElementById('promoCode');
    const code = promoCodeInput.value.trim().toUpperCase();

    const validCodes = {
        'FRESH15': '15% off your order',
        'STUDENT20': '20% off for students',
        'SAVE10': '10% off your purchase',
        'WELCOME25': '25% off welcome discount'
    };

    if (validCodes[code]) {
        localStorage.setItem('freshmartPromoCode', code);
        showAppliedPromo(code);
        showNotification(`Promo code applied: ${validCodes[code]} 🎉`, 'success');
        updateCartSummary();
        promoCodeInput.value = '';
    } else {
        showNotification('Invalid promo code. Please try another one.', 'error');
        promoCodeInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            promoCodeInput.style.animation = '';
        }, 500);
    }
}

function showAppliedPromo(code) {
    const promoForm = document.getElementById('promoForm');
    const promoSection = document.querySelector('.promo-section');

    if (promoForm && promoSection) {
        promoForm.style.display = 'none';

        let appliedHtml = promoSection.querySelector('.promo-applied');
        if (!appliedHtml) {
            appliedHtml = document.createElement('div');
            appliedHtml.className = 'promo-applied';
            promoSection.appendChild(appliedHtml);
        }

        appliedHtml.innerHTML = `
            <div class="promo-success">
                <i class="fas fa-check-circle"></i>
                <span>Promo code <strong>${code}</strong> applied successfully!</span>
            </div>
            <button class="btn-remove-promo" onclick="removePromoCode()">
                <i class="fas fa-times"></i>
            </button>
        `;

        appliedHtml.style.animation = 'slideInDown 0.3s ease';
    }
}

function removePromoCode() {
    localStorage.removeItem('freshmartPromoCode');
    const promoSection = document.querySelector('.promo-section');
    const appliedHtml = promoSection.querySelector('.promo-applied');

    if (appliedHtml) {
        appliedHtml.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => {
            appliedHtml.remove();
        }, 300);
    }

    const promoForm = document.getElementById('promoForm');
    if (promoForm) {
        promoForm.style.display = 'flex';
    }

    showNotification('Promo code removed', 'info');
    updateCartSummary();
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // If a unified showToast exists (category pages), use it so UI is consistent.
    if (window && typeof window.showToast === 'function') {
        // Map type names if necessary and delegate
        window.showToast(message, type === 'error' ? 'error' : (type === 'warning' ? 'warning' : (type === 'success' ? 'success' : 'info')));
        return;
    }

    // Fallback: original behavior (legacy custom toast)
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new notification
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;

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

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto remove after 3 seconds
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

// Checkout System
function initializeCheckoutModal() {
    const proceedBtn = document.getElementById('proceedToCheckout');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', openCheckoutModal);
    }
}

function initializePaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            updatePaymentReview();
        });
    });

    const cardInputs = document.querySelectorAll('#cardNumber, #expiryDate, #cvv');
    cardInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            formatCardInput(e.target);
        });
    });
}

function formatCardInput(input) {
    const value = input.value.replace(/\D/g, '');

    if (input.id === 'cardNumber') {
        input.value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim().slice(0, 19);
    } else if (input.id === 'expiryDate') {
        if (value.length >= 2) {
            input.value = value.slice(0, 2) + '/' + value.slice(2, 4);
        } else {
            input.value = value;
        }
    } else if (input.id === 'cvv') {
        input.value = value.slice(0, 4);
    }
}

function openCheckoutModal() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    showStep(1);
    updateReviewSection();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showStep(stepNumber) {
    const steps = document.querySelectorAll('.checkout-step');
    steps.forEach(step => step.classList.remove('active'));

    const currentStep = document.getElementById(`step${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }
}

function nextStep(nextStepNumber) {
    const currentStep = document.querySelector('.checkout-step.active');
    const currentStepNumber = parseInt(currentStep.id.replace('step', ''));

    if (currentStepNumber === 1 && !validateDeliveryInfo()) {
        showNotification('Please fill in all required delivery information', 'error');
        return;
    }

    if (currentStepNumber === 2 && !validatePaymentInfo()) {
        showNotification('Please fill in all required payment information', 'error');
        return;
    }

    showStep(nextStepNumber);
    updateReviewSection();
}

function prevStep(prevStepNumber) {
    showStep(prevStepNumber);
}

function editStep(stepNumber) {
    showStep(stepNumber);
}

function validateDeliveryInfo() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
    let isValid = true;

    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element || !element.value.trim()) {
            element.classList.add('error');
            isValid = false;
        } else {
            element.classList.remove('error');
        }
    }

    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('error');
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }

    return isValid;
}

function validatePaymentInfo() {
    const activeMethod = document.querySelector('.payment-method.active');
    if (!activeMethod) {
        showNotification('Please select a payment method', 'error');
        return false;
    }

    const method = activeMethod.dataset.method;
    let isValid = true;

    if (method === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        for (let field of cardFields) {
            const element = document.getElementById(field);
            if (!element || !element.value.trim()) {
                element.classList.add('error');
                isValid = false;
            } else {
                element.classList.remove('error');
            }
        }

        if (!isValid) return false;

        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cvv = document.getElementById('cvv').value;

        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            document.getElementById('cardNumber').classList.add('error');
            showNotification('Please enter a valid 16-digit card number', 'error');
            isValid = false;
        }

        if (cvv.length < 3 || cvv.length > 4 || isNaN(cvv)) {
            document.getElementById('cvv').classList.add('error');
            showNotification('Please enter a valid CVV (3-4 digits)', 'error');
            isValid = false;
        }
    }

    return isValid;
}

function updateReviewSection() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 50 ? 0 : 7.99;
    const tax = subtotal * 0.08;
    const discount = calculateDiscount(subtotal);
    const total = subtotal + deliveryFee + tax - discount;

    updateDeliveryReview();
    updatePaymentReview();
    updateOrderItemsReview();
    updateReviewTotals(subtotal, deliveryFee, tax, discount, total);
}

function updateDeliveryReview() {
    const deliveryReview = document.getElementById('deliveryReview');
    if (deliveryReview) {
        const firstName = document.getElementById('firstName')?.value || 'Not provided';
        const lastName = document.getElementById('lastName')?.value || 'Not provided';
        const email = document.getElementById('email')?.value || 'Not provided';
        const phone = document.getElementById('phone')?.value || 'Not provided';
        const address = document.getElementById('address')?.value || 'Not provided';
        const city = document.getElementById('city')?.value || 'Not provided';
        const zipCode = document.getElementById('zipCode')?.value || 'Not provided';

        deliveryReview.innerHTML = `
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>City:</strong> ${city}, ${zipCode}</p>
        `;
    }
}

function updatePaymentReview() {
    const paymentReview = document.getElementById('paymentReview');
    if (paymentReview) {
        const activeMethod = document.querySelector('.payment-method.active');
        const method = activeMethod ? activeMethod.dataset.method : 'Not selected';
        let methodText = '';
        let details = '';

        switch (method) {
            case 'card':
                methodText = 'Credit/Debit Card';
                const cardNumber = document.getElementById('cardNumber')?.value || '';
                const cardName = document.getElementById('cardName')?.value || '';
                if (cardNumber) {
                    const lastFour = cardNumber.slice(-4);
                    details = `Card ending in ${lastFour}`;
                    if (cardName) {
                        details += ` (${cardName})`;
                    }
                }
                break;
            case 'paypal':
                methodText = 'PayPal';
                details = 'You will be redirected to PayPal';
                break;
            case 'cod':
                methodText = 'Cash on Delivery';
                details = 'Pay when you receive your order';
                break;
            default:
                methodText = 'Not selected';
        }

        paymentReview.innerHTML = `
            <p><strong>Payment Method:</strong> ${methodText}</p>
            ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
        `;
    }
}

function updateOrderItemsReview() {
    const orderItemsReview = document.getElementById('orderItemsReview');
    const cart = getCart();

    if (orderItemsReview) {
        orderItemsReview.innerHTML = cart.map(item => `
            <div class="review-item">
                <div class="review-item-info">
                    <div class="review-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50x50?text=Product'">
                    </div>
                    <div>
                        <div class="review-item-name">${item.name}</div>
                        <div class="review-item-quantity">Qty: ${item.quantity} × ${item.price.toFixed(2)}</div>
                    </div>
                </div>
                <div class="review-item-price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }
}

function updateReviewTotals(subtotal, deliveryFee, tax, discount, total) {
    const elements = {
        'reviewSubtotal': subtotal,
        'reviewDelivery': deliveryFee,
        'reviewTax': tax,
        'reviewDiscount': discount,
        'reviewTotal': total
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'reviewDelivery') {
                element.textContent = value === 0 ? 'FREE' : `${value.toFixed(2)}`;
            } else if (id === 'reviewDiscount') {
                element.textContent = `-${value.toFixed(2)}`;
                const discountRow = element.closest('.summary-row');
                if (discountRow) {
                    discountRow.style.display = value > 0 ? 'flex' : 'none';
                }
            } else {
                element.textContent = `${value.toFixed(2)}`;
            }
        }
    });
}

// Order Placement
function placeOrder() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
    placeOrderBtn.disabled = true;

    setTimeout(() => {
        const orderData = {
            orderId: 'FRM' + Date.now(),
            items: [...cart],
            timestamp: new Date().toISOString(),
            status: 'confirmed',
            deliveryInfo: {
                firstName: document.getElementById('firstName')?.value,
                lastName: document.getElementById('lastName')?.value,
                email: document.getElementById('email')?.value,
                phone: document.getElementById('phone')?.value,
                address: document.getElementById('address')?.value,
                city: document.getElementById('city')?.value,
                zipCode: document.getElementById('zipCode')?.value
            },
            paymentInfo: getPaymentInfo(),
            subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            deliveryFee: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) >= 50 ? 0 : 7.99,
            tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.08,
            discount: calculateDiscount(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)),
            total: 0
        };

        orderData.total = orderData.subtotal + orderData.deliveryFee + orderData.tax - orderData.discount;

        const orders = JSON.parse(localStorage.getItem('freshmartOrders')) || [];
        orders.push(orderData);
        localStorage.setItem('freshmartOrders', JSON.stringify(orders));

        localStorage.removeItem('freshmartCart');
        localStorage.removeItem('freshmartPromoCode');

        closeCheckoutModal();
        showOrderSuccessModal(orderData);
        loadCartItems();

        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
    }, 2000);
}

function getPaymentInfo() {
    const activeMethod = document.querySelector('.payment-method.active');
    if (!activeMethod) return null;

    const method = activeMethod.dataset.method;
    const paymentInfo = {
        method: method
    };

    switch (method) {
        case 'card':
            paymentInfo.cardLastFour = document.getElementById('cardNumber')?.value.slice(-4) || '';
            paymentInfo.cardName = document.getElementById('cardName')?.value || '';
            break;
        case 'paypal':
            paymentInfo.redirect = true;
            break;
        case 'cod':
            paymentInfo.cashOnDelivery = true;
            break;
    }

    return paymentInfo;
}

function showOrderSuccessModal(orderData) {
    const modal = document.getElementById('orderSuccessModal');
    const successOrderId = document.getElementById('successOrderId');
    const successTotalAmount = document.getElementById('successTotalAmount');

    if (successOrderId) successOrderId.textContent = orderData.orderId;
    if (successTotalAmount) successTotalAmount.textContent = `${orderData.total.toFixed(2)}`;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    const successContent = modal.querySelector('.success-content');
    successContent.classList.add('animate-in');

    createConfetti();
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.5};
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
            z-index: 10000;
        `;

        document.body.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('orderSuccessModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    window.location.href = 'index.html';
}

// Global Function Exports
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.editStep = editStep;
window.placeOrder = placeOrder;
window.closeSuccessModal = closeSuccessModal;
window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.applyPromoCode = applyPromoCode;
window.removePromoCode = removePromoCode;