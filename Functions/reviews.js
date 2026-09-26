// Reviews Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsPage();
});

function initializeReviewsPage() {
    // Load reviews data
    loadReviews();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize review form
    initializeReviewForm();
    
    // Initialize feedback form
    initializeFeedbackForm();
    
    // Check admin access
    checkAdminAccess();
    
    // Load admin reviews if applicable
    loadAdminReviews();
}

// Reviews Data Management
let allReviews = [];
let filteredReviews = [];
let currentPage = 1;
const reviewsPerPage = 10;

function loadReviews() {
    // In a real application, this would fetch from an API
    const sampleReviews = [
        {
            id: 1,
            userId: 101,
            userName: 'Sarah Johnson',
            userAvatar: '../images/avatars/avatar1.jpg',
            userBadges: ['verified', 'student'],
            productId: 1,
            productName: 'Organic Apples',
            productCategory: 'fruits',
            productImage: '../images/products/apple.jpg',
            rating: 5,
            title: 'Perfectly Fresh and Crisp!',
            text: 'These apples were absolutely delicious! Crisp, sweet, and perfectly fresh. The delivery was quick and the apples arrived in perfect condition. Will definitely order again!',
            photos: ['../images/reviews/apple1.jpg', '../images/reviews/apple2.jpg'],
            aspects: {
                quality: 5,
                freshness: 5,
                value: 4
            },
            recommendation: true,
            verified: true,
            date: '2024-03-15',
            helpful: 12,
            featured: true,
            flagged: false
        },
        {
            id: 2,
            userId: 102,
            userName: 'Mike Chen',
            userAvatar: '../images/avatars/avatar2.jpg',
            userBadges: ['verified', 'top-reviewer'],
            productId: 2,
            productName: 'Fresh Milk',
            productCategory: 'dairy',
            productImage: '../images/products/milk.jpg',
            rating: 4,
            title: 'Good Quality Milk',
            text: 'The milk was fresh and had a good taste. The packaging was secure and it arrived cold. Only giving 4 stars because the expiration date was a bit closer than I expected.',
            photos: ['../images/reviews/milk1.jpg'],
            aspects: {
                quality: 4,
                freshness: 3,
                value: 4
            },
            recommendation: true,
            verified: true,
            date: '2024-03-14',
            helpful: 8,
            featured: false,
            flagged: false
        },
        {
            id: 3,
            userId: 103,
            userName: 'Emily Rodriguez',
            userAvatar: '../images/avatars/avatar3.jpg',
            userBadges: ['verified'],
            productId: 3,
            productName: 'Whole Wheat Bread',
            productCategory: 'bakery',
            productImage: '../images/products/bread.jpg',
            rating: 5,
            title: 'Fresh and Delicious!',
            text: 'This bread is amazing! So fresh and flavorful. Perfect for sandwiches and toast. The crust is crispy and the inside is soft. Highly recommend!',
            photos: [],
            aspects: {
                quality: 5,
                freshness: 5,
                value: 5
            },
            recommendation: true,
            verified: true,
            date: '2024-03-13',
            helpful: 15,
            featured: false,
            flagged: false
        },
        {
            id: 4,
            userId: 104,
            userName: 'David Kim',
            userAvatar: '../images/avatars/avatar4.jpg',
            userBadges: ['verified', 'student'],
            productId: 4,
            productName: 'Chicken Breast',
            productCategory: 'meat',
            productImage: '../images/products/chicken.jpg',
            rating: 3,
            title: 'Average Quality',
            text: 'The chicken was okay but not great. Some pieces were a bit tough and the packaging could be better. For the price, I expected higher quality.',
            photos: ['../images/reviews/chicken1.jpg'],
            aspects: {
                quality: 3,
                freshness: 4,
                value: 2
            },
            recommendation: false,
            verified: true,
            date: '2024-03-12',
            helpful: 5,
            featured: false,
            flagged: true
        },
        {
            id: 5,
            userId: 105,
            userName: 'Lisa Thompson',
            userAvatar: '../images/avatars/avatar5.jpg',
            userBadges: ['verified', 'top-reviewer'],
            productId: 5,
            productName: 'Fresh Bananas',
            productCategory: 'fruits',
            productImage: '../images/products/banana.jpg',
            rating: 5,
            title: 'Perfect Ripeness!',
            text: 'These bananas were exactly what I wanted - perfectly ripe and sweet. Great for smoothies and eating fresh. The bundle was a good size for the price.',
            photos: ['../images/reviews/banana1.jpg', '../images/reviews/banana2.jpg'],
            aspects: {
                quality: 5,
                freshness: 5,
                value: 5
            },
            recommendation: true,
            verified: true,
            date: '2024-03-11',
            helpful: 20,
            featured: true,
            flagged: false
        }
    ];
    
    allReviews = sampleReviews;
    filteredReviews = [...allReviews];
    displayReviews();
}

function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const emptyReviews = document.getElementById('emptyReviews');
    
    if (filteredReviews.length === 0) {
        reviewsList.style.display = 'none';
        emptyReviews.style.display = 'block';
        return;
    }
    
    reviewsList.style.display = 'block';
    emptyReviews.style.display = 'none';
    reviewsList.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const reviewsToShow = filteredReviews.slice(startIndex, endIndex);
    
    reviewsToShow.forEach(review => {
        const reviewItem = createReviewElement(review);
        reviewsList.appendChild(reviewItem);
    });
    
    // Update load more button visibility
    updateLoadMoreButton();
}

function createReviewElement(review) {
    const reviewItem = document.createElement('div');
reviewItem.className = `review-item ${review.featured ? 'featured' : ''} ${review.flagged ? 'flagged' : ''}`;

    reviewItem.innerHTML = `
        ${isAdmin() ? `
            <div class="admin-actions">
                <button class="admin-btn feature" onclick="toggleFeatured(${review.id})" title="${review.featured ? 'Unfeature' : 'Feature'}">
                    <i class="fas fa-star"></i>
                </button>
                <button class="admin-btn edit" onclick="editReview(${review.id})" title="Edit Review">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="admin-btn delete" onclick="openDeleteModal(${review.id})" title="Delete Review">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : ''}
        
        <div class="review-header">
            <div class="reviewer-info">
                <img src="${review.userAvatar}" alt="${review.userName}" class="reviewer-avatar">
                <div class="reviewer-details">
                    <h4>${review.userName}</h4>
                    <div class="reviewer-badges">
                        ${review.verified ? '<span class="badge verified">Verified Buyer</span>' : ''}
                        ${review.userBadges.includes('student') ? '<span class="badge student">Student</span>' : ''}
                        ${review.userBadges.includes('top-reviewer') ? '<span class="badge top-reviewer">Top Reviewer</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="review-meta">
                <div class="review-rating">
                    <div class="review-stars">
                        ${generateStars(review.rating)}
                    </div>
                    <span class="review-date">${formatDate(review.date)}</span>
                </div>
            </div>
        </div>
        
        <div class="review-product">
            <img src="${review.productImage}" alt="${review.productName}">
            <span>${review.productName}</span>
        </div>
        
        <div class="review-content">
            <h5>${review.title}</h5>
            <div class="review-text ${review.text.length > 200 ? 'expandable' : ''}">
                ${review.text}
            </div>
            ${review.text.length > 200 ? `
                <button class="expand-toggle" onclick="toggleReviewText(this)">Read more</button>
            ` : ''}
        </div>
        
        ${review.photos.length > 0 ? `
            <div class="review-photos">
                ${review.photos.slice(0, 3).map((photo, index) => `
                    <div class="review-photo" onclick="openPhotoViewer(${review.id}, ${index})">
                        <img src="${photo}" alt="Review photo ${index + 1}">
                        ${index === 2 && review.photos.length > 3 ? `
                            <div class="photo-count">+${review.photos.length - 3}</div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${review.aspects ? `
            <div class="review-aspects">
                <div class="aspect-item">
                    <span>Quality</span>
                    <div class="aspect-stars-small">
                        ${generateStars(review.aspects.quality)}
                    </div>
                </div>
                <div class="aspect-item">
                    <span>Freshness</span>
                    <div class="aspect-stars-small">
                        ${generateStars(review.aspects.freshness)}
                    </div>
                </div>
                <div class="aspect-item">
                    <span>Value</span>
                    <div class="aspect-stars-small">
                        ${generateStars(review.aspects.value)}
                    </div>
                </div>
            </div>
        ` : ''}
        
        <div class="review-actions">
            <div class="helpful-section">
                <button class="helpful-btn" onclick="markHelpful(${review.id})">
                    <i class="fas fa-thumbs-up"></i>
                    Helpful
                </button>
                <span class="helpful-count">${review.helpful} people found this helpful</span>
            </div>
            <div class="review-action-buttons">
                <button class="review-action-btn share" onclick="shareReview(${review.id})" title="Share Review">
                    <i class="fas fa-share"></i>
                    Share
                </button>
                <button class="review-action-btn report" onclick="reportReview(${review.id})" title="Report Review">
                    <i class="fas fa-flag"></i>
                    Report
                </button>
            </div>
        </div>
    `;
    
    return reviewItem;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 === rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Yesterday';
if (diffDays < 7) return `${diffDays} days ago`;
if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

}

// Filter Management
function initializeFilters() {
    // Rating filter
    const ratingButtons = document.querySelectorAll('.rating-filter-btn');
    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sortReviews');
    sortSelect.addEventListener('change', applyFilters);
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', applyFilters);
    
    // Photos only toggle
    const photosOnly = document.getElementById('photosOnly');
    photosOnly.addEventListener('change', applyFilters);
    
    // Search input
    const reviewSearch = document.getElementById('reviewSearch');
    let searchTimeout;
    reviewSearch.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(applyFilters, 300);
    });
}

function applyFilters() {
    const ratingFilter = document.querySelector('.rating-filter-btn.active').dataset.rating;
    const sortBy = document.getElementById('sortReviews').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const photosOnly = document.getElementById('photosOnly').checked;
    const searchTerm = document.getElementById('reviewSearch').value.toLowerCase();
    
    filteredReviews = allReviews.filter(review => {
        // Rating filter
        if (ratingFilter !== 'all' && parseInt(ratingFilter) !== review.rating) {
            return false;
        }
        
        // Category filter
        if (categoryFilter !== 'all' && categoryFilter !== review.productCategory) {
            return false;
        }
        
        // Photos only filter
        if (photosOnly && review.photos.length === 0) {
            return false;
        }
        
        // Search filter
        if (searchTerm && !(
            review.productName.toLowerCase().includes(searchTerm) ||
            review.title.toLowerCase().includes(searchTerm) ||
            review.text.toLowerCase().includes(searchTerm) ||
            review.userName.toLowerCase().includes(searchTerm)
        )) {
            return false;
        }
        
        return true;
    });
    
    // Sort reviews
    sortReviews(sortBy);
    
    // Reset to first page
    currentPage = 1;
    
    // Display filtered reviews
    displayReviews();
}

function sortReviews(sortBy) {
    switch(sortBy) {
        case 'newest':
            filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'highest':
            filteredReviews.sort((a, b) => b.rating - a.rating);
            break;
        case 'lowest':
            filteredReviews.sort((a, b) => a.rating - b.rating);
            break;
        case 'most_helpful':
            filteredReviews.sort((a, b) => b.helpful - a.helpful);
            break;
    }
}

function updateLoadMoreButton() {
    const loadMoreContainer = document.querySelector('.load-more-container');
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    
    if (currentPage < totalPages) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

function loadMoreReviews() {
    currentPage++;
    displayReviews();
}

// Review Text Expansion
function toggleReviewText(button) {
    const reviewText = button.previousElementSibling;
    reviewText.classList.toggle('expanded');
    button.textContent = reviewText.classList.contains('expanded') ? 'Read less' : 'Read more';
}

// Review Actions
function markHelpful(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        review.helpful++;
        displayReviews();
        showToast('Thanks for your feedback!', 'success');
    }
}

function shareReview(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    
    if (navigator.share) {
        navigator.share({
            title: `Review: ${review.productName}`,
            text: `${review.title} - ${review.text.substring(0, 100)}...`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const shareText = `${review.title}\n\n${review.text}\n\nRating: ${review.rating}/5 stars`;
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Review copied to clipboard!', 'success');
        });
    }
}

function reportReview(reviewId) {
    if (confirm('Report this review for inappropriate content?')) {
        const review = allReviews.find(r => r.id === reviewId);
        if (review) {
            review.flagged = true;
            showToast('Review reported. Our team will review it shortly.', 'info');
        }
    }
}

// Write Review Modal
function openWriteReviewModal() {
    document.getElementById('writeReviewModal').style.display = 'block';
    initializeStarRating();
    initializeProductSearch();
    initializePhotoUpload();
}

function closeWriteReviewModal() {
    document.getElementById('writeReviewModal').style.display = 'none';
    document.getElementById('reviewForm').reset();
    document.getElementById('selectedProduct').style.display = 'none';
    document.getElementById('uploadedPhotos').innerHTML = '';
}

function initializeReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', handleReviewSubmit);
    
    // Character counters
    const titleInput = document.getElementById('reviewTitle');
    const textInput = document.getElementById('reviewText');
    
    titleInput.addEventListener('input', function() {
        document.getElementById('titleCharCount').textContent = this.value.length;
    });
    
    textInput.addEventListener('input', function() {
        document.getElementById('textCharCount').textContent = this.value.length;
    });
    
    // Delete reason show/hide
    const deleteReason = document.getElementById('deleteReason');
    const deleteNotes = document.getElementById('deleteNotes');
    
    deleteReason.addEventListener('change', function() {
        if (this.value === 'other') {
            deleteNotes.style.display = 'block';
        } else {
            deleteNotes.style.display = 'none';
        }
    });
}

function initializeStarRating() {
    const starRating = document.getElementById('starRating');
    const ratingText = document.getElementById('ratingText');
    const stars = starRating.querySelectorAll('i');
    
    const ratingTexts = {
        1: 'Poor - Very dissatisfied',
        2: 'Fair - Below expectations',
        3: 'Average - Met expectations',
        4: 'Good - Above expectations',
        5: 'Excellent - Exceeded expectations'
    };
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            
            // Update stars
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
            
            // Update rating text
            ratingText.textContent = ratingTexts[rating];
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const activeRating = getCurrentRating();
            stars.forEach((s, index) => {
                if (index < activeRating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
    });
    
    // Initialize aspect ratings
    const aspectRatings = document.querySelectorAll('.aspect-stars');
    aspectRatings.forEach(aspect => {
        const stars = aspect.querySelectorAll('i');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                const aspectName = aspect.dataset.aspect;
                
                // Update stars for this aspect
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.className = 'fas fa-star active';
                    } else {
                        s.className = 'far fa-star';
                    }
                });
            });
        });
    });
}

function getCurrentRating() {
    const activeStars = document.querySelectorAll('#starRating .fa-star.active');
    return activeStars.length;
}

function getAspectRatings() {
    const aspects = {};
    const aspectRatings = document.querySelectorAll('.aspect-stars');
    
    aspectRatings.forEach(aspect => {
        const aspectName = aspect.dataset.aspect;
        const activeStars = aspect.querySelectorAll('.fa-star.active').length;
        aspects[aspectName] = activeStars || 0;
    });
    
    return aspects;
}

function initializeProductSearch() {
    const productSearch = document.getElementById('productSearch');
    const searchResults = document.getElementById('productResults');
    
    // Sample products data
    const products = [
        { id: 1, name: 'Organic Apples', category: 'Fruits', image: '../images/products/apple.jpg' },
        { id: 2, name: 'Fresh Milk', category: 'Dairy', image: '../images/products/milk.jpg' },
        { id: 3, name: 'Whole Wheat Bread', category: 'Bakery', image: '../images/products/bread.jpg' },
        { id: 4, name: 'Chicken Breast', category: 'Meat & Poultry', image: '../images/products/chicken.jpg' },
        { id: 5, name: 'Fresh Bananas', category: 'Fruits', image: '../images/products/banana.jpg' },
        { id: 6, name: 'Greek Yogurt', category: 'Dairy', image: '../images/products/yogurt.jpg' },
        { id: 7, name: 'Basmati Rice', category: 'Pantry Staples', image: '../images/products/rice.jpg' },
        { id: 8, name: 'Premium Coffee', category: 'Beverages', image: '../images/products/coffee.jpg' }
    ];
    
    productSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchResults.innerHTML = '';
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        if (filteredProducts.length > 0) {
            searchResults.style.display = 'block';
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="search-result-info">
                        <h5>${product.name}</h5>
                        <span>${product.category}</span>
                    </div>
                `;
                resultItem.addEventListener('click', () => selectProduct(product));
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'none';
        }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (!productSearch.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function selectProduct(product) {
    const selectedProduct = document.getElementById('selectedProduct');
    const productSearch = document.getElementById('productSearch');
    const searchResults = document.getElementById('productResults');
    
    document.getElementById('selectedProductImage').src = product.image;
    document.getElementById('selectedProductName').textContent = product.name;
    document.getElementById('selectedProductCategory').textContent = product.category;
    
    selectedProduct.style.display = 'flex';
    productSearch.value = '';
    searchResults.style.display = 'none';
}

function clearProductSelection() {
    document.getElementById('selectedProduct').style.display = 'none';
}

function initializePhotoUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const photoUpload = document.getElementById('photoUpload');
    const uploadedPhotos = document.getElementById('uploadedPhotos');
    
    uploadArea.addEventListener('click', () => photoUpload.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handlePhotoFiles(files);
    });
    
    photoUpload.addEventListener('change', (e) => {
        handlePhotoFiles(e.target.files);
    });
}

function handlePhotoFiles(files) {
    const uploadedPhotos = document.getElementById('uploadedPhotos');
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showToast('Please upload only image files', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size should be less than 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'uploaded-photo';
            photoDiv.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded photo">
                <button class="remove-photo" onclick="removePhoto(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            uploadedPhotos.appendChild(photoDiv);
        };
        reader.readAsDataURL(file);
    });
}

function removePhoto(button) {
    button.parentElement.remove();
}

function handleReviewSubmit(e) {
    e.preventDefault();
    
    if (!validateReviewForm()) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create new review
        const newReview = {
            id: allReviews.length + 1,
            userId: 106, // Current user ID
            userName: 'Current User',
            userAvatar: '../images/user-avatar.jpg',
            userBadges: ['verified', 'student'],
            productId: 1, // This would come from selected product
            productName: document.getElementById('selectedProductName').textContent,
            productCategory: 'fruits', // This would come from selected product
            productImage: document.getElementById('selectedProductImage').src,
            rating: getCurrentRating(),
            title: document.getElementById('reviewTitle').value,
            text: document.getElementById('reviewText').value,
            photos: [], // This would be the uploaded photos
            aspects: getAspectRatings(),
            recommendation: document.querySelector('input[name="recommendation"]:checked').value === 'yes',
            verified: document.getElementById('verifiedPurchase').checked,
            date: new Date().toISOString().split('T')[0],
            helpful: 0,
            featured: false,
            flagged: false
        };
        
        // Add to reviews
        allReviews.unshift(newReview);
        filteredReviews.unshift(newReview);
        
        // Close modal and reset form
        closeWriteReviewModal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Refresh reviews display
        applyFilters();
        
        showToast('Review submitted successfully!', 'success');
    }, 2000);
}

function validateReviewForm() {
    const title = document.getElementById('reviewTitle').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const selectedProduct = document.getElementById('selectedProduct').style.display !== 'none';
    const rating = getCurrentRating();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    let isValid = true;
    
    if (!selectedProduct) {
        showToast('Please select a product to review', 'error');
        isValid = false;
    }
    
    if (rating === 0) {
        showToast('Please provide a rating', 'error');
        isValid = false;
    }
    
    if (!title) {
        showToast('Please enter a review title', 'error');
        isValid = false;
    }
    
    if (!text) {
        showToast('Please enter your review', 'error');
        isValid = false;
    }
    
    if (!agreeTerms) {
        showToast('Please agree to the review guidelines and terms', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Guidelines Modal
function showReviewGuidelines() {
    document.getElementById('guidelinesModal').style.display = 'block';
}

function closeGuidelinesModal() {
    document.getElementById('guidelinesModal').style.display = 'none';
}

// Admin Functions
function isAdmin() {
    // In a real application, this would check user role from authentication
    return false; // Change to true to test admin features
}

function checkAdminAccess() {
    if (isAdmin()) {
        document.getElementById('adminPanel').style.display = 'block';
    }
}

function loadAdminReviews() {
    if (!isAdmin()) return;
    
    const adminReviewsList = document.getElementById('adminReviewsList');
    const flaggedReviews = allReviews.filter(review => review.flagged);
    
    if (flaggedReviews.length === 0) {
        adminReviewsList.innerHTML = '<p>No flagged reviews to manage.</p>';
        return;
    }
    
    adminReviewsList.innerHTML = '';
    flaggedReviews.forEach(review => {
        const adminReviewItem = document.createElement('div');
        adminReviewItem.className = 'admin-review-item flagged';
        adminReviewItem.innerHTML = `
            <div class="admin-review-content">
                <div class="admin-review-header">
                    <div class="admin-reviewer">
                        <img src="${review.userAvatar}" alt="${review.userName}">
                        <div class="admin-reviewer-info">
                            <h5>${review.userName}</h5>
                            <span>${formatDate(review.date)}</span>
                        </div>
                    </div>
                    <div class="admin-review-meta">
                        <div class="admin-review-rating">
                            <div class="review-stars">
                                ${generateStars(review.rating)}
                            </div>
                        </div>
                        <div class="admin-review-product">${review.productName}</div>
                    </div>
                </div>
                <div class="admin-review-text">${review.text}</div>
                <div class="admin-review-flags">
                    <span class="flag-badge inappropriate">Flagged as Inappropriate</span>
                </div>
            </div>
            <div class="admin-review-actions">
                <button class="admin-action-btn approve" onclick="approveReview(${review.id})">
                    <i class="fas fa-check"></i>
                    Approve
                </button>
                <button class="admin-action-btn delete" onclick="openDeleteModal(${review.id})">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        `;
        adminReviewsList.appendChild(adminReviewItem);
    });
}

function approveReview(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        review.flagged = false;
        showToast('Review approved and published', 'success');
        loadAdminReviews();
        applyFilters();
    }
}

function toggleFeatured(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        review.featured = !review.featured;
       showToast(`Review ${review.featured ? 'featured' : 'unfeatured'}`, 'success');

        applyFilters();
    }
}

function editReview(reviewId) {
    // This would open an edit modal in a real application
    showToast('Edit review feature coming soon!', 'info');
}

function openDeleteModal(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        document.getElementById('deleteReviewPreview').innerHTML = `
            <strong>${review.productName}</strong>
            <p>By ${review.userName} • ${formatDate(review.date)}</p>
            <p>${review.title}</p>
        `;
        document.getElementById('deleteReviewModal').style.display = 'block';
        document.getElementById('deleteReviewModal').dataset.reviewId = reviewId;
    }
}

function closeDeleteModal() {
    document.getElementById('deleteReviewModal').style.display = 'none';
}

function confirmDeleteReview() {
    const reviewId = parseInt(document.getElementById('deleteReviewModal').dataset.reviewId);
    const reason = document.getElementById('deleteReason').value;
    const notes = document.getElementById('deleteNotes').value;
    
    const reviewIndex = allReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        allReviews.splice(reviewIndex, 1);
        showToast('Review deleted successfully', 'success');
        closeDeleteModal();
        applyFilters();
        loadAdminReviews();
    }
}

function exportReviews() {
    // This would export reviews to CSV/Excel in a real application
    showToast('Exporting reviews...', 'info');
    setTimeout(() => {
        showToast('Reviews exported successfully!', 'success');
    }, 2000);
}

function bulkDeleteReviews() {
    if (confirm('Delete all flagged reviews?')) {
        allReviews = allReviews.filter(review => !review.flagged);
        showToast('Flagged reviews deleted', 'success');
        applyFilters();
        loadAdminReviews();
    }
}

function refreshReviews() {
    loadReviews();
    showToast('Reviews refreshed', 'info');
}

// Feedback Form
function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
}

function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    if (validateFeedbackForm()) {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showToast('Thank you for your feedback! We\'ll review it shortly.', 'success');
        }, 2000);
    }
}

function validateFeedbackForm() {
    const type = document.getElementById('feedbackType').value;
    const subject = document.getElementById('feedbackSubject').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    
    let isValid = true;
    
    if (!type) {
        showToast('Please select feedback type', 'error');
        isValid = false;
    }
    
    if (!subject) {
        showToast('Please enter a subject', 'error');
        isValid = false;
    }
    
    if (!message) {
        showToast('Please enter your feedback', 'error');
        isValid = false;
    }
    
    if (!email) {
        showToast('Please enter your email address', 'error');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    return isValid;
}

function resetFeedbackForm() {
    if (confirm('Reset feedback form?')) {
        document.getElementById('feedbackForm').reset();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Export functions for global access
window.openWriteReviewModal = openWriteReviewModal;
window.closeWriteReviewModal = closeWriteReviewModal;
window.showReviewGuidelines = showReviewGuidelines;
window.closeGuidelinesModal = closeGuidelinesModal;
window.toggleReviewText = toggleReviewText;
window.markHelpful = markHelpful;
window.shareReview = shareReview;
window.reportReview = reportReview;
window.openPhotoViewer = openPhotoViewer;
window.clearProductSelection = clearProductSelection;
window.removePhoto = removePhoto;
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDeleteReview = confirmDeleteReview;
window.approveReview = approveReview;
window.toggleFeatured = toggleFeatured;
window.editReview = editReview;
window.exportReviews = exportReviews;
window.bulkDeleteReviews = bulkDeleteReviews;
window.refreshReviews = refreshReviews;
window.resetFeedbackForm = resetFeedbackForm;
window.loadMoreReviews = loadMoreReviews;