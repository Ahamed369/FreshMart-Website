// Payment Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentPage();
});

function initializePaymentPage() {
    // Initialize payment method selection
    initializePaymentMethods();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize card input formatting
    initializeCardInputs();
    
    // Load saved payment methods
    loadSavedPaymentMethods();
    
    // Update order summary
    updateOrderSummary();
}

// Payment Method Selection
function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        const header = option.querySelector('.option-header');
        header.addEventListener('click', () => {
            // Close all other options
            paymentOptions.forEach(otherOption => {
                if (otherOption !== option) {
                    otherOption.classList.remove('active');
                }
            });
            
            // Toggle current option
            option.classList.toggle('active');
            
            // Update payment method in summary
            if (option.classList.contains('active')) {
                const method = option.dataset.method;
                updateSelectedPaymentMethod(method, option);
            }
        });
    });
}

function updateSelectedPaymentMethod(method, option) {
    const methodName = getPaymentMethodName(method, option);
    document.getElementById('confirmedMethod').textContent = methodName;
    
    // Show/hide relevant forms
    togglePaymentForms(method);
}

function getPaymentMethodName(method, option) {
    switch(method) {
        case 'card':
            return 'Credit/Debit Card';
        case 'saved-cards':
            const activeCard = option.querySelector('.saved-card.active');
            if (activeCard) {
                return activeCard.querySelector('.card-type').textContent;
            }
            return 'Saved Card';
        case 'paypal':
            return 'PayPal';
        case 'apple-pay':
            return 'Apple Pay';
        case 'google-pay':
            return 'Google Pay';
        case 'student-card':
            return 'Student Card';
        case 'meal-plan':
            return 'Meal Plan';
        case 'cash':
            return 'Cash on Delivery';
        case 'bank-transfer':
            return 'Bank Transfer';
        default:
            return 'Payment Method';
    }
}

function togglePaymentForms(activeMethod) {
    const forms = document.querySelectorAll('.option-content form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    
    if (activeMethod === 'card') {
        document.getElementById('cardForm').style.display = 'block';
    } else if (activeMethod === 'student-card') {
        document.getElementById('studentCardForm').style.display = 'block';
    }
}

// Form Validation
function initializeFormValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const studentId = document.getElementById('studentId');
    const studentPin = document.getElementById('studentPin');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
        cardNumber.addEventListener('blur', validateCardNumber);
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
        expiryDate.addEventListener('blur', validateExpiryDate);
    }
    
    if (cvv) {
        cvv.addEventListener('input', formatCVV);
        cvv.addEventListener('blur', validateCVV);
    }
    
    if (studentId) {
        studentId.addEventListener('blur', validateStudentId);
    }
    
    if (studentPin) {
        studentPin.addEventListener('blur', validateStudentPin);
    }
}

// Card Input Formatting and Validation
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
}

function validateCardNumber() {
    const cardNumber = document.getElementById('cardNumber');
    const value = cardNumber.value.replace(/\s+/g, '');
    
    if (value.length < 16) {
        showFieldError(cardNumber, 'Please enter a valid 16-digit card number');
        return false;
    }
    
    if (!luhnCheck(value)) {
        showFieldError(cardNumber, 'Please enter a valid card number');
        return false;
    }
    
    clearFieldError(cardNumber);
    return true;
}

function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    e.target.value = value;
}

function validateExpiryDate() {
    const expiryDate = document.getElementById('expiryDate');
    const value = expiryDate.value;
    const [month, year] = value.split('/');
    
    if (!month || !year || month.length !== 2 || year.length !== 2) {
        showFieldError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
        return false;
    }
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) {
        showFieldError(expiryDate, 'Please enter a valid month (01-12)');
        return false;
    }
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        showFieldError(expiryDate, 'This card has expired');
        return false;
    }
    
    clearFieldError(expiryDate);
    return true;
}

function formatCVV(e) {
    let value = e.target.value.replace(/[^0-9]/gi, '');
    e.target.value = value.substring(0, 3);
}

function validateCVV() {
    const cvv = document.getElementById('cvv');
    const value = cvv.value;
    
    if (value.length !== 3) {
        showFieldError(cvv, 'Please enter a valid 3-digit CVV');
        return false;
    }
    
    clearFieldError(cvv);
    return true;
}

function validateStudentId() {
    const studentId = document.getElementById('studentId');
    const value = studentId.value.trim();
    
    if (!value.match(/^[Ss]?\d{8,9}$/)) {
        showFieldError(studentId, 'Please enter a valid student ID number');
        return false;
    }
    
    clearFieldError(studentId);
    return true;
}

function validateStudentPin() {
    const studentPin = document.getElementById('studentPin');
    const value = studentPin.value;
    
    if (value.length !== 4 || !value.match(/^\d{4}$/)) {
        showFieldError(studentPin, 'Please enter a valid 4-digit PIN');
        return false;
    }
    
    clearFieldError(studentPin);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Saved Cards Management
function loadSavedPaymentMethods() {
    // In a real application, this would fetch from an API
    const savedCards = [
        {
            id: 1,
            type: 'visa',
            lastFour: '4242',
            expiry: '12/25',
            cardholder: 'Sarah Johnson'
        },
        {
            id: 2,
            type: 'mastercard',
            lastFour: '8888',
            expiry: '08/24',
            cardholder: 'Sarah Johnson'
        }
    ];
    
    // This would populate the saved cards section
    // For now, it's hardcoded in the HTML
}

function removeSavedCard(cardId) {
    if (confirm('Are you sure you want to remove this saved card?')) {
        // In a real application, this would call an API
        const cardElement = document.querySelector([onclick="removeSavedCard(${cardId})"]).closest('.saved-card');
        cardElement.remove();
        
        showToast('Card removed successfully', 'success');
        
        // If no saved cards left, show "use new card" option
        const savedCards = document.querySelectorAll('.saved-card');
        if (savedCards.length === 0) {
            useNewCard();
        }
    }
}

function useNewCard() {
    const savedCardsOption = document.querySelector('[data-method="saved-cards"]');
    const cardOption = document.querySelector('[data-method="card"]');
    
    savedCardsOption.classList.remove('active');
    cardOption.classList.add('active');
    
    updateSelectedPaymentMethod('card', cardOption);
}

// Payment Processing
function processPayment() {
    const activePaymentMethod = getActivePaymentMethod();
    
    if (!activePaymentMethod) {
        showToast('Please select a payment method', 'error');
        return;
    }
    
    if (!validatePaymentForm(activePaymentMethod)) {
        return;
    }
    
    showPaymentProcessing();
    
    // Simulate payment processing
    setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate for demo
        
        if (success) {
            completePayment(activePaymentMethod);
        } else {
            showPaymentError('Payment Declined', 'Your payment could not be processed. Please try again or use a different payment method.');
        }
    }, 3000);
}

function getActivePaymentMethod() {
    const activeOption = document.querySelector('.payment-option.active');
    return activeOption ? activeOption.dataset.method : null;
}

function validatePaymentForm(method) {
    switch(method) {
        case 'card':
            return validateCardForm();
        case 'saved-cards':
            return validateSavedCard();
        case 'student-card':
            return validateStudentCardForm();
        case 'paypal':
        case 'apple-pay':
        case 'google-pay':
        case 'meal-plan':
        case 'cash':
        case 'bank-transfer':
            return true; // These methods don't require additional validation
        default:
            return false;
    }
}

function validateCardForm() {
    const validations = [
        validateCardNumber(),
        validateExpiryDate(),
        validateCVV()
    ];
    
    // Check cardholder name
    const cardholderName = document.getElementById('cardholderName');
    if (!cardholderName.value.trim()) {
        showFieldError(cardholderName, 'Please enter cardholder name');
        return false;
    }
    clearFieldError(cardholderName);
    
    return validations.every(valid => valid);
}

function validateSavedCard() {
    const activeSavedCard = document.querySelector('.saved-card.active');
    if (!activeSavedCard) {
        showToast('Please select a saved card', 'error');
        return false;
    }
    return true;
}

function validateStudentCardForm() {
    return validateStudentId() && validateStudentPin();
}

function showPaymentProcessing() {
    const modal = document.getElementById('paymentProcessingModal');
    modal.style.display = 'block';
    
    // Animate processing steps
    const steps = document.querySelectorAll('.processing-step');
    let currentStep = 0;
    
    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(stepInterval);
        }
    }, 800);
}

function completePayment(method) {
    // Hide processing modal
    document.getElementById('paymentProcessingModal').style.display = 'none';
    
    // Show success modal
    const confirmationModal = document.getElementById('paymentConfirmationModal');
    confirmationModal.style.display = 'block';
    
    // Update order details
    updateOrderConfirmationDetails();
    
    // Save payment method if requested
    if (method === 'card' && document.getElementById('saveCard').checked) {
        saveCardForFuture();
    }
    
    // In a real application, this would submit the order to the backend
    console.log('Payment completed successfully with method:', method);
}

function showPaymentError(title, message) {
    // Hide processing modal
    document.getElementById('paymentProcessingModal').style.display = 'none';
    
    // Show error modal
    const errorModal = document.getElementById('paymentErrorModal');
    document.getElementById('errorTitle').textContent = title;
    document.getElementById('errorMessage').textContent = message;
    errorModal.style.display = 'block';
}

function closePaymentError() {
    document.getElementById('paymentErrorModal').style.display = 'none';
}

function tryDifferentMethod() {
    closePaymentError();
    // Optionally reset to card payment method
    const cardOption = document.querySelector('[data-method="card"]');
    if (cardOption) {
        cardOption.click();
    }
}

// Digital Wallet Integrations (Mock implementations)
function processPayPal() {
    showToast('Redirecting to PayPal...', 'success');
    // In real implementation, this would redirect to PayPal
    setTimeout(() => completePayment('paypal'), 2000);
}

function processApplePay() {
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
        showToast('Processing with Apple Pay...', 'success');
        setTimeout(() => completePayment('apple-pay'), 2000);
    } else {
        showToast('Apple Pay is not available on this device', 'error');
    }
}

function processGooglePay() {
    showToast('Processing with Google Pay...', 'success');
    // In real implementation, this would initialize Google Pay
    setTimeout(() => completePayment('google-pay'), 2000);
}

// Order Management
function updateOrderSummary() {
    // In a real application, this would calculate based on cart items
    // For now, it's hardcoded in the HTML
}

function updateOrderConfirmationDetails() {
    // Update confirmation details with actual order data
    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    document.querySelector('.confirmation-details .value:first-child').textContent = orderNumber;
}

function saveCardForFuture() {
    // In a real application, this would send card details to backend
    // (properly encrypted and tokenized)
    console.log('Saving card for future use...');
}

// Navigation Functions
function goBackToCart() {
    window.location.href = 'cart.html';
}

function viewOrderDetails() {
    // Close confirmation modal
    document.getElementById('paymentConfirmationModal').style.display = 'none';
    
    // Redirect to order details page
    window.location.href = 'order.html?order=' + document.querySelector('.confirmation-details .value:first-child').textContent;
}

function continueShopping() {
    // Close confirmation modal
    document.getElementById('paymentConfirmationModal').style.display = 'none';
    
    // Redirect to store
    window.location.href = 'store.html';
}

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function initializeCardInputs() {
    // Add input masking for better UX
    const cardInputs = document.querySelectorAll('input[type="text"]');
    cardInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
}

// Export functions for global access
window.removeSavedCard = removeSavedCard;
window.useNewCard = useNewCard;
window.processPayment = processPayment;
window.processPayPal = processPayPal;
window.processApplePay = processApplePay;
window.processGooglePay = processGooglePay;
window.goBackToCart = goBackToCart;
window.viewOrderDetails = viewOrderDetails;
window.continueShopping = continueShopping;
window.closePaymentError = closePaymentError;
window.tryDifferentMethod = tryDifferentMethod;