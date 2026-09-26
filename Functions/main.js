// Main JavaScript for FreshMart
// navbar.js - COMPLETE NAVBAR FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeActivePage();
    loadFeaturedProducts();
    initializeNewsletter();
    initializeAnimations();
});

// MAIN NAVBAR INITIALIZATION
function initializeNavbar() {
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeNavbarAnimations();
    initializeSearchFunctionality();
    initializeCartFunctionality();
    initializeHoverEffects();
}

// MOBILE MENU FUNCTIONALITY
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    const navbar = document.getElementById('navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            navbar.classList.toggle('menu-open');
            
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        }

        function closeMobileMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            navbar.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
}

// NAVBAR SCROLL EFFECTS
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// NAVBAR ANIMATIONS
function initializeNavbarAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add hover animations
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Logo hover animation
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        logoLink.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// SEARCH FUNCTIONALITY
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Search input focus effects
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.05)';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = 'none';
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Add search animation
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            searchBtn.style.transform = 'scale(1)';
        }, 200);
        
        console.log('Searching for:', query);
        // Add your search logic here
        searchInput.value = '';
    }
}

// CART FUNCTIONALITY
function initializeCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');

    if (cartIcon && cartCount) {
        cartIcon.addEventListener('click', function(e) {
            // Add cart click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        // Example: Add to cart function
        window.addToCart = function() {
            let count = parseInt(cartCount.textContent) || 0;
            count++;
            cartCount.textContent = count;
            
            // Cart animation
            cartCount.style.animation = 'none';
            setTimeout(() => {
                cartCount.style.animation = 'cartBounce 2s infinite';
            }, 10);
            
            // Show added animation
            cartIcon.classList.add('item-added');
            setTimeout(() => {
                cartIcon.classList.remove('item-added');
            }, 1000);
        };
    }
}

// HOVER EFFECTS
function initializeHoverEffects() {
    const navIcons = document.querySelectorAll('.nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ACTIVE PAGE HIGHLIGHTING
function initializeActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the page this link points to
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();
        
        // Add active class to current page link
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Special handling for category pages
        if (currentPage.includes('.html') && 
            currentPage !== 'category.html' && 
            linkHref === 'category.html') {
            link.classList.add('active');
        }
    });
}

// EXPORT FUNCTIONS FOR GLOBAL USE
window.toggleMobileMenu = function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
};

window.addToCart = function() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        count++;
        cartCount.textContent = count;
    }
};

console.log('🔄 Navbar initialized successfully!');


// Product Management
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');

    if (!featuredProductsContainer) return;

    const featuredProducts = [
        {
            id: 1,
            name: 'Fresh Organic Apples',
            description: 'Premium organic red apples, crisp and sweet',
            price: 4.99,
            originalPrice: 6.99,
            image: '../images/apples.jpg',
            category: 'fruits',
            badge: 'Sale'
        },
        {
            id: 2,
            name: 'Farm Fresh Milk',
            description: 'Premium whole milk from local farms',
            price: 3.49,
            originalPrice: null,
            image: '../images/milk.jpg',
            category: 'dairy'
        },
        {
            id: 3,
            name: 'Whole Grain Bread',
            description: 'Fresh baked whole grain bread',
            price: 2.99,
            originalPrice: null,
            image: '../images/bread.jpg',
            category: 'bakery'
        },
        {
            id: 4,
            name: 'Premium Chicken Breast',
            description: 'Boneless, skinless chicken breast',
            price: 12.99,
            originalPrice: 14.99,
            image: '../images/chicken.jpg',
            category: 'meat',
            badge: 'Popular'
        }
    ];

    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card fade-in">
            ${product.badge ? <div class="product-badge">${product.badge}</div> : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount">Save $${(product.originalPrice - product.price).toFixed(2)}</span>
                    ` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        Add to Cart
                    </button>
                    <button class="btn-wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Newsletter Subscription
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (validateEmail(email)) {
                // Simulate subscription
                setTimeout(() => {
                    showToast('Thank you for subscribing! Check your email for 15% off coupon.', 'success');
                    this.reset();
                }, 1000);
            } else {
                showToast('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');

    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .category-card, .product-card');
    animateElements.forEach(el => observer.observe(el));
}
// Utility Functions
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}


function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Search Functionality
function performSearch(query) {
    // This would typically make an API call
    console.log('Searching for:', query);
    // Redirect to search results page with query parameter
    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
}


// User Authentication State
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('freshmartUser'));
    return user || null;
}

function updateAuthUI() {
    const user = checkAuthStatus();
    const authLinks = document.querySelectorAll('.auth-link');

    authLinks.forEach(link => {
        if (user) {
            link.innerHTML = `<i class="fas fa-user"></i> ${user.firstName}`;
            link.href = 'profile.html';
        } else {
            link.innerHTML = '<i class="fas fa-user"></i> Account';
            link.href = 'auth.html';
        }
    });
}


// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartTotal,
        validateEmail,
        validatePassword,
        validatePhone,
        showToast,
        formatPrice,
        formatDate
    };
}