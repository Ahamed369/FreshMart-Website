// Enhanced Offers Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeOffersPage();
    initializeCategoryNavigation();
    initializeOfferInteractions();
    initializeCountdownTimers();
    loadOfferData();
});

// Page Initialization
function initializeOffersPage() {
    // Add scroll animations
    addScrollAnimations();
    
    // Initialize search functionality
    initializeSearch();
    
    // Set up offer category based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && ['discounts', 'bogo', 'daily', 'seasonal', 'clearance', 'delivery', 'new', 'flash'].includes(hash)) {
        switchOfferCategory(hash);
    }
}

// Category Navigation
function initializeCategoryNavigation() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            switchOfferCategory(category);
            updateURLHash(category);
        });
    });
}

function switchOfferCategory(category) {
    // Update active button
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Show relevant offers grid
    const allGrids = document.querySelectorAll('.offers-grid');
    allGrids.forEach(grid => {
        grid.style.display = 'none';
    });
    
    const targetGrid = document.getElementById(`${category}-offers`) || document.getElementById('all-offers');
    if (targetGrid) {
        targetGrid.style.display = 'grid';
        
        // Load category-specific data if needed
        if (category !== 'all') {
            loadCategoryData(category);
        }
    }
}

function updateURLHash(category) {
    history.replaceState(null, null, `#${category}`);
}

// Offer Interactions
function initializeOfferInteractions() {
    // Add click handlers for offer buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-offer') || 
            e.target.closest('.btn-offer')) {
            const offerCard = e.target.closest('.offer-card');
            if (offerCard) {
                const offerType = Array.from(offerCard.classList).find(cls => 
                    ['discount', 'bogo', 'delivery', 'flash', 'new', 'clearance'].includes(cls)
                );
                handleOfferClick(offerType, offerCard);
            }
        }
    });
}

function handleOfferClick(offerType, offerCard) {
    const offerTitle = offerCard.querySelector('h3').textContent;
    
    switch (offerType) {
        case 'discount':
            showDiscountDetails(offerTitle, offerCard);
            break;
        case 'bogo':
            showBOGODetails(offerTitle, offerCard);
            break;
        case 'delivery':
            showDeliveryDetails(offerTitle, offerCard);
            break;
        case 'flash':
            showFlashDetails(offerTitle, offerCard);
            break;
        case 'new':
            showNewArrivalDetails(offerTitle, offerCard);
            break;
        case 'clearance':
            showClearanceDetails(offerTitle, offerCard);
            break;
        default:
            showGenericOfferDetails(offerTitle, offerCard);
    }
}

// Offer Detail Functions
function showOfferDetails(offerId) {
    // This would fetch actual offer details from backend
    const offerData = getOfferData(offerId);
    
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = offerData.title;
    content.innerHTML = `
        <div class="offer-detail">
            <div class="detail-image">
                <img src="${offerData.image}" alt="${offerData.title}">
            </div>
            <div class="detail-content">
                <p class="detail-description">${offerData.description}</p>
                <div class="detail-pricing">
                    <span class="original-price">${offerData.originalPrice}</span>
                    <span class="discount-price">${offerData.discountPrice}</span>
                </div>
                <div class="detail-features">
                    <h4>What's Included:</h4>
                    <ul>
                        ${offerData.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-actions">
                    <button class="btn-primary" onclick="addToCart('${offerData.id}')">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart - ${offerData.discountPrice}
                    </button>
                    <button class="btn-secondary" onclick="saveOffer('${offerData.id}')">
                        <i class="fas fa-heart"></i>
                        Save Offer
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showBOGODetails(offerId) {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = 'Buy 1 Get 1 Free - Fresh Juice';
    content.innerHTML = `
        <div class="bogo-detail">
            <div class="bogo-header">
                <h4>🎉 Special BOGO Offer 🎉</h4>
                <p>Buy one fresh orange juice, get another one absolutely FREE!</p>
            </div>
            
            <div class="bogo-products">
                <div class="product-item">
                    <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Orange Juice">
                    <div class="product-info">
                        <h5>Fresh Orange Juice</h5>
                        <p>500ml bottle</p>
                        <span class="price">$4.99</span>
                    </div>
                </div>
                
                <div class="product-item free">
                    <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Orange Juice Free">
                    <div class="product-info">
                        <h5>Fresh Orange Juice</h5>
                        <p>500ml bottle</p>
                        <span class="price-free">FREE!</span>
                    </div>
                </div>
            </div>
            
            <div class="bogo-terms">
                <h5>How it works:</h5>
                <ul>
                    <li>Add 2 orange juices to your cart</li>
                    <li>The discount will be applied automatically at checkout</li>
                    <li>Valid for same product only</li>
                    <li>Cannot be combined with other offers</li>
                </ul>
            </div>
            
            <div class="bogo-actions">
                <button class="btn-primary" onclick="addBOGOToCart()">
                    <i class="fas fa-shopping-cart"></i>
                    Add Both to Cart - $4.99
                </button>
                <button class="btn-secondary" onclick="shareOffer('bogo-juice')">
                    <i class="fas fa-share"></i>
                    Share This Deal
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showDeliveryDetails(offerId) {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = 'Free Delivery Offer';
    content.innerHTML = `
        <div class="delivery-detail">
            <div class="delivery-header">
                <h4>🚚 Free Delivery Special 🚚</h4>
                <p>Get free delivery on selected vegetable orders above $15</p>
            </div>
            
            <div class="delivery-products">
                <h5>Eligible Products:</h5>
                <div class="products-grid">
                    <div class="delivery-product">
                        <img src="https://images.unsplash.com/photo-1592924356292-439f814bacc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Carrots">
                        <span>Fresh Carrots</span>
                        <span class="price">$2.99</span>
                    </div>
                    <div class="delivery-product">
                        <img src="https://images.unsplash.com/photo-1594282486484-7e6c73c87b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Broccoli">
                        <span>Broccoli</span>
                        <span class="price">$3.49</span>
                    </div>
                    <div class="delivery-product">
                        <img src="https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Bell Peppers">
                        <span>Bell Peppers</span>
                        <span class="price">$4.99</span>
                    </div>
                </div>
            </div>
            
            <div class="delivery-terms">
                <h5>Delivery Information:</h5>
                <ul>
                    <li>Free delivery on orders above $15</li>
                    <li>30-minute delivery available in selected areas</li>
                    <li>Student discount applies separately</li>
                    <li>Delivery fee normally: $2.99</li>
                </ul>
            </div>
            
            <div class="delivery-actions">
                <button class="btn-primary" onclick="shopVegetables()">
                    <i class="fas fa-store"></i>
                    Shop Vegetables
                </button>
                <button class="btn-secondary" onclick="checkDeliveryArea()">
                    <i class="fas fa-map-marker-alt"></i>
                    Check Delivery Area
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showFlashDetails(offerId) {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = 'Flash Sale - Fresh Tomatoes';
    content.innerHTML = `
        <div class="flash-detail">
            <div class="flash-header">
                <h4>⚡ Flash Sale ⚡</h4>
                <p>Limited time offer! Stock up on fresh organic tomatoes</p>
            </div>
            
            <div class="flash-timer-large">
                <div class="timer-unit">
                    <span class="time">04</span>
                    <span class="label">Hours</span>
                </div>
                <div class="timer-unit">
                    <span class="time">15</span>
                    <span class="label">Minutes</span>
                </div>
                <div class="timer-unit">
                    <span class="time">22</span>
                    <span class="label">Seconds</span>
                </div>
            </div>
            
            <div class="flash-product">
                <img src="https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Fresh Tomatoes">
                <div class="product-details">
                    <h5>Organic Fresh Tomatoes</h5>
                    <p>1kg pack of vine-ripened tomatoes</p>
                    <div class="pricing">
                        <span class="original-price">$3.99</span>
                        <span class="discount-price">$2.49</span>
                        <span class="save-amount">Save $1.50!</span>
                    </div>
                    <div class="stock-info">
                        <span class="stock-low">Only 23 left at this price!</span>
                    </div>
                </div>
            </div>
            
            <div class="flash-actions">
                <button class="btn-primary" onclick="addFlashToCart()">
                    <i class="fas fa-bolt"></i>
                    Grab This Deal!
                </button>
                <button class="btn-secondary" onclick="setReminder('tomato-flash')">
                    <i class="fas fa-bell"></i>
                    Set Reminder
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    startFlashTimer();
}

function showNewArrivalDetails(offerId) {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = 'New Arrival - Exotic Fruits';
    content.innerHTML = `
        <div class="new-arrival-detail">
            <div class="new-header">
                <h4>🌟 New Arrival 🌟</h4>
                <p>Discover our exotic fruit collection, freshly imported</p>
            </div>
            
            <div class="new-products">
                <div class="new-product">
                    <img src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Dragon Fruit">
                    <div class="product-info">
                        <h5>Dragon Fruit</h5>
                        <p>Exotic and refreshing</p>
                        <span class="price">$4.99 each</span>
                    </div>
                </div>
                <div class="new-product">
                    <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Passion Fruit">
                    <div class="product-info">
                        <h5>Passion Fruit</h5>
                        <p>Tropical and tangy</p>
                        <span class="price">$3.99 pack</span>
                    </div>
                </div>
                <div class="new-product">
                    <img src="https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Star Fruit">
                    <div class="product-info">
                        <h5>Star Fruit</h5>
                        <p>Unique star-shaped fruit</p>
                        <span class="price">$5.49 each</span>
                    </div>
                </div>
            </div>
            
            <div class="new-features">
                <h5>Why you'll love them:</h5>
                <ul>
                    <li>Freshly imported and hand-picked</li>
                    <li>Rich in vitamins and antioxidants</li>
                    <li>Perfect for smoothies and desserts</li>
                    <li>Exotic taste experience</li>
                </ul>
            </div>
            
            <div class="new-actions">
                <button class="btn-primary" onclick="addNewToCart()">
                    <i class="fas fa-star"></i>
                    Try Exotic Collection
                </button>
                <button class="btn-secondary" onclick="learnMoreExotic()">
                    <i class="fas fa-book"></i>
                    Learn More
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showClearanceDetails(offerId) {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = 'Clearance Sale - Canned Goods';
    content.innerHTML = `
        <div class="clearance-detail">
            <div class="clearance-header">
                <h4>🏷️ Clearance Sale 🏷️</h4>
                <p>Massive discounts on selected canned products</p>
            </div>
            
            <div class="clearance-products">
                <div class="clearance-product">
                    <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Canned Beans">
                    <div class="product-info">
                        <h5>Canned Beans</h5>
                        <p>400g can</p>
                        <div class="pricing">
                            <span class="original-price">$2.49</span>
                            <span class="discount-price">$1.49</span>
                        </div>
                        <span class="stock">Only 8 left!</span>
                    </div>
                </div>
                <div class="clearance-product">
                    <img src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Canned Corn">
                    <div class="product-info">
                        <h5>Canned Corn</h5>
                        <p>340g can</p>
                        <div class="pricing">
                            <span class="original-price">$1.99</span>
                            <span class="discount-price">$0.99</span>
                        </div>
                        <span class="stock">Only 12 left!</span>
                    </div>
                </div>
            </div>
            
            <div class="clearance-note">
                <p><strong>Note:</strong> These items are on clearance and won't be restocked. Get them while they last!</p>
            </div>
            
            <div class="clearance-actions">
                <button class="btn-primary" onclick="addClearanceToCart()">
                    <i class="fas fa-fire"></i>
                    Grab Clearance Items
                </button>
                <button class="btn-secondary" onclick="viewAllClearance()">
                    <i class="fas fa-list"></i>
                    View All Clearance
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showMegaSale() {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = 'MEGA SALE - Up to 70% OFF';
    content.innerHTML = `
        <div class="mega-sale-detail">
            <div class="mega-header">
                <h4>🔥 MEGA SALE EVENT 🔥</h4>
                <p>Biggest sale of the season! Don't miss these incredible deals</p>
            </div>
            
            <div class="mega-timer">
                <h5>Sale Ends In:</h5>
                <div class="timer-large">
                    <div class="timer-unit">
                        <span class="time">02</span>
                        <span class="label">Days</span>
                    </div>
                    <div class="timer-unit">
                        <span class="time">15</span>
                        <span class="label">Hours</span>
                    </div>
                    <div class="timer-unit">
                        <span class="time">45</span>
                        <span class="label">Minutes</span>
                    </div>
                </div>
            </div>
            
            <div class="mega-categories">
                <div class="mega-category">
                    <h6>🥬 Fresh Produce</h6>
                    <p>Up to 50% off on selected fruits and vegetables</p>
                </div>
                <div class="mega-category">
                    <h6>🥛 Dairy & Eggs</h6>
                    <p>Up to 40% off on milk, cheese, and eggs</p>
                </div>
                <div class="mega-category">
                    <h6>🍞 Bakery</h6>
                    <p>Up to 60% off on fresh bread and pastries</p>
                </div>
                <div class="mega-category">
                    <h6>🥤 Beverages</h6>
                    <p>Up to 70% off on selected drinks</p>
                </div>
            </div>
            
            <div class="mega-actions">
                <button class="btn-primary" onclick="shopMegaSale()">
                    <i class="fas fa-shopping-bag"></i>
                    Start Mega Shopping
                </button>
                <button class="btn-secondary" onclick="downloadMegaCatalog()">
                    <i class="fas fa-download"></i>
                    Download Catalog
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    startMegaTimer();
}

function showSeasonalOffers(season) {
    const modal = document.getElementById('offerModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    const seasonData = {
        summer: {
            title: 'Summer Refreshments',
            products: ['Iced Coffee', 'Fresh Smoothies', 'Watermelon', 'Ice Cream'],
            discount: '30% OFF'
        },
        winter: {
            title: 'Winter Warmers',
            products: ['Hot Chocolate', 'Soup Mixes', 'Comfort Food', 'Tea Collection'],
            discount: '25% OFF'
        },
        spring: {
            title: 'Spring Fresh',
            products: ['Fresh Herbs', 'Salad Kits', 'Spring Vegetables', 'Light Meals'],
            discount: '20% OFF'
        }
    };
    
    const data = seasonData[season];
    
    title.textContent = data.title;
    content.innerHTML = `
        <div class="seasonal-detail">
            <div class="seasonal-header">
                <h4>${data.title}</h4>
                <p>Special ${data.discount} on seasonal favorites</p>
            </div>
            
            <div class="seasonal-products">
                <h5>Featured Products:</h5>
                <ul>
                    ${data.products.map(product => `<li>${product}</li>`).join('')}
                </ul>
            </div>
            
            <div class="seasonal-benefits">
                <h5>Seasonal Benefits:</h5>
                <ul>
                    <li>Fresh and in-season products</li>
                    <li>Best quality and taste</li>
                    <li>Competitive pricing</li>
                    <li>Perfect for the current weather</li>
                </ul>
            </div>
            
            <div class="seasonal-actions">
                <button class="btn-primary" onclick="shopSeasonal('${season}')">
                    <i class="fas fa-leaf"></i>
                    Shop ${data.title}
                </button>
                <button class="btn-secondary" onclick="getSeasonalRecipes('${season}')">
                    <i class="fas fa-utensils"></i>
                    Get Recipes
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Utility Functions
function closeModal() {
    const modal = document.getElementById('offerModal');
    modal.classList.remove('active');
}

function copyPromoCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showNotification(`Promo code "${code}" copied to clipboard!`);
    }).catch(() => {
        showNotification('Failed to copy promo code', 'error');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    const messageEl = document.getElementById('notificationMessage');
    
    messageEl.textContent = message;
    
    if (type === 'error') {
        notification.style.background = '#e53e3e';
    } else {
        notification.style.background = '#48bb78';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Cart Functions
function addToCart(productId) {
    // Add to cart logic
    updateCartCount(1);
    showNotification('Item added to cart successfully!');
    closeModal();
}

function addBOGOToCart() {
    updateCartCount(2);
    showNotification('BOGO offer applied! 2 items added to cart.');
    closeModal();
}

function addFlashToCart() {
    updateCartCount(1);
    showNotification('Flash sale item added to cart!');
    closeModal();
}

function updateCartCount(increment) {
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent) || 0;
    cartCount.textContent = currentCount + increment;
    
    // Animation
    cartCount.style.animation = 'none';
    setTimeout(() => {
        cartCount.style.animation = 'pulse 0.5s';
    }, 10);
}

// Timer Functions
function initializeCountdownTimers() {
    // Initialize any countdown timers on the page
}

function startFlashTimer() {
    const timerUnits = document.querySelectorAll('.flash-timer-large .timer-unit .time');
    if (timerUnits.length === 0) return;
    
    let hours = 4, minutes = 15, seconds = 22;
    
    const timer = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                    showNotification('Flash sale has ended!', 'error');
                    return;
                }
            }
        }
        
        timerUnits[0].textContent = hours.toString().padStart(2, '0');
        timerUnits[1].textContent = minutes.toString().padStart(2, '0');
        timerUnits[2].textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

function startMegaTimer() {
    const timerUnits = document.querySelectorAll('.mega-timer .timer-unit .time');
    if (timerUnits.length === 0) return;
    
    let days = 2, hours = 15, minutes = 45;
    
    const timer = setInterval(() => {
        if (minutes > 0) {
            minutes--;
        } else {
            if (hours > 0) {
                hours--;
                minutes = 59;
            } else {
                if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                } else {
                    clearInterval(timer);
                    showNotification('Mega sale has ended!', 'error');
                    return;
                }
            }
        }
        
        timerUnits[0].textContent = days.toString().padStart(2, '0');
        timerUnits[1].textContent = hours.toString().padStart(2, '0');
        timerUnits[2].textContent = minutes.toString().padStart(2, '0');
    }, 1000);
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input-large');
    const searchBtn = document.querySelector('.search-btn-large');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input-large');
    const query = searchInput.value.trim();
    
    if (query) {
        showNotification(`Searching for: ${query}`);
        // In a real app, this would filter offers
        console.log('Search query:', query);
    }
}

// Animation Functions
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all offer cards and sections
    document.querySelectorAll('.offer-card, .coupon-card, .seasonal-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Data Loading Functions
function loadOfferData() {
    // In a real application, this would fetch data from an API
    console.log('Loading offer data...');
}

function loadCategoryData(category) {
    // Load category-specific data
    console.log(`Loading ${category} offers...`);
}

function getOfferData(offerId) {
    // Mock data - in real app, this would come from backend
    return {
        id: offerId,
        title: 'Organic Fruits Bundle',
        description: 'A wonderful selection of fresh organic fruits including apples, bananas, oranges, and seasonal berries. Perfect for a healthy breakfast or snack.',
        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        originalPrice: '$25.00',
        discountPrice: '$17.50',
        features: [
            '3 types of fresh organic fruits',
            'Perfect for 2-3 people',
            'Delivered fresh daily',
            '100% organic certification'
        ]
    };
}

// Placeholder functions for additional actions
function saveOffer(offerId) {
    showNotification('Offer saved to your favorites!');
}

function shareOffer(offerId) {
    showNotification('Offer shared successfully!');
}

function shopVegetables() {
    showNotification('Redirecting to vegetable section...');
    closeModal();
}

function checkDeliveryArea() {
    showNotification('Checking delivery availability...');
}

function setReminder(offerId) {
    showNotification('Reminder set for this flash sale!');
}

function learnMoreExotic() {
    showNotification('Opening exotic fruits guide...');
}

function viewAllClearance() {
    showNotification('Showing all clearance items...');
    closeModal();
}

function shopMegaSale() {
    showNotification('Opening mega sale section...');
    closeModal();
}

function downloadMegaCatalog() {
    showNotification('Downloading mega sale catalog...');
}

function shopSeasonal(season) {
    showNotification(`Opening ${season} collection...`);
    closeModal();
}

function getSeasonalRecipes(season) {
    showNotification(`Loading ${season} recipes...`);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('offerModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Export functions for global access
window.switchOfferCategory = switchOfferCategory;
window.copyPromoCode = copyPromoCode;
window.closeModal = closeModal;
window.showOfferDetails = showOfferDetails;
window.showBOGODetails = showBOGODetails;
window.showDeliveryDetails = showDeliveryDetails;
window.showFlashDetails = showFlashDetails;
window.showNewArrivalDetails = showNewArrivalDetails;
window.showClearanceDetails = showClearanceDetails;
window.showMegaSale = showMegaSale;
window.showSeasonalOffers = showSeasonalOffers;