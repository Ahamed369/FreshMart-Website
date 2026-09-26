// Contact Page JavaScript for FreshMart
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
    initializeContactNavigation(); // This was missing!
    initializeContactForm();
    initializeStoreLocator();
    initializeLiveChat();
    initializeServiceAccordion();
});

// Page Initialization
function initializeContactPage() {
    // Set active tab based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && ['support', 'locations', 'services'].includes(hash)) {
        switchContactTab(hash);
    }
    
    // Update active tab based on current section
    updateActiveContactTab();
}

// navbar.js - COMPLETE NAVBAR FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeActivePage();
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


// Contact Navigation - FIXED VERSION
function initializeContactNavigation() {
    const contactTabs = document.querySelectorAll('.contact-tab');
    
    console.log('Found contact tabs:', contactTabs.length); // Debug log
    
    contactTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('Tab clicked:', this.getAttribute('data-tab')); // Debug log
            const targetTab = this.getAttribute('data-tab');
            switchContactTab(targetTab);
            updateURLHash(targetTab);
        });
    });
}

function switchContactTab(tabId) {
    console.log('Switching to tab:', tabId); // Debug log
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.contact-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target tab content
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update navigation tabs
    updateActiveContactTab();
    
    // Add smooth scroll animation
    setTimeout(() => {
        targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function updateActiveContactTab() {
    const activeContent = document.querySelector('.contact-tab-content.active');
    if (!activeContent) return;
    
    const tabId = activeContent.id;
    const contactTabs = document.querySelectorAll('.contact-tab');
    
    contactTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
            // Add animation effect
            tab.style.transform = 'scale(1.05)';
            setTimeout(() => {
                tab.style.transform = 'scale(1)';
            }, 150);
        } else {
            tab.classList.remove('active');
        }
    });
}

function updateURLHash(tabId) {
    history.replaceState(null, null, `#${tabId}`);

}

// Contact Form Handling - ENHANCED VERSION
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const fileInput = document.getElementById('attachment');
    const fileName = document.getElementById('fileName');
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 1000) {
                charCount.style.color = '#e74c3c';
                this.style.borderColor = '#e74c3c';
            } else if (length > 800) {
                charCount.style.color = '#f39c12';
                this.style.borderColor = '#f39c12';
            } else {
                charCount.style.color = 'var(--text-light)';
                this.style.borderColor = 'var(--border-color)';
            }
        });
    }
    
    // File input display with animation
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
                fileName.style.color = 'var(--primary-color)';
                fileName.style.fontWeight = '600';
                
                // Add success animation
                const fileLabel = document.querySelector('.file-upload-label');
                fileLabel.style.borderColor = 'var(--primary-color)';
                fileLabel.style.background = 'rgba(76, 175, 80, 0.1)';
                
                setTimeout(() => {
                    fileLabel.style.borderColor = 'var(--border-color)';
                    fileLabel.style.background = 'var(--bg-light)';
                }, 2000);
            } else {
                fileName.textContent = 'No file chosen';
                fileName.style.color = 'var(--text-light)';
                fileName.style.fontWeight = 'normal';
            }
        });
    }
    
    // Form submission with enhanced validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submission started'); // Debug log
        
        if (validateContactForm()) {
            submitContactForm();
        } else {
            // Shake animation for invalid form
            contactForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
        }
    });
    
    // Real-time validation with visual feedback
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const isValid = validateField(this);
            
            // Visual feedback
            if (isValid && this.value.trim() !== '') {
                this.style.borderColor = 'var(--primary-color)';
                this.style.background = 'rgba(76, 175, 80, 0.05)';
            } else if (!isValid && this.value.trim() !== '') {
                this.style.borderColor = '#e74c3c';
                this.style.background = 'rgba(231, 76, 60, 0.05)';
            } else {
                this.style.borderColor = 'var(--border-color)';
                this.style.background = 'white';
            }
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
            // Reset visual feedback during typing
            this.style.borderColor = 'var(--border-color)';
            this.style.background = 'white';
        });
        
        // Add focus animation
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
            
            // Add error animation
            input.style.animation = 'fieldError 0.3s';
            setTimeout(() => {
                input.style.animation = '';
            }, 300);
        }
    });
    
    // Validate reCAPTCHA (if present)
    const captchaElement = document.querySelector('.g-recaptcha');
    if (captchaElement) {
        try {
            const captchaResponse = grecaptcha.getResponse();
            if (captchaResponse.length === 0) {
                showFieldError('captchaError', 'Please complete the reCAPTCHA verification');
                isValid = false;
                
                // Animate captcha area
                captchaElement.style.animation = 'fieldError 0.3s';
                setTimeout(() => {
                    captchaElement.style.animation = '';
                }, 300);
            } else {
                clearFieldError('captchaError');
            }
        } catch (error) {
            console.log('reCAPTCHA not loaded, skipping validation');
        }
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    
    switch (fieldName) {
        case 'fullName':
            if (value.length < 2) {
                showFieldError('nameError', 'Please enter your full name (min 2 characters)');
                isValid = false;
            } else if (value.length > 50) {
                showFieldError('nameError', 'Name is too long (max 50 characters)');
                isValid = false;
            } else {
                clearFieldError('nameError');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError('emailError', 'Please enter a valid email address (e.g., user@example.com)');
                isValid = false;
            } else {
                clearFieldError('emailError');
            }
            break;
            
        case 'phoneNumber':
            if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            } else {
                clearFieldError('phoneError');
            }
            break;
            
        case 'subject':
            if (value.length < 5) {
                showFieldError('subjectError', 'Please enter a descriptive subject (min 5 characters)');
                isValid = false;
            } else if (value.length > 100) {
                showFieldError('subjectError', 'Subject is too long (max 100 characters)');
                isValid = false;
            } else {
                clearFieldError('subjectError');
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showFieldError('messageError', 'Please provide more details in your message (min 10 characters)');
                isValid = false;
            } else if (value.length > 1000) {
                showFieldError('messageError', 'Message is too long (max 1000 characters)');
                isValid = false;
            } else {
                clearFieldError('messageError');
            }
            break;
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add pulsing animation to draw attention
        errorElement.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            errorElement.style.animation = '';
        }, 500);
    }
}

function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state with animation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
    submitBtn.disabled = true;
    
    // Add loading animation to form
    form.style.opacity = '0.8';
    form.style.pointerEvents = 'none';
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Generate reference ID
        const referenceId = 'FM-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        document.getElementById('referenceId').textContent = referenceId;
        
        // Show success modal with confetti effect
        showSuccessModal();
        
        // Reset form with animation
        form.reset();
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
        document.getElementById('fileName').textContent = 'No file chosen';
        document.getElementById('charCount').textContent = '0';
        
        // Reset all field styles
        const formInputs = form.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.style.borderColor = 'var(--border-color)';
            input.style.background = 'white';
        });
        
        // Reset button with success animation
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
        
        // Reset reCAPTCHA if present
        try {
            grecaptcha.reset();
        } catch (error) {
            console.log('reCAPTCHA not available to reset');
        }
        
        // Log submission (in real app, send to backend)
        console.log('Contact form submitted:', {
            name: formData.get('fullName'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            referenceId: referenceId,
            timestamp: new Date().toISOString()
        });
        
    }, 2000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (!modal) {
        console.error('Success modal not found!');
        return;
    }
    
    modal.classList.add('active');
    
    // Add confetti effect
    createConfetti();
    
    // Close modal handlers
    const closeBtn = document.getElementById('successModalClose');
    const okBtn = document.getElementById('successModalOk');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSuccessModal);
    }
    if (okBtn) {
        okBtn.addEventListener('click', closeSuccessModal);
    }
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSuccessModal();
        }
    });
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Store Locator - ENHANCED VERSION
function initializeStoreLocator() {
    // Check if we're on the locations tab
    const locationsTab = document.getElementById('locations');
    if (!locationsTab) {
        console.log('Locations tab not active, skipping map initialization');
        return;
    }
    
    initializeMap();
    loadStores();
    initializeStoreSearch();
    initializeStoreFilters();
}

let map;
let stores = [];
let markers = [];

function initializeMap() {
    const mapElement = document.getElementById('storeMap');
    if (!mapElement) {
        console.error('Store map element not found!');
        return;
    }
    
    try {
        // Initialize Leaflet map
        map = L.map('storeMap').setView([40.7128, -74.0060], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add locate me functionality
        const locateBtn = document.getElementById('locateMeBtn');
        const resetBtn = document.getElementById('resetMapBtn');
        
        if (locateBtn) {
            locateBtn.addEventListener('click', locateUser);
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', resetMapView);
        }
        
        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

function loadStores() {
    // Mock store data
    stores = [
        {
            id: 1,
            name: "FreshMart University Store",
            address: "123 University Avenue, Campus District",
            city: "New York",
            zip: "10001",
            lat: 40.7282,
            lng: -73.9942,
            phone: "(555) 123-4567",
            hours: "Mon-Sun: 8:00 AM - 11:00 PM",
            isOpen: true,
            features: ["Pickup", "Delivery", "24/7", "Student Discount"],
            distance: "0.5 miles"
        },
        {
            id: 2,
            name: "FreshMart Downtown",
            address: "456 Main Street, Downtown",
            city: "New York",
            zip: "10002",
            lat: 40.7136,
            lng: -74.0060,
            phone: "(555) 123-4568",
            hours: "Mon-Sat: 7:00 AM - 10:00 PM, Sun: 8:00 AM - 9:00 PM",
            isOpen: true,
            features: ["Pickup", "Delivery", "Bakery"],
            distance: "1.2 miles"
        },
        {
            id: 3,
            name: "FreshMart West Campus",
            address: "789 College Road, West Campus",
            city: "New York",
            zip: "10003",
            lat: 40.7414,
            lng: -74.0055,
            phone: "(555) 123-4569",
            hours: "Mon-Fri: 6:00 AM - 12:00 AM, Sat-Sun: 7:00 AM - 11:00 PM",
            isOpen: false,
            features: ["Pickup", "24/7", "Student Lounge"],
            distance: "0.8 miles"
        }
    ];
    
    renderStores();
    addStoreMarkers();
}

function renderStores() {
    const container = document.getElementById('storesContainer');
    if (!container) {
        console.error('Stores container not found!');
        return;
    }
    
    container.innerHTML = '';
    
    stores.forEach(store => {
        const storeCard = createStoreCard(store);
        container.appendChild(storeCard);
    });
}

function createStoreCard(store) {
    const card = document.createElement('div');
    card.className = 'store-card';
    card.setAttribute('data-store-id', store.id);
    
    const featuresHTML = store.features.map(feature => 
        <span class="feature-tag">${feature}</span>
    ).join('');
    
    card.innerHTML = `
        <div class="store-header">
            <h3 class="store-name">${store.name}</h3>
            <span class="store-status ${store.isOpen ? 'status-open' : 'status-closed'}">
                ${store.isOpen ? 'Open Now' : 'Closed'}
            </span>
        </div>
        <div class="store-details">
            <div class="store-address">
                <i class="fas fa-map-marker-alt"></i>
                <span>${store.address}, ${store.city}, NY ${store.zip}</span>
            </div>
            <div class="store-hours">
                <i class="fas fa-clock"></i>
                <span>${store.hours}</span>
            </div>
            <div class="store-phone">
                <i class="fas fa-phone"></i>
                <span>${store.phone}</span>
            </div>
        </div>
        <div class="store-features">
            ${featuresHTML}
        </div>
        <div class="store-distance">
            <i class="fas fa-walking"></i>
            <span>${store.distance} away</span>
        </div>
        <div class="store-actions">
            <button class="btn btn-outline store-directions-btn">
                <i class="fas fa-directions"></i>
                Directions
            </button>
            <button class="btn btn-primary store-call-btn">
                <i class="fas fa-phone"></i>
                Call
            </button>
        </div>
    `;
    
    // Add click handler to select store and center map
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.store-actions')) {
            selectStore(store.id);
            centerMapOnStore(store);
        }
    });
    
    // Add button event listeners
    const directionsBtn = card.querySelector('.store-directions-btn');
    const callBtn = card.querySelector('.store-call-btn');
    
    directionsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        getDirections(store.lat, store.lng);
    });
    
    callBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        callStore(store.phone);
    });
    
    return card;
}

function addStoreMarkers() {
    if (!map) {
        console.error('Map not initialized!');
        return;
    }
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    stores.forEach(store => {
        const marker = L.marker([store.lat, store.lng])
            .addTo(map)
            .bindPopup(`
                <div class="store-popup">
                    <h4>${store.name}</h4>
                    <p>${store.address}</p>
                    <p><strong>Hours:</strong> ${store.hours}</p>
                    <p><strong>Phone:</strong> ${store.phone}</p>
                    <div class="popup-actions">
                        <button onclick="getDirections(${store.lat}, ${store.lng})">Get Directions</button>
                        <button onclick="callStore('${store.phone}')">Call Store</button>
                    </div>
                </div>
            `);
        
        markers.push(marker);
        
        // Add click handler to marker
        marker.on('click', function() {
            selectStore(store.id);
        });
    });
}

function selectStore(storeId) {
    // Update store cards
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('active');
        if (parseInt(card.getAttribute('data-store-id')) === storeId) {
            card.classList.add('active');
            
            // Add selection animation
            card.style.animation = 'selectStore 0.3s';
            setTimeout(() => {
                card.style.animation = '';
            }, 300);
        }
    });
    
    // Highlight marker
    markers.forEach((marker, index) => {
        if (stores[index].id === storeId) {
            marker.openPopup();
            
            // Add bounce animation to marker
            marker.setZIndexOffset(1000);
            setTimeout(() => {
                marker.setZIndexOffset(0);
            }, 1000);
        }
    });
}

function centerMapOnStore(store) {
    if (map) {
        map.setView([store.lat, store.lng], 15);
    }
}

function initializeStoreSearch() {
    const searchInput = document.getElementById('storeSearch');
    const searchBtn = document.getElementById('storeSearchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performStoreSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performStoreSearch();
            }
        });
        
        // Add real-time search with debounce
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performStoreSearch, 300);
        });
    }
}

function performStoreSearch() {
    const searchTerm = document.getElementById('storeSearch').value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderStores();
        return;
    }
    
    const filteredStores = stores.filter(store => 
        store.name.toLowerCase().includes(searchTerm) ||
        store.address.toLowerCase().includes(searchTerm) ||
        store.city.toLowerCase().includes(searchTerm) ||
        store.zip.includes(searchTerm)
    );
    
    renderFilteredStores(filteredStores);
}

function initializeStoreFilters() {
    const filters = ['openNowFilter', 'pickupFilter', 'deliveryFilter'];
    
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                // Add animation when filter changes
                this.parentElement.style.animation = 'filterChange 0.3s';
                setTimeout(() => {
                    this.parentElement.style.animation = '';
                }, 300);
                
                applyStoreFilters();
            });
        }
    });
}

function applyStoreFilters() {
    const openNow = document.getElementById('openNowFilter')?.checked || false;
    const pickup = document.getElementById('pickupFilter')?.checked || false;
    const delivery = document.getElementById('deliveryFilter')?.checked || false;
    
    let filteredStores = stores;
    
    if (openNow) {
        filteredStores = filteredStores.filter(store => store.isOpen);
    }
    
    if (pickup) {
        filteredStores = filteredStores.filter(store => store.features.includes('Pickup'));
    }
    
    if (delivery) {
        filteredStores = filteredStores.filter(store => store.features.includes('Delivery'));
    }
    
    renderFilteredStores(filteredStores);
}

function renderFilteredStores(filteredStores) {
    const container = document.getElementById('storesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredStores.length === 0) {
        container.innerHTML = `
            <div class="no-stores-message">
                <i class="fas fa-store-slash"></i>
                <h3>No stores found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    filteredStores.forEach(store => {
        const storeCard = createStoreCard(store);
        container.appendChild(storeCard);
    });
}

function locateUser() {
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    const locateBtn = document.getElementById('locateMeBtn');
    const originalText = locateBtn.innerHTML;
    locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
    locateBtn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Center map on user location
            if (map) {
                map.setView([userLat, userLng], 15);
                
                // Add user marker
                L.marker([userLat, userLng])
                    .addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();
                
                // Calculate distances and sort stores
                stores.forEach(store => {
                    store.distance = calculateDistance(userLat, userLng, store.lat, store.lng);
                });
                
                stores.sort((a, b) => a.distance - b.distance);
                renderStores();
            }
            
            locateBtn.innerHTML = originalText;
            locateBtn.disabled = false;
            showToast('Location found!', 'success');
        },
        function(error) {
            let errorMessage = 'Unable to retrieve your location';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please enable location services.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
            }
            
            showToast(errorMessage, 'error');
            locateBtn.innerHTML = originalText;
            locateBtn.disabled = false;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distanceKm = R * c;
    const distanceMiles = distanceKm * 0.621371;
    
    return distanceMiles.toFixed(1) + ' miles';
}

function resetMapView() {
    if (map) {
        map.setView([40.7128, -74.0060], 13);
        showToast('Map view reset', 'info');
    }
}

function getDirections(lat, lng) {
    // Open Google Maps with directions
const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
window.open(url, '_blank');

    
    showToast('Opening directions in Google Maps...', 'info');
}

function callStore(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;

}

// Live Chat - ENHANCED VERSION
function initializeLiveChat() {
    const chatTrigger = document.getElementById('chatTrigger');
    const chatClose = document.getElementById('chatClose');
    const chatWidget = document.getElementById('liveChatWidget');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const liveChatBtn = document.getElementById('liveChatBtn');
    
    // Main chat trigger button
    if (chatTrigger && chatWidget) {
        chatTrigger.addEventListener('click', function() {
            chatWidget.classList.add('active');
            chatInput.focus();
            
            // Add entrance animation
            chatWidget.style.animation = 'chatSlideIn 0.3s';
            setTimeout(() => {
                chatWidget.style.animation = '';
            }, 300);
        });
    }
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWidget.classList.remove('active');
            
            // Add exit animation
            chatWidget.style.animation = 'chatSlideOut 0.3s';
            setTimeout(() => {
                chatWidget.style.animation = '';
            }, 300);
        });
    }
    
    // Send message functionality
    if (sendMessageBtn && chatInput) {
        sendMessageBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Live chat button in contact methods
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function() {
            chatWidget.classList.add('active');
            chatInput.focus();
        });
    }
    
    // Auto-open chat if URL has chat parameter
    if (window.location.search.includes('chat=true')) {
        setTimeout(() => {
            if (chatWidget) {
                chatWidget.classList.add('active');
                chatInput.focus();
            }
        }, 1000);
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) {
        // Shake animation for empty message
        chatInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            chatInput.style.animation = '';
        }, 500);
        return;
    }
    
    // Add user message with typing animation
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = generateBotResponse(message);
        addChatMessage(botResponse, 'bot');
    }, 1000 + Math.random() * 2000);
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
   messageElement.className = `chat-message ${sender}`;

    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <span class="message-time">${timestamp}</span>
    `;
    
    // Add entrance animation
    messageElement.style.animation = 'messageSlideIn 0.3s';
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Remove animation after completion
    setTimeout(() => {
        messageElement.style.animation = '';
    }, 300);
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingElement = document.createElement('div');
    typingElement.className = 'chat-message bot typing-indicator';
    typingElement.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingElement = document.querySelector('.typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
        return "We offer express delivery in 30-60 minutes for $4.99, or free on orders over $35. Standard delivery is $2.99 with 2-hour windows. 🚚";
    } else if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
        return "Our stores are open Mon-Sun from 8 AM to 11 PM. Online ordering is available 24/7 with delivery from 8 AM to 11 PM. ⏰";
    } else if (lowerMessage.includes('student') || lowerMessage.includes('discount')) {
        return "Students get 15% off with valid ID! Plus free delivery on orders over $25. Sign up for our student loyalty program for extra benefits. 🎓";
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
        return "We have a 7-day return policy for most items. Fresh products cannot be returned for safety reasons. Contact our returns department at returns@freshmart.com. 🔄";
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
        return "We accept credit/debit cards, digital wallets (Apple Pay, Google Pay), bank transfers, and cash on delivery for orders under $100. 💳";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! 👋 Welcome to FreshMart support. How can I help you today?";
    } else {
        const responses = [
            "I'd be happy to help with that! Could you provide more details?",
            "Thanks for your message! Let me connect you with a specialist who can assist you better.",
            "I understand you're looking for information. Our customer service team can provide detailed assistance at (555) 123-4567.",
            "That's a great question! Let me get you the most accurate information from our team.",
            "I'm here to help! Could you tell me more about what you need assistance with?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Service Accordion - ENHANCED VERSION
function initializeServiceAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            const allFaqItems = document.querySelectorAll('.faq-item');
            allFaqItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item with animation
            if (!isActive) {
                faqItem.classList.add('active');
                
                // Add opening animation
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.animation = 'accordionOpen 0.3s';
                setTimeout(() => {
                    answer.style.animation = '';
                }, 300);
            } else {
                faqItem.classList.remove('active');
            }
            
            // Animate the chevron icon
            const icon = this.querySelector('i');
            icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
    
    // Auto-open first FAQ item
    const firstFaq = document.querySelector('.faq-item');
    if (firstFaq) {
        firstFaq.classList.add('active');
    }
}

// Additional CSS Animations
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
    document.body.appendChild(confettiContainer);
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.top = '50%';
        confetti.style.left = '50%';
       confetti.style.animation = `confettiFall ${Math.random() * 1 + 1}s forwards`;

        confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 2000);
}

// Enhanced Toast System
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.custom-toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${getToastIcon(type)}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: toastSlideIn 0.3s;
        max-width: 400px;
    `;
    
    document.body.appendChild(toast);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'toastSlideOut 0.3s';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'toastSlideOut 0.3s';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        'success': '#27ae60',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#3498db'
    };
    return colors[type] || '#3498db';
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes fieldError {
            0%, 100% { border-color: var(--border-color); }
            50% { border-color: #e74c3c; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes selectStore {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        @keyframes filterChange {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes chatSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes chatSlideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes messageSlideIn {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes accordionOpen {
            from { max-height: 0; opacity: 0; }
            to { max-height: 1000px; opacity: 1; }
        }
        
        @keyframes confettiFall {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(${Math.random() * 200 - 100}px, 100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes toastSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes toastSlideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--text-light);
            animation: typing 1.4s infinite;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
            30% { transform: scale(1.2); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles when page loads
addDynamicStyles();

// Export functions for global access
window.switchContactTab = switchContactTab;
window.getDirections = getDirections;
window.callStore = callStore;
window.locateUser = locateUser;
window.resetMapView = resetMapView;
window.sendChatMessage = sendChatMessage;
window.showToast = showToast;

console.log('Contact page JavaScript loaded successfully!');