// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZATION =====
    initializePage();
    
    function initializePage() {
        // Mark body as loaded for fade-in effect
        document.body.classList.add('loaded');
        
        // Initialize all components
        initializeNavigation();
        initializeQuickLinks();
        initializeFAQ();
        initializeTermsTabs();
        initializeContactForm();
        initializeBackToTop();
        initializeSearch();
        initializePrivacyControls();
        
        // Show first section by default
        showSection('faq');
        
        console.log('FreshMart Info Page initialized successfully!');
    }
    
    // ===== NAVIGATION FUNCTIONALITY =====
    function initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navLinks');
        
        // Nav links click handler
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                showSection(section);
            });
        });
        
        // Hamburger menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== QUICK LINKS FUNCTIONALITY =====
    function initializeQuickLinks() {
        const quickLinkCards = document.querySelectorAll('.quick-link-card');
        
        quickLinkCards.forEach(card => {
            card.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                showSection(section);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
    }
    
    // ===== SECTION MANAGEMENT =====
    function showSection(sectionName) {
        const contentSections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-link');
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll to top of section with offset for navbar
            setTimeout(() => {
                const yOffset = -80;
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 100);
        }
        
        // Update active nav link
        updateActiveLink(navLinks, sectionName);
        updateActiveLink(footerLinks, sectionName);
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navLinks');
        const hamburger = document.getElementById('hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        // Show notification
        showToast(`Navigated to ${getSectionTitle(sectionName)}`, 'info');
    }
    
    function updateActiveLink(links, sectionName) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionName) {
                link.classList.add('active');
            }
        });
    }
    
    function getSectionTitle(sectionName) {
        const titles = {
            'faq': 'FAQ',
            'return': 'Return Policy',
            'terms': 'Terms & Conditions',
            'privacy': 'Privacy Policy',
            'contact': 'Contact Us'
        };
        return titles[sectionName] || 'Section';
    }
    
    // ===== FAQ ACCORDION FUNCTIONALITY =====
    function initializeFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items in the same category
                const category = faqItem.closest('.faq-category');
                const categoryItems = category.querySelectorAll('.faq-item');
                categoryItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
        
        // Add animation to FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        faqItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }
    
    // ===== TERMS TABS FUNCTIONALITY =====
    function initializeTermsTabs() {
        const termsNavBtns = document.querySelectorAll('.terms-nav-btn');
        const termsTabs = document.querySelectorAll('.terms-tab');
        const termsAgreement = document.getElementById('termsAgreement');
        const agreeBtn = document.querySelector('.agree-btn');
        
        // Tab navigation
        termsNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                termsNavBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected tab
                termsTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.id === `${tabId}-tab`) {
                        tab.classList.add('active');
                    }
                });
            });
        });
        
        // Terms agreement
        if (termsAgreement && agreeBtn) {
            termsAgreement.addEventListener('change', function() {
                agreeBtn.disabled = !this.checked;
            });
            
            agreeBtn.addEventListener('click', function() {
                if (!this.disabled) {
                    showToast('Thank you for agreeing to our Terms & Conditions!', 'success');
                    // In a real application, you would redirect to the main shopping page
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                }
            });
        }
    }
    
    // ===== CONTACT FORM FUNCTIONALITY =====
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value;
                const orderId = document.getElementById('orderId').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Validation
                if (!name || !email || !subject || !message) {
                    showToast('Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showToast('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the data to a server here
                console.log('Contact form submitted:', { name, email, subject, orderId, message });
            });
        }
    }
    
    // ===== PRIVACY CONTROLS FUNCTIONALITY =====
    function initializePrivacyControls() {
        const savePreferencesBtn = document.querySelector('.save-preferences');
        const rightBtns = document.querySelectorAll('.right-btn');
        
        // Save cookie preferences
        if (savePreferencesBtn) {
            savePreferencesBtn.addEventListener('click', function() {
                showToast('Cookie preferences saved successfully!', 'success');
                
                // In a real application, you would save these preferences
                const essential = document.querySelector('.cookie-option:nth-child(1) input').checked;
                const analytics = document.querySelector('.cookie-option:nth-child(2) input').checked;
                const marketing = document.querySelector('.cookie-option:nth-child(3) input').checked;
                
                console.log('Cookie preferences:', { essential, analytics, marketing });
            });
        }
        
        // Privacy rights buttons
        rightBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim();
                showToast(`${action} request submitted. We'll process it within 48 hours.`, 'info');
                
                // In a real application, you would handle the specific request
            });
        });
    }
    
    // ===== BACK TO TOP FUNCTIONALITY =====
    function initializeBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ===== SEARCH FUNCTIONALITY =====
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput && searchBtn) {
            // Search button click
            searchBtn.addEventListener('click', performSearch);
            
            // Enter key search
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (!searchTerm) {
                showToast('Please enter a search term.', 'info');
                return;
            }
            
            // Search through FAQ items
            let found = false;
            const faqItems = document.querySelectorAll('.faq-item');
            
            // First, show FAQ section
            showSection('faq');
            
            // Close all FAQ items initially
            faqItems.forEach(item => {
                item.classList.remove('active');
                item.style.backgroundColor = '';
            });
            
            // Search and highlight matching items
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    if (!found) {
                        found = true;
                        // Scroll to first matching item
                        setTimeout(() => {
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 500);
                    }
                    item.classList.add('active');
                    item.style.backgroundColor = '#fffacd';
                    
                    // Remove highlight after 5 seconds
                    setTimeout(() => {
                        item.style.backgroundColor = '';
                    }, 5000);
                }
            });
            
            if (found) {
                showToast(`Found results for "${searchTerm}"`, 'success');
            } else {
                showToast(`No results found for "${searchTerm}"`, 'info');
                
                // Suggest similar terms
                const suggestions = getSearchSuggestions(searchTerm);
                if (suggestions.length > 0) {
                    setTimeout(() => {
                        showToast(`Try searching for: ${suggestions.join(', ')}`, 'info');
                    }, 1500);
                }
            }
            
            searchInput.value = '';
        }
        
        function getSearchSuggestions(term) {
            const commonTerms = [
                'delivery', 'payment', 'return', 'fresh', 'organic', 
                'account', 'quality', 'shipping', 'refund', 'privacy'
            ];
            
            return commonTerms.filter(word => 
                word.includes(term) || term.includes(word) || 
                calculateSimilarity(term, word) > 0.6
            ).slice(0, 3);
        }
        
        function calculateSimilarity(str1, str2) {
            const longer = str1.length > str2.length ? str1 : str2;
            const shorter = str1.length > str2.length ? str2 : str1;
            
            if (longer.length === 0) return 1.0;
            
            return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
        }
        
        function editDistance(str1, str2) {
            const track = Array(str2.length + 1).fill(null).map(() =>
                Array(str1.length + 1).fill(null));
            
            for (let i = 0; i <= str1.length; i += 1) {
                track[0][i] = i;
            }
            
            for (let j = 0; j <= str2.length; j += 1) {
                track[j][0] = j;
            }
            
            for (let j = 1; j <= str2.length; j += 1) {
                for (let i = 1; i <= str1.length; i += 1) {
                    const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                    track[j][i] = Math.min(
                        track[j][i - 1] + 1, // deletion
                        track[j - 1][i] + 1, // insertion
                        track[j - 1][i - 1] + indicator, // substitution
                    );
                }
            }
            
            return track[str2.length][str1.length];
        }
    }
    
    // ===== TOAST NOTIFICATION SYSTEM =====
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        
        if (toast) {
            toast.textContent = message;
            toast.className = 'toast ' + type;
            toast.classList.add('show');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
    }
    
    // ===== UTILITY FUNCTIONS =====
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== FOOTER LINK HANDLING =====
    const footerLinks = document.querySelectorAll('.footer-links a[data-section]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // ===== ENHANCE USER EXPERIENCE =====
    
    // Add loading animation to quick link cards
    const quickLinkCards = document.querySelectorAll('.quick-link-card');
    quickLinkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add intersection observer for animations
    const animatedElements = document.querySelectorAll('.quick-link-card, .contact-method, .highlight-card, .usage-item, .right-item');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animationObserver.observe(el);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
        
        // Ctrl+/ focuses search (when not in input)
        if (e.ctrlKey && e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // Print functionality for policies
    function setupPrintButtons() {
        // This would be implemented if print buttons were added to the UI
        console.log('Print functionality ready to be implemented');
    }
    
    // Initialize print functionality
    setupPrintButtons();
})