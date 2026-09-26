// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeProfilePage();
});

function initializeProfilePage() {
    // Initialize tab system
    initializeTabs();
    
    // Load user data
    loadUserData();
    
    // Initialize forms
    initializeForms();
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize address management
    initializeAddressManagement();
    
    // Initialize order management
    initializeOrderManagement();
    
    // Initialize wishlist
    initializeWishlist();
    
    // Initialize security features
    initializeSecurityFeatures();
    
    // Initialize notifications
    initializeNotifications();
    
    // Initialize preferences
    initializePreferences();
}

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.profile-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    // Update tab contents
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    // Update URL hash
    window.location.hash = tabId;
    
    // Load tab-specific data
    loadTabData(tabId);
}

function loadTabData(tabId) {
    switch(tabId) {
        case 'orders':
            loadOrders();
            break;
        case 'wishlist':
            loadWishlist();
            break;
        case 'security':
            loadSecurityData();
            break;
        case 'notifications':
            loadNotificationSettings();
            break;
        case 'preferences':
            loadPreferences();
            break;
    }
}

// User Data Management
function loadUserData() {
    // In a real application, this would fetch from an API
    const userData = {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@university.edu',
        phone: '(555) 123-4567',
        dob: '1998-05-15',
        gender: 'female',
        university: 'state',
        studentId: 'S12345678',
        major: 'Computer Science',
        graduationYear: '2025',
        avatar: '../images/user-avatar.jpg'
    };
    
    // Populate user info
document.getElementById('userName').textContent = `Welcome, ${userData.firstName} ${userData.lastName}!`;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userAvatar').src = userData.avatar;
    
    // Populate personal info form
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('dob').value = userData.dob;
    document.getElementById('university').value = userData.university;
    document.getElementById('studentId').value = userData.studentId;
    document.getElementById('major').value = userData.major;
    document.getElementById('graduationYear').value = userData.graduationYear;
    
    // Set gender radio
    document.querySelector(input[name="gender"][value="${userData.gender}"]).checked = true;
}

// Form Management
function initializeForms() {
    // Personal info form
    const personalForm = document.getElementById('personalInfoForm');
    if (personalForm) {
        personalForm.addEventListener('submit', handlePersonalInfoSubmit);
    }
    
    // Password change form
    const passwordForm = document.getElementById('changePasswordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
        initializePasswordStrength();
    }
    
    // Address form
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', handleAddressSubmit);
    }
}

function handlePersonalInfoSubmit(e) {
    e.preventDefault();
    
    if (validatePersonalInfo()) {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Update user data
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData);
            
            // Update displayed name
           document.getElementById('userName').textContent = `Welcome, ${userData.firstName} ${userData.lastName}!`;

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showToast('Profile updated successfully!', 'success');
        }, 1500);
    }
}

function validatePersonalInfo() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearFieldErrors();
    
    // Validate first name
    if (!firstName) {
        showFieldError('firstName', 'First name is required');
        isValid = false;
    }
    
    // Validate last name
    if (!lastName) {
        showFieldError('lastName', 'Last name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!phone) {
        showFieldError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate student ID
    if (studentId && !isValidStudentId(studentId)) {
        showFieldError('studentId', 'Please enter a valid student ID');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneRegex.test(phone);
}

function isValidStudentId(studentId) {
    const studentIdRegex = /^[Ss]?\d{8,9}$/;
    return studentIdRegex.test(studentId);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

function clearFieldErrors() {
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('.form-control.error').forEach(field => {
        field.classList.remove('error');
    });
}

function resetPersonalForm() {
    if (confirm('Are you sure you want to reset all changes?')) {
        loadUserData();
        showToast('Form reset to saved values', 'info');
    }
}

// Password Management
function initializePasswordStrength() {
    const passwordInput = document.getElementById('newPassword');
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordStrengthText');
    const requirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        lowercase: document.getElementById('req-lowercase'),
        number: document.getElementById('req-number'),
        special: document.getElementById('req-special')
    };
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
       strengthBar.style.width = `${strength.percentage}%`;
        strengthBar.style.background = strength.color;
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
        
        // Update requirements
        Object.keys(requirements).forEach(req => {
            if (strength.requirements[req]) {
                requirements[req].classList.add('met');
                requirements[req].style.color = '#28a745';
            } else {
                requirements[req].classList.remove('met');
                requirements[req].style.color = '#6c757d';
            }
        });
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    const requirements = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    };
    
    // Check length
    if (password.length >= 8) {
        score += 20;
        requirements.length = true;
    }
    
    // Check uppercase
    if (/[A-Z]/.test(password)) {
        score += 20;
        requirements.uppercase = true;
    }
    
    // Check lowercase
    if (/[a-z]/.test(password)) {
        score += 20;
        requirements.lowercase = true;
    }
    
    // Check numbers
    if (/[0-9]/.test(password)) {
        score += 20;
        requirements.number = true;
    }
    
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        score += 20;
        requirements.special = true;
    }
    
    // Determine strength level
    let text, color;
    if (score >= 80) {
        text = 'Strong';
        color = '#28a745';
    } else if (score >= 60) {
        text = 'Good';
        color = '#17a2b8';
    } else if (score >= 40) {
        text = 'Fair';
        color = '#ffc107';
    } else {
        text = 'Weak';
        color = '#dc3545';
    }
    
    return {
        percentage: score,
        text: text,
        color: color,
        requirements: requirements
    };
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    if (validatePasswordChange()) {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showToast('Password updated successfully!', 'success');
        }, 2000);
    }
}

function validatePasswordChange() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    let isValid = true;
    
    // Clear previous errors
    clearFieldErrors();
    
    // Validate current password
    if (!currentPassword) {
        showFieldError('currentPassword', 'Current password is required');
        isValid = false;
    }
    
    // Validate new password
    if (!newPassword) {
        showFieldError('newPassword', 'New password is required');
        isValid = false;
    } else if (newPassword.length < 8) {
        showFieldError('newPassword', 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
        showFieldError('confirmPassword', 'Please confirm your new password');
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    
    return isValid;
}

// Dashboard Management
function loadDashboardData() {
    // Update statistics
    updateDashboardStats();
    
    // Load recent activity
    loadRecentActivity();
}

function updateDashboardStats() {
    // These values would come from an API in a real application
    const stats = {
        totalOrders: 12,
        loyaltyPoints: 1250,
        memberSince: 186,
        savingsTotal: 147.50,
        recentOrders: 3,
        activeOffers: 5,
        wishlistCount: 8,
        pointsBalance: 1250
    };
    
    // Update stat numbers
    Object.keys(stats).forEach(stat => {
        const element = document.getElementById(stat);
        if (element) {
            animateValue(element, 0, stats[stat], 1000);
        }
    });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (stat === 'savingsTotal') {
        element.textContent = `$${value.toFixed(2)}`;
        } else {
            element.textContent = value.toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function loadRecentActivity() {
    const activities = [
        {
            type: 'success',
            icon: 'shopping-bag',
            message: 'Order #ORD-789123 has been delivered successfully',
            time: '2 hours ago',
            action: 'viewOrderDetails',
            actionText: 'View Details'
        },
        {
            type: 'info',
            icon: 'gift',
            message: 'You earned 50 loyalty points for your recent order',
            time: '1 day ago'
        },
        {
            type: 'warning',
            icon: 'exclamation-triangle',
            message: 'Your wishlist item Organic Apples is back in stock',
            time: '2 days ago',
            action: 'addToCartFromWishlist',
            actionText: 'Add to Cart'
        },
        {
            type: 'primary',
            icon: 'bell',
            message: 'New student discount available: 20% off all fruits',
            time: '3 days ago',
            action: 'viewOffers',
            actionText: 'View Offer'
        }
    ];
    
    const activityList = document.getElementById('recentActivity');
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
            ${activity.action ? `
                <button class="activity-action" onclick="${activity.action}()">
                    ${activity.actionText}
                </button>
            ` : ''}
        `;
        activityList.appendChild(activityItem);
    });
}

// Address Management
function initializeAddressManagement() {
    // Check if addresses exist and show/hide empty state
    const addressesGrid = document.getElementById('addressesGrid');
    const emptyAddresses = document.getElementById('emptyAddresses');
    
    if (addressesGrid.children.length === 0) {
        addressesGrid.style.display = 'none';
        emptyAddresses.style.display = 'block';
    } else {
        addressesGrid.style.display = 'grid';
        emptyAddresses.style.display = 'none';
    }
}

function openAddAddressModal() {
    document.getElementById('addAddressModal').style.display = 'block';
    document.getElementById('addressForm').reset();
}

function closeAddAddressModal() {
    document.getElementById('addAddressModal').style.display = 'none';
}

function handleAddressSubmit(e) {
    e.preventDefault();
    
    if (validateAddressForm()) {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Add new address to the grid
            addAddressToGrid(getFormData(e.target));
            
            // Close modal and reset form
            closeAddAddressModal();
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showToast('Address added successfully!', 'success');
        }, 1500);
    }
}

function validateAddressForm() {
    const requiredFields = [
        'addressLabel', 'addressFirstName', 'addressLastName', 
        'addressPhone', 'addressLine1', 'addressCity', 
        'addressState', 'addressZip', 'addressCountry'
    ];
    
    let isValid = true;
    
    // Clear previous errors
    clearFieldErrors();
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showFieldError(fieldId, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate phone
    const phone = document.getElementById('addressPhone').value;
    if (phone && !isValidPhone(phone)) {
        showFieldError('addressPhone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate ZIP code
    const zip = document.getElementById('addressZip').value;
    if (zip && !isValidZipCode(zip)) {
        showFieldError('addressZip', 'Please enter a valid ZIP code');
        isValid = false;
    }
    
    return isValid;
}

function isValidZipCode(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
}

function getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

function addAddressToGrid(addressData) {
    const addressesGrid = document.getElementById('addressesGrid');
    const emptyAddresses = document.getElementById('emptyAddresses');
    
    // Hide empty state
    emptyAddresses.style.display = 'none';
    addressesGrid.style.display = 'grid';
    
    // Create new address card
    const addressCard = document.createElement('div');
    addressCard.className = 'address-card';
    if (document.getElementById('setDefaultAddress').checked) {
        addressCard.classList.add('default');
    }
    
    addressCard.innerHTML = `
        <div class="address-header">
            <span class="address-label">${addressData.addressLabel}</span>
            ${document.getElementById('setDefaultAddress').checked ? 
                '<span class="address-badge">Default</span>' : ''}
        </div>
        <div class="address-details">
            <p><strong>${addressData.addressFirstName} ${addressData.addressLastName}</strong></p>
            <p>${addressData.addressLine1}</p>
            ${addressData.addressLine2 ? <p>${addressData.addressLine2}</p> : ''}
            <p>${addressData.addressCity}, ${addressData.addressState} ${addressData.addressZip}</p>
            <p class="address-phone"><i class="fas fa-phone"></i> ${addressData.addressPhone}</p>
            ${addressData.deliveryInstructions ? 
                <p><em>${addressData.deliveryInstructions}</em></p> : ''}
        </div>
        <div class="address-actions">
            <button class="btn-action" onclick="editAddress(this)" title="Edit Address">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action" onclick="setDefaultAddress(this)" title="Set as Default">
                <i class="fas fa-star"></i>
            </button>
            <button class="btn-action delete" onclick="deleteAddress(this)" title="Delete Address">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    addressesGrid.appendChild(addressCard);
}

function editAddress(button) {
    const addressCard = button.closest('.address-card');
    const addressData = {
        label: addressCard.querySelector('.address-label').textContent,
        firstName: addressCard.querySelector('.address-details strong').textContent.split(' ')[0],
        lastName: addressCard.querySelector('.address-details strong').textContent.split(' ')[1],
        // Extract other address details...
    };
    
    // Populate edit modal with address data
    openEditAddressModal(addressData);
}

function setDefaultAddress(button) {
    const addressCard = button.closest('.address-card');
    
    // Remove default from all addresses
    document.querySelectorAll('.address-card').forEach(card => {
        card.classList.remove('default');
        card.querySelector('.address-badge')?.remove();
    });
    
    // Set as default
    addressCard.classList.add('default');
    
    // Add default badge
    const addressHeader = addressCard.querySelector('.address-header');
    const badge = document.createElement('span');
    badge.className = 'address-badge';
    badge.textContent = 'Default';
    addressHeader.appendChild(badge);
    
    // Disable set default button
    button.disabled = true;
    
    showToast('Default address updated successfully!', 'success');
}

function deleteAddress(button) {
    const addressCard = button.closest('.address-card');
    const addressLabel = addressCard.querySelector('.address-label').textContent;
    
   if (confirm(`Are you sure you want to delete the "${addressLabel}" address?`)) {
    addressCard.remove();
}
        
        // Show empty state if no addresses left
        const addressesGrid = document.getElementById('addressesGrid');
        if (addressesGrid.children.length === 0) {
            document.getElementById('emptyAddresses').style.display = 'block';
            addressesGrid.style.display = 'none';
        }
        
        showToast('Address deleted successfully!', 'success');
    }

// Order Management
function initializeOrderManagement() {
    // Initialize order filtering and search
    const orderFilter = document.getElementById('orderFilter');
    const timeFilter = document.getElementById('timeFilter');
    const orderSearch = document.getElementById('orderSearch');
    
    if (orderFilter) {
        orderFilter.addEventListener('change', filterOrders);
    }
    if (timeFilter) {
        timeFilter.addEventListener('change', filterOrders);
    }
    if (orderSearch) {
        orderSearch.addEventListener('input', searchOrders);
    }
}

function loadOrders() {
    // This would fetch orders from an API in a real application
    const orders = [
        {
            id: 'ORD-789123',
            date: 'March 15, 2024',
            status: 'delivered',
            items: [
                { name: 'Organic Apples', quantity: '2kg', image: '../images/products/apple.jpg' },
                { name: 'Fresh Milk', quantity: '1L', image: '../images/products/milk.jpg' },
                { name: 'Whole Wheat Bread', quantity: '1 Loaf', image: '../images/products/bread.jpg' }
            ],
            total: 15.14,
            itemCount: 3
        },
        {
            id: 'ORD-456789',
            date: 'March 10, 2024',
            status: 'delivered',
            items: [
                { name: 'Fresh Bananas', quantity: '1kg', image: '../images/products/banana.jpg' },
                { name: 'Greek Yogurt', quantity: '500g', image: '../images/products/yogurt.jpg' }
            ],
            total: 8.47,
            itemCount: 2
        },
        {
            id: 'ORD-123456',
            date: 'March 5, 2024',
            status: 'processing',
            items: [
                { name: 'Chicken Breast', quantity: '500g', image: '../images/products/chicken.jpg' },
                { name: 'Basmati Rice', quantity: '2kg', image: '../images/products/rice.jpg' },
                { name: 'Fresh Broccoli', quantity: '1 head', image: '../images/products/broccoli.jpg' }
            ],
            total: 24.99,
            itemCount: 3
        }
    ];
    
    displayOrders(orders);
}

function displayOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    const emptyOrders = document.getElementById('emptyOrders');
    
    if (orders.length === 0) {
        ordersList.style.display = 'none';
        emptyOrders.style.display = 'block';
        return;
    }
    
    ordersList.style.display = 'block';
    emptyOrders.style.display = 'none';
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-header">
                <div class="order-info">
                    <h4>${order.id}</h4>
                    <span class="order-date">Placed on ${order.date}</span>
                </div>
                <div class="order-status ${order.status}">
                    <i class="fas fa-${getStatusIcon(order.status)}"></i>
                    ${getStatusText(order.status)}
                </div>
            </div>
            <div class="order-details">
                <div class="order-items-preview">
                    ${order.items.slice(0, 3).map(item => `
                        <div class="item-preview">
                            <img src="${item.image}" alt="${item.name}">
                            <span>${item.name} (${item.quantity})</span>
                        </div>
                    `).join('')}
                    ${order.items.length > 3 ? `
                        <div class="more-items">+${order.items.length - 3} more</div>
                    ` : ''}
                </div>
                <div class="order-total">
                    <strong>$${order.total.toFixed(2)}</strong>
                    <span>${order.itemCount} items</span>
                </div>
            </div>
            <div class="order-actions">
                <button class="btn btn-outline" onclick="viewOrderDetails('${order.id}')">
                    <i class="fas fa-eye"></i>
                    View Details
                </button>
                <button class="btn btn-primary" onclick="reorder('${order.id}')">
                    <i class="fas fa-redo"></i>
                    Reorder
                </button>
                ${order.status === 'delivered' ? `
                    <button class="btn btn-outline" onclick="downloadInvoice('${order.id}')">
                        <i class="fas fa-download"></i>
                        Invoice
                    </button>
                ` : ''}
            </div>
        `;
        ordersList.appendChild(orderItem);
    });
}

function getStatusIcon(status) {
    const icons = {
        'delivered': 'check-circle',
        'processing': 'truck',
        'pending': 'clock',
        'cancelled': 'times-circle'
    };
    return icons[status] || 'question-circle';
}

function getStatusText(status) {
    const texts = {
        'delivered': 'Delivered',
        'processing': 'Out for Delivery',
        'pending': 'Pending',
        'cancelled': 'Cancelled'
    };
    return texts[status] || status;
}

function filterOrders() {
    const statusFilter = document.getElementById('orderFilter').value;
    const timeFilter = document.getElementById('timeFilter').value;
    
    // This would filter orders based on criteria
    console.log('Filtering orders by:', { statusFilter, timeFilter });
    
    // For demo purposes, reload all orders
    loadOrders();
}

function searchOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    
    if (searchTerm) {
        // This would search orders in a real application
        console.log('Searching orders for:', searchTerm);
    } else {
        loadOrders();
    }
}

function viewOrderDetails(orderId) {
    // This would fetch order details from an API
    console.log('Viewing order details for:', orderId);
showToast(`Loading order ${orderId} details...`, 'info');

}

function reorder(orderId) {
    if (confirm('Add all items from this order to your cart?')) {
        // This would add all items to cart
        showToast('Items added to cart successfully!', 'success');
        
        // Update cart count
        updateCartCount(3); // Example count
    }
}

function downloadInvoice(orderId) {
    // This would generate and download invoice
   showToast(`Downloading invoice for ${orderId}...`, 'info');

    
    // Simulate download
    setTimeout(() => {
        showToast('Invoice downloaded successfully!', 'success');
    }, 2000);
}

function loadMoreOrders() {
    // This would load more orders in a real application
    showToast('Loading more orders...', 'info');
    
    setTimeout(() => {
        showToast('No more orders to load', 'info');
    }, 1500);
}

// Wishlist Management
function initializeWishlist() {
    // Check if wishlist is empty
    updateWishlistEmptyState();
}

function loadWishlist() {
    // This would fetch wishlist from an API
    const wishlistItems = [
        {
            id: 1,
            name: 'Organic Apples',
            category: 'Fruits',
            price: 4.99,
            originalPrice: 6.24,
            image: '../images/products/apple.jpg',
            stock: 'in-stock',
            badge: 'sale'
        },
        {
            id: 2,
            name: 'Fresh Avocados',
            category: 'Fruits',
            price: 3.49,
            image: '../images/products/avocado.jpg',
            stock: 'low-stock'
        },
        {
            id: 3,
            name: 'Premium Coffee Beans',
            category: 'Beverages',
            price: 12.99,
            image: '../images/products/coffee.jpg',
            stock: 'in-stock',
            badge: 'new'
        }
    ];
    
    displayWishlist(wishlistItems);
}

function displayWishlist(items) {
    const wishlistGrid = document.getElementById('wishlistGrid');
    const emptyWishlist = document.getElementById('emptyWishlist');
    
    if (items.length === 0) {
        wishlistGrid.style.display = 'none';
        emptyWishlist.style.display = 'block';
        return;
    }
    
    wishlistGrid.style.display = 'grid';
    emptyWishlist.style.display = 'none';
    wishlistGrid.innerHTML = '';
    
    items.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.name}">
                <button class="wishlist-remove" onclick="removeFromWishlist(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
                ${item.badge ? <div class="wishlist-badge ${item.badge}">${item.badge === 'sale' ? '20% OFF' : 'NEW'}</div> : ''}
            </div>
            <div class="wishlist-item-info">
                <h4>${item.name}</h4>
                <p class="item-category">${item.category}</p>
                <div class="item-price">
                    <span class="current-price">$${item.price}${item.category === 'Fruits' ? '/kg' : ''}</span>
                    ${item.originalPrice ? <span class="original-price">$${item.originalPrice}/kg</span> : ''}
                </div>
                <div class="item-stock ${item.stock}">
                    <i class="fas fa-${getStockIcon(item.stock)}"></i>
                    ${getStockText(item.stock)}
                </div>
            </div>
            <div class="wishlist-item-actions">
                <button class="btn btn-primary" onclick="addToCartFromWishlist(${item.id})">
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
                <button class="btn btn-outline" onclick="moveToCart(${item.id})">
                    Move to Cart
                </button>
            </div>
        `;
        wishlistGrid.appendChild(wishlistItem);
    });
    
    updateWishlistSummary(items);
}

function getStockIcon(stock) {
    const icons = {
        'in-stock': 'check-circle',
        'low-stock': 'exclamation-triangle',
        'out-of-stock': 'times-circle'
    };
    return icons[stock] || 'question-circle';
}

function getStockText(stock) {
    const texts = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'out-of-stock': 'Out of Stock'
    };
    return texts[stock] || stock;
}

function updateWishlistSummary(items) {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + item.price, 0);
    const potentialSavings = items.reduce((sum, item) => {
        return sum + (item.originalPrice ? (item.originalPrice - item.price) : 0);
    }, 0);
    
    document.querySelector('.wishlist-summary .summary-item:nth-child(1) strong').textContent = totalItems;
   document.querySelector('.wishlist-summary .summary-item:nth-child(2) strong').textContent = `$${totalValue.toFixed(2)}`;
document.querySelector('.wishlist-summary .summary-item:nth-child(3) strong').textContent = `$${potentialSavings.toFixed(2)}`;


function updateWishlistEmptyState() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    const emptyWishlist = document.getElementById('emptyWishlist');
    
    if (wishlistGrid.children.length === 0) {
        wishlistGrid.style.display = 'none';
        emptyWishlist.style.display = 'block';
    } else {
        wishlistGrid.style.display = 'grid';
        emptyWishlist.style.display = 'none';
    }
}

function removeFromWishlist(itemId) {
    if (confirm('Remove this item from your wishlist?')) {
        const itemElement = document.querySelector([onclick="removeFromWishlist(${itemId})"]).closest('.wishlist-item');
        itemElement.remove();
        
        updateWishlistEmptyState();
        showToast('Item removed from wishlist', 'success');
    }
}

function addToCartFromWishlist(itemId) {
    // This would add item to cart
    showToast('Item added to cart!', 'success');
    updateCartCount(1); // Increment cart count
}

function moveToCart(itemId) {
    if (confirm('Move this item to cart and remove from wishlist?')) {
        // This would move item to cart
        removeFromWishlist(itemId);
        showToast('Item moved to cart!', 'success');
        updateCartCount(1); // Increment cart count
    }
}

function shareWishlist() {
    // This would share wishlist
    showToast('Wishlist sharing feature coming soon!', 'info');
}

function clearWishlist() {
    if (confirm('Clear your entire wishlist? This action cannot be undone.')) {
        const wishlistGrid = document.getElementById('wishlistGrid');
        wishlistGrid.innerHTML = '';
        updateWishlistEmptyState();
        showToast('Wishlist cleared', 'success');
    }
}

// Security Features
function initializeSecurityFeatures() {
    // Initialize two-factor authentication toggle
    const twoFactorToggle = document.getElementById('twoFactorAuth');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', function() {
            if (this.checked) {
                showToast('Two-factor authentication enabled', 'success');
            } else {
                if (confirm('Are you sure you want to disable two-factor authentication? This reduces your account security.')) {
                    showToast('Two-factor authentication disabled', 'warning');
                } else {
                    this.checked = true;
                }
            }
        });
    }
}

function loadSecurityData() {
    // Load login sessions
    loadLoginSessions();
}

function loadLoginSessions() {
    // This would fetch login sessions from an API
    const sessions = [
        {
            id: 'session1',
            device: 'desktop',
            browser: 'Chrome on Windows',
            location: 'New York, US',
            time: 'Active now',
            current: true
        },
        {
            id: 'session2',
            device: 'mobile',
            browser: 'Safari on iPhone',
            location: 'New York, US',
            time: '2 hours ago',
            current: false
        },
        {
            id: 'session3',
            device: 'laptop',
            browser: 'Firefox on macOS',
            location: 'New York, US',
            time: '1 day ago',
            current: false
        }
    ];
    
    displayLoginSessions(sessions);
}

function displayLoginSessions(sessions) {
    const sessionsContainer = document.getElementById('loginSessions');
    sessionsContainer.innerHTML = '';
    
    sessions.forEach(session => {
        const sessionElement = document.createElement('div');
       sessionElement.className = `login-session ${session.current ? 'current' : ''}`;

        sessionElement.innerHTML = `
            <div class="session-info">
                <i class="fas fa-${session.device}"></i>
                <div>
                    <strong>${session.browser}</strong>
                    <span>${session.location}</span>
                    <small>${session.time}</small>
                </div>
            </div>
            ${session.current ? `
                <span class="session-status active">Active</span>
            ` : `
                <button class="btn-logout" onclick="logoutSession('${session.id}')">Logout</button>
            `}
        `;
        sessionsContainer.appendChild(sessionElement);
    });
}

function logoutSession(sessionId) {
    if (confirm('Log out this session?')) {
        // This would log out the specific session
        showToast('Session logged out successfully', 'success');
        
        // Remove session from display
        const sessionElement = document.querySelector([onclick="logoutSession('${sessionId}')"]).closest('.login-session');
        sessionElement.remove();
    }
}

function logoutAllSessions() {
    if (confirm('Log out all sessions except this one?')) {
        // This would log out all other sessions
        showToast('All other sessions logged out', 'success');
        
        // Update sessions display
        const sessionsContainer = document.getElementById('loginSessions');
        sessionsContainer.innerHTML = `
            <div class="login-session current">
                <div class="session-info">
                    <i class="fas fa-desktop"></i>
                    <div>
                        <strong>Current Session</strong>
                        <span>Chrome on Windows • New York, US</span>
                        <small>Active now</small>
                    </div>
                </div>
                <span class="session-status active">Active</span>
            </div>
        `;
    }
}

function changeRecoveryEmail() {
    const newEmail = prompt('Enter new recovery email:');
    if (newEmail && isValidEmail(newEmail)) {
        showToast('Recovery email updated successfully', 'success');
    } else if (newEmail) {
        showToast('Please enter a valid email address', 'error');
    }
}

function changeRecoveryPhone() {
    const newPhone = prompt('Enter new recovery phone number:');
    if (newPhone && isValidPhone(newPhone)) {
        showToast('Recovery phone updated successfully', 'success');
    } else if (newPhone) {
        showToast('Please enter a valid phone number', 'error');
    }
}

// Notifications Management
function initializeNotifications() {
    // Initialize notification toggles
    const notificationToggles = document.querySelectorAll('.notification-section input[type="checkbox"]');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            
           showToast(`Notification setting "${settingName}" ${isEnabled ? 'enabled' : 'disabled'}`, 'info');

        });
    });
}

function loadNotificationSettings() {
    // This would load saved notification settings from an API
    // For now, settings are loaded from the HTML checked states
}

function saveNotificationSettings() {
    // Show loading state
    const saveBtn = document.querySelector('.notification-actions .btn-primary');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        
        showToast('Notification preferences saved successfully!', 'success');
    }, 1500);
}

function resetNotificationSettings() {
    if (confirm('Reset all notification settings to default?')) {
        document.querySelectorAll('.notification-section input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        document.querySelectorAll('.notification-section input[type="radio"]').forEach(radio => {
            radio.checked = radio.value === 'realtime';
        });
        
        showToast('Notification settings reset to default', 'info');
    }
}

function testNotification() {
    if (Notification.permission === 'granted') {
        new Notification('FreshMart Test', {
            body: 'This is a test notification from FreshMart!',
            icon: '../images/logo.png'
        });
        showToast('Test notification sent!', 'success');
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                testNotification();
            }
        });
    } else {
        showToast('Please enable notifications in your browser settings', 'warning');
    }
}

// Preferences Management
function initializePreferences() {
    // Initialize preference toggles and selects
    const preferenceElements = document.querySelectorAll('#preferences input, #preferences select');
    preferenceElements.forEach(element => {
        element.addEventListener('change', function() {
            showToast('Preference updated', 'info');
        });
    });
}

function loadPreferences() {
    // This would load saved preferences from an API
    // For now, preferences are loaded from the HTML default states
}

function savePreferences() {
    // Show loading state
    const saveBtn = document.querySelector('.preferences-actions .btn-primary');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        
        showToast('Preferences saved successfully!', 'success');
    }, 1500);
}

function resetPreferences() {
    if (confirm('Reset all preferences to default?')) {
        // Reset form elements to their default values
        document.querySelectorAll('#preferences input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = checkbox.defaultChecked;
        });
        
        document.querySelectorAll('#preferences input[type="radio"]').forEach(radio => {
            radio.checked = radio.defaultChecked;
        });
        
        document.querySelectorAll('#preferences select').forEach(select => {
            select.value = select.querySelector('option[selected]')?.value || select.options[0].value;
        });
        
        showToast('Preferences reset to default', 'info');
    }
}

function exportPreferences() {
    // This would export preferences as a file
    showToast('Preferences export feature coming soon!', 'info');
}

// Avatar Management
function openAvatarEditor() {
    document.getElementById('avatarEditorModal').style.display = 'block';
}

function closeAvatarEditor() {
    document.getElementById('avatarEditorModal').style.display = 'none';
}

function selectGalleryAvatar(src) {
    document.getElementById('avatarPreview').src = src;
}

function useDefaultAvatar() {
    document.getElementById('avatarPreview').src = '../images/user-avatar.jpg';
}

function saveAvatar() {
    const newAvatar = document.getElementById('avatarPreview').src;
    document.getElementById('userAvatar').src = newAvatar;
    closeAvatarEditor();
    showToast('Profile picture updated successfully!', 'success');
}

// Points Redemption
function showRedeemModal() {
    document.getElementById('redeemPointsModal').style.display = 'block';
}

function closeRedeemModal() {
    document.getElementById('redeemPointsModal').style.display = 'none';
}

function redeemPoints(points) {
  if (confirm(`Redeem ${points} points for $${(points / 100).toFixed(2)} discount?`)) {
    // This would process points redemption
    showToast(`Successfully redeemed ${points} points!`, 'success');
    closeRedeemModal();
}
}

function redeemCustomPoints() {
    const pointsInput = document.getElementById('customPoints');
    const points = parseInt(pointsInput.value);
    
    if (!points || points < 100) {
        showToast('Please enter at least 100 points', 'error');
        return;
    }
    
    if (points > 1250) {
        showToast('You don\'t have enough points', 'error');
        return;
    }
    
    redeemPoints(points);
}

function showLoyaltyInfo() {
    alert('Loyalty Program Information:\n\n• Earn 1 point for every $1 spent\n• 100 points = $1 discount\n• Gold members get double points\n• Redeem points for discounts on future orders');
}

// Utility Functions
function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
   toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function logout() {
    if (confirm('Are you sure you want to log out?')) {
        // This would handle logout
        showToast('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1000);
    }
}

// Export functions for global access
window.switchTab = switchTab;
window.openAddAddressModal = openAddAddressModal;
window.closeAddAddressModal = closeAddAddressModal;
window.editAddress = editAddress;
window.setDefaultAddress = setDefaultAddress;
window.deleteAddress = deleteAddress;
window.viewOrderDetails = viewOrderDetails;
window.reorder = reorder;
window.downloadInvoice = downloadInvoice;
window.loadMoreOrders = loadMoreOrders;
window.removeFromWishlist = removeFromWishlist;
window.addToCartFromWishlist = addToCartFromWishlist;
window.moveToCart = moveToCart;
window.shareWishlist = shareWishlist;
window.clearWishlist = clearWishlist;
window.logoutSession = logoutSession;
window.logoutAllSessions = logoutAllSessions;
window.changeRecoveryEmail = changeRecoveryEmail;
window.changeRecoveryPhone = changeRecoveryPhone;
window.saveNotificationSettings = saveNotificationSettings;
window.resetNotificationSettings = resetNotificationSettings;
window.testNotification = testNotification;
window.savePreferences = savePreferences;
window.resetPreferences = resetPreferences;
window.exportPreferences = exportPreferences;
window.openAvatarEditor = openAvatarEditor;
window.closeAvatarEditor = closeAvatarEditor;
window.selectGalleryAvatar = selectGalleryAvatar;
window.useDefaultAvatar = useDefaultAvatar;
window.saveAvatar = saveAvatar;
window.showRedeemModal = showRedeemModal;
window.closeRedeemModal = closeRedeemModal;
window.redeemPoints = redeemPoints;
window.redeemCustomPoints = redeemCustomPoints;
window.showLoyaltyInfo = showLoyaltyInfo;
window.logout = logout;
}