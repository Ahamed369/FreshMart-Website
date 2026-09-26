// About Us JavaScript for FreshMart

document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

function initializeAboutPage() {
    initializeTeamHover();
    initializeValueCards();
    initializeTestimonials();
    initializeCounterAnimation();
    initializeScrollAnimations();
}

// Team Member Hover Effects
function initializeTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Value Cards Interaction
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle active state
            valueCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Testimonials Slider
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    // Auto-rotate testimonials
    setInterval(() => {
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0.5';
            testimonial.style.transform = 'scale(0.95)';
        });
        
        testimonials[currentTestimonial].style.opacity = '1';
        testimonials[currentTestimonial].style.transform = 'scale(1)';
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }, 5000);
}

// Counter Animation for Stats
function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent);
                animateCounter(stat, 0, target, 2000);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        // Format numbers with commas
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .value-card, .achievement-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => observer.observe(element));
}

// Campus Expansion Form Handler
function handleCampusExpansion() {
    const form = document.getElementById('campusExpansionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const campusData = {
                name: formData.get('campusName'),
                email: formData.get('email'),
                studentCount: formData.get('studentCount'),
                message: formData.get('message')
            };
            
            // Simulate form submission
            showToast('Thank you for your interest! We\'ll contact you about expanding to your campus.', 'success');
            form.reset();
        });
    }
}

// Team Member Modal
function showTeamMemberModal(memberId) {
    const member = getTeamMemberById(memberId);
    if (!member) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal team-member-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${member.name}</h3>
                <button class="modal-close" onclick="closeTeamMemberModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="member-details">
                    <div class="member-image-large">
                        <img src="${member.image}" alt="${member.name}">
                    </div>
                    <div class="member-info-large">
                        <span class="member-role">${member.role}</span>
                        <p>${member.bio}</p>
                        <div class="member-contact">
                            <h4>Connect with ${member.firstName}</h4>
                            <div class="social-links">
                                ${member.linkedin ? <a href="${member.linkedin}"><i class="fab fa-linkedin"></i></a> : ''}
                                ${member.twitter ? <a href="${member.twitter}"><i class="fab fa-twitter"></i></a> : ''}
                                ${member.instagram ? <a href="${member.instagram}"><i class="fab fa-instagram"></i></a> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeTeamMemberModal() {
    const modal = document.querySelector('.team-member-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function getTeamMemberById(memberId) {
    const teamMembers = {
        1: {
            id: 1,
            name: 'Sarah Johnson',
            firstName: 'Sarah',
            role: 'Founder & CEO',
            image: '../images/team-sarah.jpg',
            bio: 'Sarah founded FreshMart during her final year of computer science studies. Frustrated with the lack of affordable, convenient grocery options for students, she combined her passion for technology with her commitment to healthy eating. Under her leadership, FreshMart has grown from a campus project to serving 25+ universities.',
            linkedin: '#',
            twitter: '#',
            instagram: '#'
        },
        2: {
            id: 2,
            name: 'Mike Chen',
            firstName: 'Mike',
            role: 'Operations Manager',
            image: '../images/team-mike.jpg',
            bio: 'Mike oversees all operational aspects of FreshMart, from delivery logistics to supplier relationships. His background in business administration and experience in campus delivery services makes him perfectly suited to ensure smooth operations across all our locations.',
            linkedin: '#',
            twitter: '#'
        },
        3: {
            id: 3,
            name: 'Emily Rodriguez',
            firstName: 'Emily',
            role: 'Head of Procurement',
            image: '../images/team-emily.jpg',
            bio: 'Emily ensures that every product in our catalog meets our high standards for quality and freshness. With a degree in nutrition science, she personally visits our partner farms and suppliers to maintain the quality that our students deserve.',
            linkedin: '#',
            instagram: '#'
        },
        4: {
            id: 4,
            name: 'David Kim',
            firstName: 'David',
            role: 'Technology Lead',
            image: '../images/team-david.jpg',
            bio: 'David leads our technology team in creating the seamless shopping experience that students love. His expertise in full-stack development and user experience design has been instrumental in making FreshMart intuitive and reliable.',
            linkedin: '#'
        }
    };
    
    return teamMembers[memberId];
}

// Value Card Expansion
function expandValueCard(cardId) {
    const cards = document.querySelectorAll('.value-card');
    cards.forEach(card => {
        if (card.dataset.cardId === cardId) {
            card.classList.add('expanded');
        } else {
            card.classList.remove('expanded');
        }
    });
}

// Timeline Scroll Animation
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
}

// Partner Logo Animation
function initializePartnerLogos() {
    const logos = document.querySelectorAll('.partner-logo');
    
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAboutPage,
        showTeamMemberModal,
        expandValueCard,
        animateCounter
    };
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
