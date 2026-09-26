// Authentication JavaScript for FreshMart

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    initializeMobileNavigation();
    initializeFormValidation();
    initializePasswordStrength();
    initializeSocialAuth();
    initializeAccountActions();
    initializeModals();
    loadUserData();
    updateUIForAuthState();
}

// Mobile Navigation
function initializeMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Form Validation
function initializeFormValidation() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Real-time validation
    initializeRealTimeValidation();
}

function initializeRealTimeValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmailField(this);
        });
    });

    // Password validation
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id !== 'confirmPassword') {
            input.addEventListener('input', function() {
                if (this.id === 'signupPassword') {
                    updatePasswordStrength(this.value);
                }
                validatePasswordField(this);
            });
        }
    });

    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            validateConfirmPassword();
        });
    }

    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            validatePhoneField(this);
        });
    }

    // Name validation
    const nameInputs = document.querySelectorAll('input[type="text"]');
    nameInputs.forEach(input => {
        if (input.id === 'firstName' || input.id === 'lastName') {
            input.addEventListener('blur', function() {
                validateNameField(this);
            });
        }
    });
}

function validateEmailField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);

    const email = field.value.trim();

    if (!email) {
        showFieldError(field, errorElement, 'Email address is required');
        return false;
    }

    if (!validateEmail(email)) {
        showFieldError(field, errorElement, 'Please enter a valid email address');
        return false;
    }

    showFieldSuccess(field, errorElement);
    return true;
}

function validatePasswordField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);

    const password = field.value;

    if (!password) {
        showFieldError(field, errorElement, 'Password is required');
        return false;
    }

    if (field.id === 'signupPassword' && !validatePassword(password)) {
        showFieldError(field, errorElement, 'Password must be at least 8 characters with uppercase, lowercase, and numbers');
        return false;
    }

    showFieldSuccess(field, errorElement);
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword');
    const errorElement = document.getElementById('confirmPasswordError');

    if (!confirmPassword.value) {
        showFieldError(confirmPassword, errorElement, 'Please confirm your password');
        return false;
    }

    if (password !== confirmPassword.value) {
        showFieldError(confirmPassword, errorElement, 'Passwords do not match');
        return false;
    }

    showFieldSuccess(confirmPassword, errorElement);
    return true;
}

function validatePhoneField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);

    const phone = field.value.trim();

    if (!phone) {
        showFieldError(field, errorElement, 'Phone number is required');
        return false;
    }

    if (!validatePhone(phone)) {
        showFieldError(field, errorElement, 'Please enter a valid phone number');
        return false;
    }

    showFieldSuccess(field, errorElement);
    return true;
}

function validateNameField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    const name = field.value.trim();

    if (!name) {
        showFieldError(
            field,
            errorElement,
            `${field.id === 'firstName' ? 'First' : 'Last'} name is required`
        );
        return false;
    }

    if (name.length < 2) {
        showFieldError(
            field,
            errorElement,
            `${field.id === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`
        );
        return false;
    }

    showFieldSuccess(field, errorElement);
    return true;
}

function showFieldError(field, errorElement, message) {
    field.classList.add('error');
    field.classList.remove('valid');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function showFieldSuccess(field, errorElement) {
    field.classList.remove('error');
    field.classList.add('valid');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Password Strength Meter
function initializePasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

function updatePasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordStrengthText');

    if (!strengthBar || !strengthText) return;

    let strength = 0;
    let text = 'Weak';
    let className = 'weak';

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    switch (strength) {
        case 0:
        case 1:
            text = 'Weak';
            className = 'weak';
            break;
        case 2:
        case 3:
            text = 'Medium';
            className = 'medium';
            break;
        case 4:
            text = 'Strong';
            className = 'strong';
            break;
    }

    strengthBar.className = `strength-fill ${className}`;
    strengthText.textContent = text;
}

// Form Submission Handlers
async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.btn');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validate form
    if (!validateEmailField(document.getElementById('loginEmail')) ||
        !validatePasswordField(document.getElementById('loginPassword'))) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock authentication - in real app, this would be an API call
        const users = JSON.parse(localStorage.getItem('freshmartUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store user session
            localStorage.setItem('freshmartUser', JSON.stringify({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar || null,
                createdAt: user.createdAt,
                orders: user.orders || 0,
                points: user.points || 100
            }));

            showToast(`Welcome back, ${user.firstName}!`, 'success');

            // Update UI with user data
            loadUserData();
            updateUIForAuthState();

            // Redirect to home page after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            throw new Error('Invalid email or password. Please check your credentials or create an account.');
        }
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        submitBtn.classList.remove('loading');
    }
}

async function handleSignup(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.btn');

    // Validate all fields
    const isValid = [
        validateNameField(document.getElementById('firstName')),
        validateNameField(document.getElementById('lastName')),
        validateEmailField(document.getElementById('signupEmail')),
        validatePhoneField(document.getElementById('phone')),
        validatePasswordField(document.getElementById('signupPassword')),
        validateConfirmPassword()
    ].every(valid => valid);

    if (!isValid) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }

    // Check terms agreement
    const agreeTerms = document.getElementById('agreeTerms');
    if (!agreeTerms.checked) {
        showToast('Please agree to the Terms & Conditions', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const userData = {
            id: Date.now(),
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('signupEmail').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('signupPassword').value,
            createdAt: new Date().toISOString(),
            avatar: null,
            orders: 0,
            points: 100, // Welcome points
            discounts: ['WELCOME10'] // Welcome discount
        };

        // Save user to localStorage (in real app, this would be an API call)
        const users = JSON.parse(localStorage.getItem('freshmartUsers')) || [];

        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
            throw new Error('User with this email already exists');
        }

        users.push(userData);
        localStorage.setItem('freshmartUsers', JSON.stringify(users));

        // Store user session
        localStorage.setItem('freshmartUser', JSON.stringify({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            avatar: userData.avatar,
            createdAt: userData.createdAt,
            orders: userData.orders,
            points: userData.points,
            discounts: userData.discounts
        }));

        showToast(`Welcome to FreshMart, ${userData.firstName}! Your account has been created successfully.`, 'success');

        // Update UI with user data
        loadUserData();
        updateUIForAuthState();

        // Redirect to home page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        submitBtn.classList.remove('loading');
    }
}

// Social Authentication
function initializeSocialAuth() {
    const googleBtn = document.querySelector('.btn-google');
    const facebookBtn = document.querySelector('.btn-facebook');

    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleAuth);
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', handleFacebookAuth);
    }
}

function handleGoogleAuth() {
    showToast('Google authentication would be implemented here', 'warning');
    // In a real application, this would integrate with Google OAuth
}

function handleFacebookAuth() {
    showToast('Facebook authentication would be implemented here', 'warning');
    // In a real application, this would integrate with Facebook OAuth
}

// Account Actions
function initializeAccountActions() {
    const logoutBtn = document.getElementById('accountLogoutBtn');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const orderHistoryBtn = document.getElementById('orderHistoryBtn');
    const forgotPassword = document.getElementById('forgotPassword');
    const showSignup = document.getElementById('showSignup');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', handleEditProfile);
    }

    if (orderHistoryBtn) {
        orderHistoryBtn.addEventListener('click', handleOrderHistory);
    }

    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            openForgotPasswordModal();
        });
    }

    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            // This would toggle between login and signup views
            showToast('Switch to signup view would be implemented here', 'info');
        });
    }
}

function handleLogout() {
    // Clear user session
    localStorage.removeItem('freshmartUser');

    showToast('You have been logged out successfully.', 'success');

    // Update UI
    loadUserData();
    updateUIForAuthState();

    // Redirect to home page after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function handleEditProfile() {
    openEditProfileModal();
}

function handleOrderHistory() {
    showToast('Order history would be displayed here', 'warning');
    // In a real application, this would show order history
}

// Modal Management
function initializeModals() {
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeForgotPasswordModal = document.getElementById('closeForgotPasswordModal');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditProfileModal = document.getElementById('closeEditProfileModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const editProfileForm = document.getElementById('editProfileForm');

    // Forgot Password Modal
    if (closeForgotPasswordModal) {
        closeForgotPasswordModal.addEventListener('click', closeForgotPasswordModalFunc);
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }

    // Edit Profile Modal
    if (closeEditProfileModal) {
        closeEditProfileModal.addEventListener('click', closeEditProfileModalFunc);
    }

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', handleEditProfileSubmit);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === forgotPasswordModal) {
            closeForgotPasswordModalFunc();
        }
        if (event.target === editProfileModal) {
            closeEditProfileModalFunc();
        }
    });
}

function openForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeForgotPasswordModalFunc() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openEditProfileModal() {
    const currentUser = JSON.parse(localStorage.getItem('freshmartUser'));
    if (!currentUser) {
        showToast('Please log in to edit your profile', 'error');
        return;
    }

    // Populate form with current user data
    document.getElementById('editFirstName').value = currentUser.firstName || '';
    document.getElementById('editLastName').value = currentUser.lastName || '';
    document.getElementById('editPhone').value = currentUser.phone || '';

    const modal = document.getElementById('editProfileModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeEditProfileModalFunc() {
    const modal = document.getElementById('editProfileModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

async function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showToast('Password reset link has been sent to your email', 'success');
        closeForgotPasswordModalFunc();
    } catch (error) {
        showToast('Failed to send reset link. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleEditProfileSubmit(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('freshmartUser'));
    if (!currentUser) {
        showToast('Please log in to edit your profile', 'error');
        return;
    }

    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const phone = document.getElementById('editPhone').value;
    const avatarFile = document.getElementById('editAvatar').files[0];

    // Show loading state
    const submitBtn = e.target.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update user data in localStorage
        const users = JSON.parse(localStorage.getItem('freshmartUsers')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex].firstName = firstName;
            users[userIndex].lastName = lastName;
            users[userIndex].phone = phone;
            
            // Handle avatar upload
            if (avatarFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    users[userIndex].avatar = e.target.result;
                    localStorage.setItem('freshmartUsers', JSON.stringify(users));
                    
                    // Update current session
                    currentUser.avatar = e.target.result;
                    currentUser.firstName = firstName;
                    currentUser.lastName = lastName;
                    currentUser.phone = phone;
                    localStorage.setItem('freshmartUser', JSON.stringify(currentUser));
                    
                    loadUserData();
                    showToast('Profile updated successfully!', 'success');
                    closeEditProfileModalFunc();
                };
                reader.readAsDataURL(avatarFile);
            } else {
                localStorage.setItem('freshmartUsers', JSON.stringify(users));
                
                // Update current session
                currentUser.firstName = firstName;
                currentUser.lastName = lastName;
                currentUser.phone = phone;
                localStorage.setItem('freshmartUser', JSON.stringify(currentUser));
                
                loadUserData();
                showToast('Profile updated successfully!', 'success');
                closeEditProfileModalFunc();
            }
        }
    } catch (error) {
        showToast('Failed to update profile. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Load User Data
function loadUserData() {
    const currentUser = JSON.parse(localStorage.getItem('freshmartUser'));
    const users = JSON.parse(localStorage.getItem('freshmartUsers')) || [];

    if (currentUser) {
        // Update account card
        const accountName = document.getElementById('accountName');
        const accountEmail = document.getElementById('accountEmail');
        const accountOrders = document.getElementById('accountOrders');
        const accountPoints = document.getElementById('accountPoints');
        const accountSince = document.getElementById('accountSince');
        const userAvatar = document.getElementById('userAvatar');

        if (accountName) accountName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        if (accountEmail) accountEmail.textContent = currentUser.email;

        // Update avatar
        if (userAvatar) {
            if (currentUser.avatar) {
                userAvatar.innerHTML = `<img src="${currentUser.avatar}" alt="${currentUser.firstName}">`;
            } else {
                userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
            }
        }

        // Find user in database for additional info
        const userData = users.find(u => u.id === currentUser.id);
        if (userData) {
            if (accountOrders) accountOrders.textContent = userData.orders || 0;
            if (accountPoints) accountPoints.textContent = userData.points || 0;
            if (accountSince) {
                const year = new Date(userData.createdAt).getFullYear();
                accountSince.textContent = year;
            }
        }
    } else {
        // User is not logged in
        const accountName = document.getElementById('accountName');
        const accountEmail = document.getElementById('accountEmail');
        const userAvatar = document.getElementById('userAvatar');

        if (accountName) accountName.textContent = 'Guest User';
        if (accountEmail) accountEmail.textContent = 'Please sign in to view your account';
        if (userAvatar) userAvatar.innerHTML = '<i class="fas fa-user"></i>';
    }
}

// Update UI based on authentication state
function updateUIForAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('freshmartUser'));
    const authCards = document.querySelectorAll('.auth-card');
    
    if (currentUser) {
        // User is logged in - show account card, hide login/signup
        authCards.forEach(card => {
            if (card.querySelector('.login-icon') || card.querySelector('.signup-icon')) {
                card.style.display = 'none';
            }
            if (card.querySelector('.account-icon')) {
                card.style.display = 'block';
            }
        });
    } else {
        // User is not logged in - show login/signup, hide account card
        authCards.forEach(card => {
            if (card.querySelector('.login-icon') || card.querySelector('.signup-icon')) {
                card.style.display = 'block';
            }
            if (card.querySelector('.account-icon')) {
                card.style.display = 'none';
            }
        });
    }
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast show';
    toast.classList.add(type);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Add card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.auth-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Global function exports
window.openForgotPasswordModal = openForgotPasswordModal;
window.closeForgotPasswordModalFunc = closeForgotPasswordModalFunc;
window.openEditProfileModal = openEditProfileModal;
window.closeEditProfileModalFunc = closeEditProfileModalFunc;