// Search Results JavaScript for FreshMart
document.addEventListener('DOMContentLoaded', function () {
    initializeSearchResults();
    initializeSearchSuggestions();
    initializeFilters();
    initializeMobileFilters();
    updateCartCount();
});

// Search Results Initialization
function initializeSearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    const category = urlParams.get('category') || '';

    // Update search input with current query
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchQuery) {
        searchInput.value = searchQuery;
    }

    // Initialize search form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchSubmit);
    }

    // Initialize popular search tags
    initializeSearchTags();

    // Load recent searches
    loadRecentSearches();

    // Perform search or display initial products
    if (searchQuery || category) {
        performSearch(searchQuery, category);
    } else {
        displayInitialProducts();
    }
}

// Display initial products
function displayInitialProducts() {
    const allProducts = getAllProducts();
    
    if (allProducts.length > 0) {
        displaySearchResults(allProducts, '');
        updateSearchInfo(allProducts.length, 'all products');
    } else {
        showNoResults();
    }
}

// Search Functionality
function performSearch(query, category = '') {
    showLoadingState();

    // Simulate API call delay
    setTimeout(() => {
        try {
            const results = searchProducts(query, category);
            displaySearchResults(results, query);
            updateSearchInfo(results.length, query);
            if (query && query.trim()) {
                saveToRecentSearches(query);
            }
        } catch (error) {
            console.error('Search error:', error);
            showErrorState();
        }
    }, 500);
}

function searchProducts(query, category = '') {
    const allProducts = getAllProducts();
    const filters = getCurrentFilters();

    let results = allProducts;

    // Apply search query
    if (query && query.trim()) {
        const searchTerms = query.toLowerCase().trim().split(/\s+/);
        results = results.filter(product => {
            const searchableText = `
                ${product.name} 
                ${product.category} 
                ${product.description} 
                ${product.brand || ''}
                ${product.tags?.join(' ') || ''}
            `.toLowerCase();

            return searchTerms.some(term =>
                searchableText.includes(term)
            );
        });
    }

    // Apply category filter
    if (category) {
        results = results.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Apply other filters
    results = applyFilters(results, filters);

    // Apply sorting
    results = sortProducts(results, getCurrentSort());

    return results;
}

function applyFilters(products, filters) {
    let filtered = [...products];

    // Category filter
    if (filters.categories.length > 0) {
        filtered = filtered.filter(product =>
            filters.categories.includes(product.category.toLowerCase())
        );
    }

    // Price filter
    if (filters.maxPrice > 0 && filters.maxPrice < 100) {
        filtered = filtered.filter(product =>
            product.price <= filters.maxPrice
        );
    }

    if (filters.minPrice > 0) {
        filtered = filtered.filter(product =>
            product.price >= filters.minPrice
        );
    }

    // Rating filter
    if (filters.minRating > 0) {
        filtered = filtered.filter(product =>
            product.rating >= filters.minRating
        );
    }

    // Availability filter
    if (filters.availability.length > 0) {
        if (filters.availability.includes('in-stock')) {
            filtered = filtered.filter(product => product.stock > 0);
        }
    }

    // Dietary preferences
    if (filters.dietary.length > 0) {
        filtered = filtered.filter(product => {
            let matches = true;
            
            if (filters.dietary.includes('organic') && !product.organic) {
                matches = false;
            }
            if (filters.dietary.includes('gluten-free') && !product.glutenFree) {
                matches = false;
            }
            if (filters.dietary.includes('vegan') && !product.vegan) {
                matches = false;
            }
            
            return matches;
        });
    }

    return filtered;
}

// Display Results
function displaySearchResults(products, query) {
    const resultsGrid = document.getElementById('resultsGrid');
    const noResultsState = document.getElementById('noResultsState');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');

    loadingState.style.display = 'none';
    errorState.style.display = 'none';

    if (products.length === 0) {
        noResultsState.style.display = 'block';
        resultsGrid.innerHTML = '';
        resultsGrid.style.display = 'none';
        return;
    }

    noResultsState.style.display = 'none';

    const productsHTML = products.map(product =>
        createProductCard(product, query)
    ).join('');

    resultsGrid.innerHTML = productsHTML;
    resultsGrid.style.display = 'grid';

    // Initialize product interactions
    initializeProductInteractions();

    // Show load more if needed
    showLoadMoreControls(products.length);
}

function createProductCard(product, query) {
    const discount = product.originalPrice ?
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const highlightedName = highlightSearchTerms(product.name, query);
    const highlightedDescription = highlightSearchTerms(product.description, query);

    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3>${highlightedName}</h3>
                <p class="product-description">${highlightedDescription}</p>
                <div class="product-rating">
                    <div class="rating-stars-small">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
                    ` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCartFromSearch(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button class="btn-wishlist" onclick="toggleWishlistFromSearch(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function highlightSearchTerms(text, query) {
    if (!query || !text) return text;

    const terms = query.toLowerCase().trim().split(/\s+/).filter(term => term.length > 1);
    let highlighted = text;

    terms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlighted = highlighted.replace(regex, '<span class="highlight">$1</span>');
    });

    return highlighted;
}

// Search Information
function updateSearchInfo(resultCount, query) {
    const resultsCount = document.getElementById('resultsCount');
    const resultsMeta = document.getElementById('resultsMeta');
    
    if (resultCount === 0) {
        if (resultsCount) resultsCount.textContent = query ? `No results found for "${query}"` : 'No products found';
        if (resultsMeta) resultsMeta.textContent = '0 products';
    } else if (query && query.trim()) {
        if (resultsCount) resultsCount.textContent = `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "${query}"`;
        if (resultsMeta) resultsMeta.textContent = `${resultCount} product${resultCount !== 1 ? 's' : ''}`;
    } else {
        if (resultsCount) resultsCount.textContent = `Showing all products`;
        if (resultsMeta) resultsMeta.textContent = `${resultCount} product${resultCount !== 1 ? 's' : ''}`;
    }
}

// Filters System
function initializeFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('#categoryFilters input');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyAllFilters);
    });

    // Price filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    if (priceRange) {
        priceRange.addEventListener('input', function () {
            if (priceValue) priceValue.textContent = this.value;
            if (maxPrice) maxPrice.value = this.value;
        });
        
        priceRange.addEventListener('change', applyAllFilters);
    }

    if (minPrice) {
        minPrice.addEventListener('change', function() {
            updatePriceRange();
            applyAllFilters();
        });
    }
    
    if (maxPrice) {
        maxPrice.addEventListener('change', function() {
            updatePriceRange();
            applyAllFilters();
        });
    }

    // Rating filters
    const ratingFilters = document.querySelectorAll('#ratingFilters input');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', applyAllFilters);
    });

    // Other filters
    const otherFilters = document.querySelectorAll('[data-filter="availability"], [data-filter="dietary"]');
    otherFilters.forEach(filter => {
        filter.addEventListener('change', applyAllFilters);
    });

    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }

    // Sort options
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyAllFilters);
    }
}

function getCurrentFilters() {
    const filters = {
        categories: [],
        minPrice: parseInt(document.getElementById('minPrice')?.value) || 0,
        maxPrice: parseInt(document.getElementById('priceRange')?.value) || 100,
        minRating: 0,
        availability: [],
        dietary: []
    };

    // Get category filters
    const categoryChecks = document.querySelectorAll('#categoryFilters input:checked');
    categoryChecks.forEach(check => {
        filters.categories.push(check.value.toLowerCase());
    });

    // Get rating filter
    const ratingRadio = document.querySelector('#ratingFilters input:checked');
    if (ratingRadio) {
        filters.minRating = parseFloat(ratingRadio.value);
    }

    // Get availability filters
    const availabilityChecks = document.querySelectorAll('[data-filter="availability"]:checked');
    availabilityChecks.forEach(check => {
        filters.availability.push(check.value);
    });

    // Get dietary filters
    const dietaryChecks = document.querySelectorAll('[data-filter="dietary"]:checked');
    dietaryChecks.forEach(check => {
        filters.dietary.push(check.value);
    });

    return filters;
}

function getCurrentSort() {
    const sortSelect = document.getElementById('sortSelect');
    return sortSelect ? sortSelect.value : 'relevance';
}

function applyAllFilters() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    performSearch(query);
}

function clearAllFilters() {
    // Clear all checkboxes and radio buttons
    const allFilters = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    allFilters.forEach(filter => {
        filter.checked = false;
    });

    // Reset price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    if (priceRange) {
        priceRange.value = 100;
        if (priceValue) priceValue.textContent = '100';
    }
    if (minPrice) minPrice.value = '';
    if (maxPrice) maxPrice.value = '';

    // Reset sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.value = 'relevance';
    }

    applyAllFilters();
    showToast('All filters cleared', 'success');
}

function updatePriceRange() {
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (maxPrice && maxPrice.value && priceRange && priceValue) {
        const maxVal = parseInt(maxPrice.value);
        if (maxVal >= 0 && maxVal <= 100) {
            priceRange.value = maxVal;
            priceValue.textContent = maxVal;
        }
    }
}

// Sorting
function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => new Date(b.addedDate || b.dateAdded) - new Date(a.addedDate || a.dateAdded));
        case 'popular':
            return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        case 'relevance':
        default:
            return sorted;
    }
}

// Search Suggestions
function initializeSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('searchSuggestions');

    if (!searchInput || !suggestionsContainer) return;

    let debounceTimer;

    searchInput.addEventListener('input', function () {
        const query = this.value.trim();

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (query.length < 2) {
                suggestionsContainer.classList.remove('active');
                return;
            }

            const suggestions = getSearchSuggestions(query);
            displaySearchSuggestions(suggestions, query);
        }, 300);
    });

    searchInput.addEventListener('focus', function () {
        const query = this.value.trim();
        if (query.length >= 2) {
            const suggestions = getSearchSuggestions(query);
            displaySearchSuggestions(suggestions, query);
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.remove('active');
        }
    });
}

function getSearchSuggestions(query) {
    const allProducts = getAllProducts();
    const queryLower = query.toLowerCase();
    const suggestions = [];

    // Product name matches
    const productMatches = allProducts.filter(product =>
        product.name.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower)
    ).slice(0, 5);

    productMatches.forEach(product => {
        suggestions.push({
            type: 'product',
            text: product.name,
            category: product.category,
            id: product.id
        });
    });

    // Category matches
    const categories = ['fruits', 'vegetables', 'dairy', 'meat', 'beverages', 'snacks', 'pantry', 'bakery'];
    const categoryMatches = categories.filter(category =>
        category.includes(queryLower)
    ).slice(0, 3);

    categoryMatches.forEach(category => {
        suggestions.push({
            type: 'category',
            text: category.charAt(0).toUpperCase() + category.slice(1),
            category: 'Category'
        });
    });

    return suggestions;
}

function displaySearchSuggestions(suggestions, query) {
    const suggestionsContainer = document.getElementById('searchSuggestions');

    if (!suggestionsContainer) return;

    if (suggestions.length === 0) {
        suggestionsContainer.classList.remove('active');
        return;
    }

    const suggestionsHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" onclick="selectSuggestion('${suggestion.text.replace(/'/g, "\\'")}', '${suggestion.type}')">
            <div class="suggestion-category">${suggestion.category}</div>
            <div class="suggestion-text">${highlightSearchTerms(suggestion.text, query)}</div>
        </div>
    `).join('');

    suggestionsContainer.innerHTML = suggestionsHTML;
    suggestionsContainer.classList.add('active');
}

function selectSuggestion(text, type) {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('searchSuggestions');

    if (searchInput) {
        searchInput.value = text;
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
        }

        if (type === 'category') {
            performSearch('', text.toLowerCase());
        } else {
            performSearch(text);
        }
    }
}

// Recent Searches
function loadRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('freshmartRecentSearches')) || [];
    const recentSearchesSection = document.getElementById('recentSearchesSection');
    const recentSearchesContainer = document.getElementById('recentSearches');

    if (!recentSearchesSection || !recentSearchesContainer) return;

    if (recentSearches.length === 0) {
        recentSearchesSection.style.display = 'none';
        return;
    }

    recentSearchesSection.style.display = 'block';

    const recentHTML = recentSearches.map(search => `
        <button class="search-tag" onclick="performRecentSearch('${search.replace(/'/g, "\\'")}')">
            ${search}
        </button>
    `).join('');

    recentSearchesContainer.innerHTML = recentHTML;
}

function performRecentSearch(query) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
    }
    performSearch(query);
}

function saveToRecentSearches(query) {
    if (!query || !query.trim()) return;

    let recentSearches = JSON.parse(localStorage.getItem('freshmartRecentSearches')) || [];

    // Remove if already exists
    recentSearches = recentSearches.filter(item => item.toLowerCase() !== query.toLowerCase());

    // Add to beginning
    recentSearches.unshift(query);

    // Keep only last 5 searches
    recentSearches = recentSearches.slice(0, 5);

    localStorage.setItem('freshmartRecentSearches', JSON.stringify(recentSearches));
    loadRecentSearches();
}

// Popular Search Tags
function initializeSearchTags() {
    const searchTags = document.querySelectorAll('.search-tag[data-search]');
    searchTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const searchQuery = this.getAttribute('data-search');
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = searchQuery;
            }
            performSearch(searchQuery);
        });
    });
}

// Mobile Filters
function initializeMobileFilters() {
    const mobileFiltersBtn = document.getElementById('mobileFiltersBtn');

    if (!mobileFiltersBtn) return;

    const mobileFiltersOverlay = document.createElement('div');
    mobileFiltersOverlay.className = 'mobile-filters-overlay';
    mobileFiltersOverlay.id = 'mobileFiltersOverlay';

    const mobileFiltersSidebar = document.createElement('div');
    mobileFiltersSidebar.className = 'mobile-filters-sidebar';
    mobileFiltersSidebar.id = 'mobileFiltersSidebar';

    // Clone desktop filters to mobile sidebar
    const desktopFilters = document.querySelector('.filters-sidebar');
    if (desktopFilters) {
        mobileFiltersSidebar.innerHTML = `
            <div class="mobile-filters-header">
                <h3>Filters</h3>
                <button class="mobile-filters-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            ${desktopFilters.innerHTML}
        `;
    }

    document.body.appendChild(mobileFiltersOverlay);
    document.body.appendChild(mobileFiltersSidebar);

    // Event listeners
    mobileFiltersBtn.addEventListener('click', openMobileFilters);

    const mobileFiltersClose = mobileFiltersSidebar.querySelector('.mobile-filters-close');
    if (mobileFiltersClose) {
        mobileFiltersClose.addEventListener('click', closeMobileFilters);
    }

    mobileFiltersOverlay.addEventListener('click', closeMobileFilters);

    // Re-initialize filters inside mobile sidebar
    setTimeout(() => {
        const mobileFilters = mobileFiltersSidebar.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        mobileFilters.forEach(filter => {
            filter.addEventListener('change', function () {
                applyAllFilters();
            });
        });
    }, 100);
}

function openMobileFilters() {
    const overlay = document.getElementById('mobileFiltersOverlay');
    const sidebar = document.getElementById('mobileFiltersSidebar');

    if (overlay && sidebar) {
        overlay.style.display = 'block';
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileFilters() {
    const overlay = document.getElementById('mobileFiltersOverlay');
    const sidebar = document.getElementById('mobileFiltersSidebar');

    if (overlay && sidebar) {
        overlay.style.display = 'none';
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// UI States
function showLoadingState() {
    const loadingState = document.getElementById('loadingState');
    const resultsGrid = document.getElementById('resultsGrid');
    const noResultsState = document.getElementById('noResultsState');
    const errorState = document.getElementById('errorState');

    if (loadingState) loadingState.style.display = 'block';
    if (resultsGrid) resultsGrid.style.display = 'none';
    if (noResultsState) noResultsState.style.display = 'none';
    if (errorState) errorState.style.display = 'none';
}

function showErrorState() {
    const loadingState = document.getElementById('loadingState');
    const resultsGrid = document.getElementById('resultsGrid');
    const noResultsState = document.getElementById('noResultsState');
    const errorState = document.getElementById('errorState');

    if (loadingState) loadingState.style.display = 'none';
    if (resultsGrid) resultsGrid.style.display = 'none';
    if (noResultsState) noResultsState.style.display = 'none';
    if (errorState) errorState.style.display = 'block';
}

function showNoResults() {
    const noResultsState = document.getElementById('noResultsState');
    if (noResultsState) {
        noResultsState.style.display = 'block';
    }
}

// Load More Controls
function showLoadMoreControls(totalResults) {
    const loadMoreContainer = document.getElementById('loadMoreContainer');

    if (!loadMoreContainer) return;

    if (totalResults <= 12) {
        loadMoreContainer.style.display = 'none';
        return;
    }

    loadMoreContainer.style.display = 'block';

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.onclick = loadMoreProducts;
    }
}

function loadMoreProducts() {
    showToast('Loading more products...', 'info');
    console.log('Loading more products...');
}

// Product Interactions
function initializeProductInteractions() {
    // Product interactions are handled by onclick attributes
    console.log('Product interactions initialized');
}

function addToCartFromSearch(productId) {
    const product = getProductById(productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('freshmartCart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`, 'success');
}

function toggleWishlistFromSearch(productId) {
    const product = getProductById(productId);
    const wishlistBtn = document.querySelector(`[data-product-id="${productId}"] .btn-wishlist`);

    if (!product || !wishlistBtn) return;

    let wishlist = JSON.parse(localStorage.getItem('freshmartWishlist')) || [];
    const index = wishlist.findIndex(id => id === productId);

    if (index !== -1) {
        wishlist.splice(index, 1);
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.classList.remove('active');
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        wishlistBtn.classList.add('active');
        showToast(`${product.name} added to wishlist!`, 'success');
    }

    localStorage.setItem('freshmartWishlist', JSON.stringify(wishlist));
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounts = document.querySelectorAll('.cart-count');
    
    cartCounts.forEach(countElement => {
        countElement.textContent = totalItems;
    });
}

// Product Data - All 24 Products
function getAllProducts() {
    return [
        // Bakery Products (3)
        {
            id: 1,
            name: 'Artisan Bread',
            category: 'bakery',
            description: 'Traditional artisan bread with crispy crust and soft interior. Baked fresh daily.',
            price: 4.99,
            originalPrice: 5.99,
            rating: 4.6,
            reviews: 145,
            image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 25,
            organic: false,
            glutenFree: false,
            vegan: true,
            badge: 'Fresh Daily',
            addedDate: '2023-10-20',
            tags: ['bread', 'bakery', 'fresh', 'artisan']
        },
        {
            id: 2,
            name: 'Chocolate Cake',
            category: 'bakery',
            description: 'Rich, moist chocolate cake with creamy frosting. Perfect for celebrations or sweet treats.',
            price: 18.99,
            originalPrice: null,
            rating: 4.9,
            reviews: 92,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 8,
            organic: false,
            glutenFree: false,
            vegan: false,
            badge: 'Celebration',
            addedDate: '2023-10-18',
            tags: ['cake', 'chocolate', 'dessert', 'bakery']
        },
        {
            id: 3,
            name: 'French Croissants',
            category: 'bakery',
            description: 'Buttery, flaky French croissants with delicate layers. Perfect for breakfast or snacks.',
            price: 6.99,
            originalPrice: 7.99,
            rating: 4.7,
            reviews: 178,
            image: 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 15,
            organic: false,
            glutenFree: false,
            vegan: false,
            badge: 'Buttery',
            addedDate: '2023-10-22',
            tags: ['croissant', 'french', 'pastry', 'bakery']
        },

        // Dairy Products (3)
        {
            id: 4,
            name: 'Farm Fresh Milk',
            category: 'dairy',
            description: 'Premium whole milk from local farms. Rich and creamy, perfect for cereals, coffee, or drinking.',
            price: 3.49,
            originalPrice: null,
            rating: 4.3,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 12,
            organic: false,
            glutenFree: true,
            vegan: false,
            badge: 'Fresh',
            addedDate: '2023-10-19',
            tags: ['milk', 'dairy', 'fresh', 'organic']
        },
        {
            id: 5,
            name: 'Aged Cheddar Cheese',
            category: 'dairy',
            description: 'Premium aged cheddar with rich, sharp flavor. Perfect for sandwiches, cooking, or cheese boards.',
            price: 8.99,
            originalPrice: 9.99,
            rating: 4.8,
            reviews: 178,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 10,
            organic: false,
            glutenFree: true,
            vegan: false,
            badge: 'Sale',
            addedDate: '2023-10-12',
            tags: ['cheese', 'cheddar', 'dairy', 'aged']
        },
        {
            id: 6,
            name: 'Greek Yogurt',
            category: 'dairy',
            description: 'Thick, creamy Greek yogurt packed with protein. Perfect for breakfast, snacks, or cooking.',
            price: 5.99,
            originalPrice: 6.99,
            rating: 4.6,
            reviews: 112,
            image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 20,
            organic: true,
            glutenFree: true,
            vegan: false,
            badge: 'High Protein',
            addedDate: '2023-10-18',
            tags: ['yogurt', 'greek', 'dairy', 'protein']
        },

        // Fruits (3)
        {
            id: 7,
            name: 'Fresh Organic Apples',
            category: 'fruits',
            description: 'Premium organic red apples, crisp and sweet. Perfect for snacking or baking.',
            price: 4.99,
            originalPrice: 6.99,
            rating: 4.5,
            reviews: 128,
            image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 35,
            organic: true,
            glutenFree: true,
            vegan: true,
            badge: 'Sale',
            addedDate: '2023-10-15',
            tags: ['apple', 'fruit', 'organic', 'fresh']
        },
        {
            id: 8,
            name: 'Fresh Bananas',
            category: 'fruits',
            description: 'Naturally ripened bananas, perfect sweetness and texture. Great source of potassium.',
            price: 2.49,
            originalPrice: null,
            rating: 4.4,
            reviews: 156,
            image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 50,
            organic: false,
            glutenFree: true,
            vegan: true,
            badge: 'Popular',
            addedDate: '2023-10-22',
            tags: ['banana', 'fruit', 'fresh', 'healthy']
        },
        {
            id: 9,
            name: 'Fresh Mangoes',
            category: 'fruits',
            description: 'Sweet, juicy mangoes packed with vitamins and flavor. Perfect for smoothies or fresh eating.',
            price: 5.99,
            originalPrice: 7.99,
            rating: 4.7,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 15,
            organic: false,
            glutenFree: true,
            vegan: true,
            badge: 'Seasonal',
            addedDate: '2023-10-24',
            tags: ['mango', 'fruit', 'tropical', 'fresh']
        },

        // Meat & Seafood (3)
        {
            id: 10,
            name: 'Premium Chicken Breast',
            category: 'meat',
            description: 'Boneless, skinless chicken breast. Lean protein perfect for healthy meals.',
            price: 12.99,
            originalPrice: 14.99,
            rating: 4.7,
            reviews: 203,
            image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 8,
            organic: false,
            glutenFree: true,
            vegan: false,
            badge: 'Popular',
            addedDate: '2023-10-10',
            tags: ['chicken', 'meat', 'protein', 'fresh']
        },
        {
            id: 11,
            name: 'Fresh Ground Beef',
            category: 'meat',
            description: 'Lean ground beef perfect for burgers, meatballs, and pasta dishes. 80% lean, 20% fat.',
            price: 9.99,
            originalPrice: null,
            rating: 4.4,
            reviews: 134,
            image: 'https://images.unsplash.com/photo-1588347818122-c6c8e5840c0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 25,
            organic: false,
            glutenFree: true,
            vegan: false,
            badge: null,
            addedDate: '2023-10-17',
            tags: ['beef', 'meat', 'ground', 'fresh']
        },
        {
            id: 12,
            name: 'Fresh Salmon Fillet',
            category: 'seafood',
            description: 'Wild-caught salmon fillet rich in omega-3. Perfect for grilling, baking, or pan-searing.',
            price: 18.99,
            originalPrice: 22.99,
            rating: 4.9,
            reviews: 167,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 6,
            organic: false,
            glutenFree: true,
            vegan: false,
            badge: 'Omega-3',
            addedDate: '2023-10-13',
            tags: ['salmon', 'seafood', 'fish', 'omega3']
        },

        // Pantry (3)
        {
            id: 13,
            name: 'Basmati Rice',
            category: 'pantry',
            description: 'Premium long-grain basmati rice with delicate aroma. Perfect for biryanis and pilafs.',
            price: 6.99,
            originalPrice: null,
            rating: 4.4,
            reviews: 87,
            image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 30,
            organic: false,
            glutenFree: true,
            vegan: true,
            badge: 'Premium',
            addedDate: '2023-10-16',
            tags: ['rice', 'basmati', 'pantry', 'grain']
        },
        {
            id: 14,
            name: 'All-Purpose Flour',
            category: 'pantry',
            description: 'High-quality all-purpose flour perfect for baking bread, cakes, and pastries.',
            price: 4.49,
            originalPrice: 4.99,
            rating: 4.3,
            reviews: 73,
            image: 'https://images.unsplash.com/photo-1558961369-ec95f9d6b5a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 40,
            organic: false,
            glutenFree: false,
            vegan: true,
            badge: 'Sale',
            addedDate: '2023-10-21',
            tags: ['flour', 'baking', 'pantry']
        },
        {
            id: 15,
            name: 'Pure Cane Sugar',
            category: 'pantry',
            description: 'Natural pure cane sugar for sweetening beverages, baking, and cooking.',
            price: 3.99,
            originalPrice: null,
            rating: 4.2,
            reviews: 64,
            image: 'https://images.unsplash.com/photo-1585350589382-57e8e4a92b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 35,
            organic: false,
            glutenFree: true,
            vegan: true,
            badge: null,
            addedDate: '2023-10-23',
            tags: ['sugar', 'sweetener', 'pantry']
        },

        // Snacks (3)
        {
            id: 16,
            name: 'Butter Popcorn',
            category: 'snacks',
            description: 'Classic butter popcorn perfect for movie nights and snacking. Light, fluffy, and delicious.',
            price: 3.25,
            originalPrice: 4.00,
            rating: 4.6,
            reviews: 234,
            image: 'https://images.unsplash.com/photo-1571321504325-59ab3f0c61f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 28,
            organic: false,
            glutenFree: true,
            vegan: false,
            badge: 'Save 19%',
            addedDate: '2023-10-20',
            tags: ['popcorn', 'snack', 'butter']
        },
        {
            id: 17,
            name: 'Chocolate Chip Cookies',
            category: 'snacks',
            description: 'Soft, chewy chocolate chip cookies loaded with real chocolate chips. Baked fresh daily.',
            price: 4.99,
            originalPrice: null,
            rating: 4.7,
            reviews: 189,
            image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 22,
            organic: false,
            glutenFree: false,
            vegan: false,
            badge: 'Fresh Baked',
            addedDate: '2023-10-19',
            tags: ['cookies', 'chocolate', 'snack', 'dessert']
        },
        {
            id: 18,
            name: 'Dark Chocolate Bar',
            category: 'snacks',
            description: 'Premium dark chocolate with 70% cocoa. Rich, intense flavor with antioxidant benefits.',
            price: 3.99,
            originalPrice: 4.99,
            rating: 4.8,
            reviews: 156,
            image: 'https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 18,
            organic: true,
            glutenFree: true,
            vegan: true,
            badge: 'Antioxidants',
            addedDate: '2023-10-14',
            tags: ['chocolate', 'dark', 'snack', 'healthy']
        },

        // Vegetables (3)
        {
            id: 19,
            name: 'Fresh Potatoes',
            category: 'vegetables',
            description: 'Versatile potatoes perfect for boiling, baking, frying, or mashing.',
            price: 3.49,
            originalPrice: null,
            rating: 4.2,
            reviews: 94,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 45,
            organic: false,
            glutenFree: true,
            vegan: true,
            badge: null,
            addedDate: '2023-10-24',
            tags: ['potato', 'vegetable', 'fresh']
        },
        {
            id: 20,
            name: 'Fresh Tomatoes',
            category: 'vegetables',
            description: 'Vine-ripened tomatoes with rich flavor. Perfect for salads, sauces, and cooking.',
            price: 3.99,
            originalPrice: 4.99,
            rating: 4.3,
            reviews: 91,
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 32,
            organic: true,
            glutenFree: true,
            vegan: true,
            badge: 'Sale',
            addedDate: '2023-10-23',
            tags: ['tomato', 'vegetable', 'fresh', 'organic']
        },
        {
            id: 21,
            name: 'Fresh Broccoli',
            category: 'vegetables',
            description: 'Nutrient-packed broccoli with crisp texture. Great for steaming, roasting, or stir-fries.',
            price: 4.49,
            originalPrice: null,
            rating: 4.5,
            reviews: 78,
            image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 26,
            organic: true,
            glutenFree: true,
            vegan: true,
            badge: 'Healthy',
            addedDate: '2023-10-25',
            tags: ['broccoli', 'vegetable', 'healthy', 'organic']
        },

        // Additional Products (3)
        {
            id: 22,
            name: 'Organic Eggs',
            category: 'dairy',
            description: 'Farm-fresh organic eggs from free-range chickens. Rich in protein and nutrients.',
            price: 5.99,
            originalPrice: null,
            rating: 4.6,
            reviews: 145,
            image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 20,
            organic: true,
            glutenFree: true,
            vegan: false,
            badge: 'Organic',
            addedDate: '2023-10-17',
            tags: ['eggs', 'organic', 'dairy', 'protein']
        },
        {
            id: 23,
            name: 'Orange Juice',
            category: 'beverages',
            description: 'Freshly squeezed orange juice, rich in Vitamin C. No added sugars or preservatives.',
            price: 4.49,
            originalPrice: 5.49,
            rating: 4.4,
            reviews: 112,
            image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 18,
            organic: false,
            glutenFree: true,
            vegan: true,
            badge: 'Vitamin C',
            addedDate: '2023-10-19',
            tags: ['juice', 'orange', 'beverage', 'vitamin']
        },
        {
            id: 24,
            name: 'Pasta Spaghetti',
            category: 'pantry',
            description: 'Premium durum wheat spaghetti. Perfect for classic Italian pasta dishes.',
            price: 2.99,
            originalPrice: null,
            rating: 4.3,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            stock: 38,
            organic: false,
            glutenFree: false,
            vegan: true,
            badge: 'Premium',
            addedDate: '2023-10-16',
            tags: ['pasta', 'spaghetti', 'pantry', 'italian']
        }
    ];
}

function getProductById(productId) {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === productId);
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Toast Notification (do not override a unified global toast if present)
if (!(window && typeof window.showToast === 'function')) {
    var showToast = function(message, type = 'success') {
        const container = document.getElementById('notificationContainer');
        
        // Create container if it doesn't exist
        if (!container) {
            const newContainer = document.createElement('div');
            newContainer.id = 'notificationContainer';
            newContainer.className = 'notification-container';
            document.body.appendChild(newContainer);
        }

        const toastContainer = document.getElementById('notificationContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                     type === 'error' ? 'exclamation-circle' : 
                     type === 'warning' ? 'exclamation-triangle' : 'info-circle';

        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 3000);
    };
}

// Form Handlers
function handleSearchSubmit(e) {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';

    if (query) {
        performSearch(query);
    } else {
        displayInitialProducts();
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    displayInitialProducts();
}

function retrySearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    performSearch(query);
}

// Export for global access
window.performSearch = performSearch;
window.clearSearch = clearSearch;
window.retrySearch = retrySearch;
window.selectSuggestion = selectSuggestion;
window.addToCartFromSearch = addToCartFromSearch;
window.toggleWishlistFromSearch = toggleWishlistFromSearch;
window.performRecentSearch = performRecentSearch;

console.log('✅ Search Results initialized with 24 products!');
        