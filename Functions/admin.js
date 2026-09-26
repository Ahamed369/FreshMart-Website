// FreshMart Admin Dashboard - Complete Enhanced Functionality

// Global State
let adminState = {
    currentSection: 'dashboard',
    currentAction: {
        products: 'add',
        users: 'add',
        orders: 'view',
        reports: 'sales'
    },
    products: [],
    users: [],
    orders: [],
    activities: [],
    selectedItems: {
        products: [],
        users: [],
        orders: []
    },
    charts: {},
    editItem: null
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    loadSampleData();
    initializeEventListeners();
    initializeCharts();
});

// Initialize Admin Dashboard
function initializeAdmin() {
    console.log('🔄 FreshMart Admin initialized');
    
    // Set current date for forms
    const now = new Date();
    const localDateTime = now.toISOString().slice(0, 16);
    
    // Update admin navigation
    updateAdminNav();
    
    // Show dashboard by default
    showSection('dashboard');
    
    // Initialize tooltips
    initializeTooltips();
}

// Load Sample Data
function loadSampleData() {
    // Sample products
    adminState.products = [
        {
            id: 1,
            name: 'Organic Apples',
            category: 'fruits',
            price: 4.99,
            stock: 50,
            description: 'Fresh organic apples from local farms',
            image: 'https://via.placeholder.com/200x200?text=Apples',
            status: 'active',
            sku: 'FRUIT-001',
            createdAt: '2024-10-01'
        },
        {
            id: 2,
            name: 'Fresh Bananas',
            category: 'fruits',
            price: 2.99,
            stock: 100,
            description: 'Ripe yellow bananas, perfect for smoothies',
            image: 'https://via.placeholder.com/200x200?text=Bananas',
            status: 'active',
            sku: 'FRUIT-002',
            createdAt: '2024-10-05'
        },
        {
            id: 3,
            name: 'Tomatoes',
            category: 'vegetables',
            price: 3.49,
            stock: 8,
            description: 'Vine-ripened tomatoes, great for salads',
            image: 'https://via.placeholder.com/200x200?text=Tomatoes',
            status: 'active',
            sku: 'VEG-001',
            createdAt: '2024-10-08'
        },
        {
            id: 4,
            name: 'Organic Milk',
            category: 'dairy',
            price: 5.99,
            stock: 25,
            description: 'Fresh organic milk from grass-fed cows',
            image: 'https://via.placeholder.com/200x200?text=Milk',
            status: 'inactive',
            sku: 'DAIRY-001',
            createdAt: '2024-10-10'
        }
    ];

    // Sample users
    adminState.users = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '555-0101',
            role: 'customer',
            status: 'active',
            registered: '2024-01-15',
            orders: 12,
            totalSpent: 345.67
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            phone: '555-0102',
            role: 'customer',
            status: 'active',
            registered: '2024-01-20',
            orders: 8,
            totalSpent: 234.50
        },
        {
            id: 3,
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob@example.com',
            phone: '555-0103',
            role: 'admin',
            status: 'active',
            registered: '2024-01-10',
            orders: 0,
            totalSpent: 0
        },
        {
            id: 4,
            firstName: 'Alice',
            lastName: 'Williams',
            email: 'alice@example.com',
            phone: '555-0104',
            role: 'staff',
            status: 'inactive',
            registered: '2024-01-25',
            orders: 5,
            totalSpent: 123.45
        }
    ];

    // Sample orders
    adminState.orders = [
        {
            id: 'ORD-7842',
            customerId: 1,
            customerName: 'John Doe',
            date: '2024-10-08 14:30:00',
            items: 5,
            total: 45.99,
            status: 'delivered',
            itemsDetail: [
                { productId: 1, name: 'Organic Apples', quantity: 2, price: 4.99 },
                { productId: 3, name: 'Tomatoes', quantity: 3, price: 3.49 }
            ]
        },
        {
            id: 'ORD-7843',
            customerId: 2,
            customerName: 'Jane Smith',
            date: '2024-10-09 10:15:00',
            items: 3,
            total: 28.50,
            status: 'processing',
            itemsDetail: [
                { productId: 2, name: 'Fresh Bananas', quantity: 1, price: 2.99 },
                { productId: 1, name: 'Organic Apples', quantity: 2, price: 4.99 }
            ]
        },
        {
            id: 'ORD-7844',
            customerId: 1,
            customerName: 'John Doe',
            date: '2024-10-10 16:45:00',
            items: 4,
            total: 32.75,
            status: 'pending',
            itemsDetail: [
                { productId: 4, name: 'Organic Milk', quantity: 2, price: 5.99 },
                { productId: 2, name: 'Fresh Bananas', quantity: 2, price: 2.99 }
            ]
        },
        {
            id: 'ORD-7845',
            customerId: 3,
            customerName: 'Bob Johnson',
            date: '2024-10-11 09:30:00',
            items: 1,
            total: 4.99,
            status: 'cancelled',
            itemsDetail: [
                { productId: 1, name: 'Organic Apples', quantity: 1, price: 4.99 }
            ]
        }
    ];

    // Update all lists
    updateProductLists();
    updateUserLists();
    updateOrderLists();
    
    // Initialize activities
    adminState.activities = [
        {
            id: 1,
            type: 'order',
            action: 'placed',
            message: 'New order #ORD-7842 placed',
            amount: '$45.99',
            timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
            icon: 'fas fa-shopping-cart',
            iconClass: 'success',
            section: 'orders'
        },
        {
            id: 2,
            type: 'user',
            action: 'registered',
            message: 'New user registered: John Doe',
            amount: 'Customer',
            timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            icon: 'fas fa-user',
            iconClass: 'info',
            section: 'users'
        },
        {
            id: 3,
            type: 'product',
            action: 'low_stock',
            message: 'Low stock alert: Organic Apples',
            amount: '8 left',
            timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
            icon: 'fas fa-box',
            iconClass: 'warning',
            section: 'products'
        },
        {
            id: 4,
            type: 'order',
            action: 'refund',
            message: 'Refund processed: #REF-4561',
            amount: '-$25.50',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            icon: 'fas fa-undo',
            iconClass: 'danger',
            section: 'orders'
        }
    ];
    
    // Update statistics
    updateDashboardStats();
    
    // Render activities
    renderActivities();
}

// Render Recent Activities
function renderActivities() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    // Sort by timestamp descending
    const sortedActivities = adminState.activities.sort((a, b) => b.timestamp - a.timestamp);
    
    activityList.innerHTML = sortedActivities.slice(0, 20).map(activity => `
        <div class="activity-item" onclick="showSection('${activity.section}')">
            <div class="activity-icon ${activity.iconClass}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span>${formatTimestamp(activity.timestamp)}</span>
            </div>
            <div class="activity-amount">${activity.amount}</div>
        </div>
    `).join('');
}

// Add Recent Activity
function addRecentActivity(type, action, message, amount = '', section = type + 's') {
    const activity = {
        id: Date.now(),
        type,
        action,
        message,
        amount,
        timestamp: new Date(),
        icon: getActivityIcon(type, action),
        iconClass: getActivityIconClass(action),
        section
    };
    
    adminState.activities.unshift(activity);
    
    // Keep only last 50 activities
    if (adminState.activities.length > 50) {
        adminState.activities = adminState.activities.slice(0, 50);
    }
    
    renderActivities();
}

// Get Activity Icon
function getActivityIcon(type, action) {
    const icons = {
        product: {
            add: 'fas fa-plus-circle',
            edit: 'fas fa-edit',
            delete: 'fas fa-trash',
            stock: 'fas fa-boxes',
            status: 'fas fa-toggle-on',
            low_stock: 'fas fa-exclamation-triangle'
        },
        user: {
            add: 'fas fa-user-plus',
            edit: 'fas fa-user-edit',
            delete: 'fas fa-user-times',
            status: 'fas fa-user-slash'
        },
        order: {
            add: 'fas fa-shopping-cart',
            edit: 'fas fa-edit',
            delete: 'fas fa-trash',
            status: 'fas fa-sync-alt',
            placed: 'fas fa-shopping-cart',
            refund: 'fas fa-undo'
        },
        report: {
            view: 'fas fa-chart-bar',
            export: 'fas fa-download'
        }
    };
    
    return icons[type]?.[action] || 'fas fa-info-circle';
}

// Get Activity Icon Class
function getActivityIconClass(action) {
    const classes = {
        add: 'success',
        edit: 'info',
        delete: 'danger',
        status: 'warning',
        stock: 'warning',
        low_stock: 'warning',
        placed: 'success',
        refund: 'danger',
        view: 'primary',
        export: 'primary'
    };
    
    return classes[action] || 'info';
}

// Format Timestamp
function formatTimestamp(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Clear Recent Activity
function clearRecentActivity() {
    if (confirm('Are you sure you want to clear all recent activities?')) {
        adminState.activities = [];
        renderActivities();
        showToast('Recent activities cleared', 'info');
    }
}

// Export Activity
function exportActivity() {
    const data = adminState.activities.map(activity => ({
        Date: activity.timestamp.toLocaleString(),
        Type: activity.type,
        Action: activity.action,
        Message: activity.message,
        Amount: activity.amount
    }));
    
    const csv = 'data:text/csv;charset=utf-8,' + 
        'Date,Type,Action,Message,Amount\n' + 
        data.map(row => Object.values(row).map(v => `"${v}"`).join(',')).join('\n');
    
    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'recent_activity.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Activity exported successfully', 'success');
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Admin navigation buttons
    const adminNavBtns = document.querySelectorAll('.admin-nav-btn');
    adminNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // Management cards
    const managementCards = document.querySelectorAll('.management-card');
    managementCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this.id);
        });
    });

    // Price adjustment buttons
    const priceBtns = document.querySelectorAll('.price-btn');
    priceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('pressed');
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 150);
        });
    });

    // File upload area
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImageUpload(file);
            }
        });
    }

    // Image file input
    const imageFileInput = document.getElementById('productImageFile');
    if (imageFileInput) {
        imageFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleImageUpload(file);
            }
        });
    }

    // Select all checkboxes
    const selectAllProducts = document.getElementById('selectAllProducts');
    if (selectAllProducts) {
        selectAllProducts.addEventListener('change', function() {
            toggleSelectAll('products', this.checked);
        });
    }

    const selectAllUsers = document.getElementById('selectAllUsers');
    if (selectAllUsers) {
        selectAllUsers.addEventListener('change', function() {
            toggleSelectAll('users', this.checked);
        });
    }
}

// Initialize Tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

// Initialize Charts
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        adminState.charts.sales = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Product Chart
    const productCtx = document.getElementById('productChart');
    if (productCtx) {
        adminState.charts.product = new Chart(productCtx, {
            type: 'bar',
            data: {
                labels: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [4500, 3200, 2800, 2100, 1800],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(33, 150, 243, 0.7)',
                        'rgba(156, 39, 176, 0.7)',
                        'rgba(255, 152, 0, 0.7)',
                        'rgba(244, 67, 54, 0.7)'
                    ],
                    borderColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#9C27B0',
                        '#FF9800',
                        '#F44336'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // User Chart
    const userCtx = document.getElementById('userChart');
    if (userCtx) {
        adminState.charts.user = new Chart(userCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'New Users',
                    data: [120, 150, 180, 200, 220, 250, 280, 300, 320, 350],
                    borderColor: '#9C27B0',
                    backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Order Chart
    const orderCtx = document.getElementById('orderChart');
    if (orderCtx) {
        adminState.charts.order = new Chart(orderCtx, {
            type: 'doughnut',
            data: {
                labels: ['Delivered', 'Processing', 'Pending', 'Cancelled'],
                datasets: [{
                    data: [65, 20, 10, 5],
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FF9800',
                        '#F44336'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// Update Admin Navigation
function updateAdminNav() {
    const navBtns = document.querySelectorAll('.admin-nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === adminState.currentSection) {
            btn.classList.add('active');
        }
    });
}

// Section Navigation
function showSection(sectionName) {
    adminState.currentSection = sectionName;
    
    // Update navigation
    updateAdminNav();
    
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update URL without reload
        history.pushState(null, '', `#${sectionName}`);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show notification
        const sectionNames = {
            'dashboard': 'Dashboard',
            'products': 'Product Management',
            'users': 'User Management',
            'orders': 'Order Management',
            'reports': 'Reports & Analytics'
        };
        
        showToast(`Navigated to ${sectionNames[sectionName]}`, 'info');
    }
}

// Product Management Functions
function showProductAction(action) {
    adminState.currentAction.products = action;
    
    // Hide all product action panels
    const panels = document.querySelectorAll('#products-section .action-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected action panel
    const targetPanel = document.getElementById(action + '-product-content');
    if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Update data if needed
        if (action === 'edit' || action === 'delete' || action === 'manage' || action === 'stock' || action === 'status') {
            updateProductLists();
        }
        
        showToast(`Product ${action} mode activated`, 'info');
    }
}

// Adjust Price
function adjustPrice(change) {
    const priceInput = document.getElementById('productPrice');
    if (priceInput) {
        let currentValue = parseFloat(priceInput.value) || 0;
        let newValue = currentValue + change;
        
        if (newValue < 0.01) newValue = 0.01;
        
        priceInput.value = newValue.toFixed(2);
        
        // Add animation
        priceInput.classList.add('changed');
        setTimeout(() => {
            priceInput.classList.remove('changed');
        }, 300);
    }
}

// Adjust Bulk Stock
function adjustBulkStock(change) {
    const stockInput = document.getElementById('stockAdjustment');
    if (stockInput) {
        let currentValue = parseInt(stockInput.value) || 0;
        let newValue = currentValue + change;
        
        // Limit to reasonable range
        if (newValue < -999) newValue = -999;
        if (newValue > 999) newValue = 999;
        
        stockInput.value = newValue;
        
        // Add animation
        stockInput.classList.add('changed');
        setTimeout(() => {
            stockInput.classList.remove('changed');
        }, 300);
    }
}

// Handle Image Upload
function handleImageUpload(file) {
    showLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
        showLoading(false);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadArea = document.getElementById('uploadArea');
            uploadArea.innerHTML = `
                <div class="image-preview">
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="btn-remove-preview" onclick="removeImagePreview()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p>${file.name}</p>
                <p class="file-size">${(file.size / 1024).toFixed(2)} KB</p>
            `;
        };
        reader.readAsDataURL(file);
        
        showToast('Image uploaded successfully!', 'success');
    }, 2000);
}

// Remove Image Preview
function removeImagePreview() {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag & drop or click to upload</p>
        <button type="button" class="btn btn-outline" onclick="document.getElementById('productImageFile').click()">Choose File</button>
    `;
}

// Handle Modal Image Upload
function handleModalImageUpload(file) {
    showLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
        showLoading(false);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadArea = document.getElementById('modalUploadArea');
            uploadArea.innerHTML = `
                <div class="image-preview">
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="btn-remove-preview" onclick="removeModalImagePreview()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p>${file.name}</p>
                <p class="file-size">${(file.size / 1024).toFixed(2)} KB</p>
            `;
        };
        reader.readAsDataURL(file);
        
        showToast('Image uploaded successfully!', 'success');
    }, 2000);
}

// Remove Modal Image Preview
function removeModalImagePreview() {
    const uploadArea = document.getElementById('modalUploadArea');
    uploadArea.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag & drop or click to upload</p>
        <input type="file" id="modalProductImageFile" name="productImageFile" accept="image/*" hidden>
        <button type="button" class="btn btn-outline" onclick="document.getElementById('modalProductImageFile').click()">Choose File</button>
    `;
}

// Handle Add Product
function handleAddProduct(formData) {
    showLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        const newProduct = {
            id: adminState.products.length + 1,
            name: formData.get('productName'),
            category: formData.get('productCategory'),
            price: parseFloat(formData.get('productPrice')),
            stock: parseInt(formData.get('productStock')),
            stockStatus: formData.get('stockStatus'),
            description: formData.get('productDescription'),
            image: formData.get('productImageUrl') || 'https://via.placeholder.com/200x200?text=Product',
            status: 'active',
            sku: 'PROD-' + (adminState.products.length + 1001),
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        adminState.products.push(newProduct);
        updateProductLists();
        updateDashboardStats();
        
        // Add recent activity
        addRecentActivity('product', 'add', `Product "${newProduct.name}" added to store`, `$${newProduct.price.toFixed(2)}`);
        
        resetProductForm();
        
        showLoading(false);
        showToast('Product added successfully!', 'success');
        
        // Add success animation
        const form = document.getElementById('addProductForm');
        form.classList.add('success-animation');
        setTimeout(() => {
            form.classList.remove('success-animation');
        }, 1000);
    }, 1500);
}

// Update Product Lists
function updateProductLists() {
    // Update edit products list
    updateEditProductsList();
    
    // Update delete products grid
    updateDeleteProductsGrid();
    
    // Update products table
    updateProductsTable();
    
    // Update stock products grid
    updateStockProductsGrid();
    
    // Update status products grid
    updateStatusProductsGrid();
    
    // Update top products in reports
    updateTopProductsList();
}

function updateEditProductsList() {
    const editList = document.getElementById('editProductsList');
    if (editList) {
        editList.innerHTML = adminState.products.map(product => `
            <div class="list-item" onclick="openEditModal('product', ${product.id})">
                <img src="${product.image}" alt="${product.name}" class="list-item-img">
                <div class="list-item-content">
                    <h4>${product.name}</h4>
                    <p class="list-item-subtext">
                        <span class="badge">${product.category}</span>
                        <span>$${product.price.toFixed(2)}</span>
                        <span>Stock: ${product.stock}</span>
                    </p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openEditModal('product', ${product.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function updateDeleteProductsGrid() {
    const deleteGrid = document.getElementById('deleteProductsGrid');
    if (deleteGrid) {
        deleteGrid.innerHTML = adminState.products.map(product => `
            <div class="delete-item ${adminState.selectedItems.products.includes(product.id) ? 'selected' : ''}" 
                 onclick="toggleProductSelection(${product.id})">
                <div class="delete-item-header">
                    <input type="checkbox" class="delete-checkbox" ${adminState.selectedItems.products.includes(product.id) ? 'checked' : ''}>
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <p>SKU: ${product.sku}</p>
                    </div>
                </div>
                <p class="delete-item-description">${product.description}</p>
                <div class="delete-item-details">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <span>Stock: ${product.stock}</span>
                    <span class="status ${product.status}">${product.status}</span>
                </div>
            </div>
        `).join('');
        
        // Update delete button state
        const deleteBtn = document.querySelector('#deleteActions .btn-danger');
        if (deleteBtn) {
            deleteBtn.disabled = adminState.selectedItems.products.length === 0;
        }
    }
}

function updateProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    if (tableBody) {
        tableBody.innerHTML = adminState.products.map(product => `
            <tr>
                <td><input type="checkbox" class="select-product" value="${product.id}"></td>
                <td>
                    <div class="product-cell">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <strong>${product.name}</strong>
                            <small>${product.sku}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge category">${product.category}</span>
                </td>
                <td>
                    <strong>$${product.price.toFixed(2)}</strong>
                </td>
                <td>
                    <div class="stock-cell">
                        <span class="stock-count">${product.stock}</span>
                        ${product.stock < 10 ? '<span class="low-stock">Low</span>' : ''}
                    </div>
                </td>
                <td>
                    <span class="status-badge ${product.status}">${product.status}</span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="openEditModal('product', ${product.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function updateStockProductsGrid() {
    const stockGrid = document.getElementById('stockProductsGrid');
    if (stockGrid) {
        stockGrid.innerHTML = adminState.products.map(product => `
            <div class="stock-item ${adminState.selectedItems.products.includes(product.id) ? 'selected' : ''}" 
                 onclick="toggleProductSelection(${product.id})">
                <input type="checkbox" class="stock-checkbox" ${adminState.selectedItems.products.includes(product.id) ? 'checked' : ''}>
                <img src="${product.image}" alt="${product.name}">
                <div class="stock-item-info">
                    <h4>${product.name}</h4>
                    <p>Current Stock: <strong>${product.stock}</strong></p>
                    <div class="stock-adjustment">
                        <button class="btn-sm" onclick="event.stopPropagation(); adjustProductStock(${product.id}, -1)">-</button>
                        <input type="number" value="${product.stock}" min="0" 
                               onchange="updateProductStock(${product.id}, this.value)">
                        <button class="btn-sm" onclick="event.stopPropagation(); adjustProductStock(${product.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateStatusProductsGrid() {
    const statusGrid = document.getElementById('statusProductsGrid');
    if (statusGrid) {
        statusGrid.innerHTML = adminState.products.map(product => `
            <div class="status-item ${adminState.selectedItems.products.includes(product.id) ? 'selected' : ''}" 
                 onclick="toggleProductSelection(${product.id})">
                <input type="checkbox" class="status-checkbox" ${adminState.selectedItems.products.includes(product.id) ? 'checked' : ''}>
                <img src="${product.image}" alt="${product.name}">
                <div class="status-item-info">
                    <h4>${product.name}</h4>
                    <div class="status-toggle-small">
                        <button class="btn-status ${product.status === 'active' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateProductStatus(${product.id}, 'active')">
                            Active
                        </button>
                        <button class="btn-status ${product.status === 'inactive' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateProductStatus(${product.id}, 'inactive')">
                            Inactive
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Product Selection
function toggleProductSelection(productId) {
    const index = adminState.selectedItems.products.indexOf(productId);
    if (index > -1) {
        adminState.selectedItems.products.splice(index, 1);
    } else {
        adminState.selectedItems.products.push(productId);
    }
    
    updateDeleteProductsGrid();
    updateStockProductsGrid();
    updateStatusProductsGrid();
    
    if (adminState.selectedItems.products.length > 0) {
        showToast(`${adminState.selectedItems.products.length} product(s) selected`, 'info');
    }
}

function toggleSelectAll(type, checked) {
    if (type === 'products') {
        if (checked) {
            adminState.selectedItems.products = adminState.products.map(p => p.id);
        } else {
            adminState.selectedItems.products = [];
        }
        updateProductLists();
    } else if (type === 'users') {
        if (checked) {
            adminState.selectedItems.users = adminState.users.map(u => u.id);
        } else {
            adminState.selectedItems.users = [];
        }
        updateUserLists();
    }
}

// Product Operations
function deleteSelectedProducts() {
    if (adminState.selectedItems.products.length === 0) {
        showToast('Please select products to delete', 'warning');
        return;
    }
    
    openConfirmationModal(
        'Delete Products',
        `Are you sure you want to delete ${adminState.selectedItems.products.length} product(s)? This action cannot be undone.`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                const deletedCount = adminState.selectedItems.products.length;
                adminState.products = adminState.products.filter(
                    product => !adminState.selectedItems.products.includes(product.id)
                );
                
                adminState.selectedItems.products = [];
                updateProductLists();
                updateDashboardStats();
                
                // Add recent activity
                addRecentActivity('product', 'delete', `${deletedCount} product(s) deleted from store`);
                
                showLoading(false);
                showToast('Products deleted successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function applyBulkStockUpdate() {
    const adjustment = parseInt(document.getElementById('stockAdjustment').value) || 0;
    
    if (adjustment === 0) {
        showToast('Please enter a valid adjustment value', 'warning');
        return;
    }
    
    if (adminState.selectedItems.products.length === 0) {
        showToast('Please select products to update', 'warning');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        adminState.products.forEach(product => {
            if (adminState.selectedItems.products.includes(product.id)) {
                product.stock = Math.max(0, product.stock + adjustment);
            }
        });
        
        updateProductLists();
        showLoading(false);
        showToast(`Stock updated for ${adminState.selectedItems.products.length} product(s)`, 'success');
        
        // Reset adjustment
        document.getElementById('stockAdjustment').value = 0;
    }, 1500);
}

function setBulkStatus(status) {
    if (adminState.selectedItems.products.length === 0) {
        showToast('Please select products to update', 'warning');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        adminState.products.forEach(product => {
            if (adminState.selectedItems.products.includes(product.id)) {
                product.status = status;
            }
        });
        
        updateProductLists();
        showLoading(false);
        showToast(`Status updated for ${adminState.selectedItems.products.length} product(s)`, 'success');
    }, 1500);
}

// User Management Functions
function showUserAction(action) {
    adminState.currentAction.users = action;
    
    // Hide all user action panels
    const panels = document.querySelectorAll('#users-section .action-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected action panel
    const targetPanel = document.getElementById(action + '-user-content');
    if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Update data if needed
        if (action === 'edit' || action === 'delete' || action === 'manage' || action === 'status') {
            updateUserLists();
        }
        
        showToast(`User ${action} mode activated`, 'info');
    }
}

// Handle Add User
function handleAddUser(formData) {
    showLoading(true);
    
    setTimeout(() => {
        const newUser = {
            id: adminState.users.length + 1,
            firstName: formData.get('userFirstName'),
            lastName: formData.get('userLastName'),
            email: formData.get('userEmail'),
            phone: formData.get('userPhone'),
            role: formData.get('userRole'),
            status: formData.get('userStatus'),
            password: formData.get('userPassword'),
            registered: new Date().toISOString().split('T')[0],
            orders: 0,
            totalSpent: 0
        };
        
        adminState.users.push(newUser);
        updateUserLists();
        updateDashboardStats();
        
        // Add recent activity
        addRecentActivity('user', 'add', `User "${newUser.firstName} ${newUser.lastName}" registered`, newUser.role);
        
        resetUserForm();
        
        showLoading(false);
        showToast('User added successfully!', 'success');
        
        // Add success animation
        const form = document.getElementById('addUserForm');
        form.classList.add('success-animation');
        setTimeout(() => {
            form.classList.remove('success-animation');
        }, 1000);
    }, 1500);
}

// Update User Lists
function updateUserLists() {
    // Similar implementation to product lists
    // Update edit users list
    updateEditUsersList();
    
    // Update delete users grid
    updateDeleteUsersGrid();
    
    // Update users table
    updateUsersTable();
    
    // Update status users grid
    updateStatusUsersGrid();
}

function updateEditUsersList() {
    const editList = document.getElementById('editUsersList');
    if (editList) {
        editList.innerHTML = adminState.users.map(user => `
            <div class="list-item" onclick="openEditModal('user', ${user.id})">
                <div class="user-avatar">
                    ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                </div>
                <div class="list-item-content">
                    <h4>${user.firstName} ${user.lastName}</h4>
                    <p class="list-item-subtext">
                        <span>${user.email}</span>
                        <span class="badge role">${user.role}</span>
                    </p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openEditModal('user', ${user.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function updateDeleteUsersGrid() {
    const deleteGrid = document.getElementById('deleteUsersGrid');
    if (deleteGrid) {
        deleteGrid.innerHTML = adminState.users.map(user => `
            <div class="delete-item ${adminState.selectedItems.users.includes(user.id) ? 'selected' : ''}" 
                 onclick="toggleUserSelection(${user.id})">
                <div class="delete-item-header">
                    <input type="checkbox" class="delete-checkbox" ${adminState.selectedItems.users.includes(user.id) ? 'checked' : ''}>
                    <div class="user-avatar">
                        ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                    </div>
                    <div>
                        <h4>${user.firstName} ${user.lastName}</h4>
                        <p>${user.email}</p>
                    </div>
                </div>
                <div class="delete-item-details">
                    <span class="role ${user.role}">${user.role}</span>
                    <span>Orders: ${user.orders}</span>
                    <span class="status ${user.status}">${user.status}</span>
                </div>
            </div>
        `).join('');
        
        // Update delete button state
        const deleteBtn = document.querySelector('#deleteUserActions .btn-danger');
        if (deleteBtn) {
            deleteBtn.disabled = adminState.selectedItems.users.length === 0;
        }
    }
}

function updateUsersTable() {
    const tableBody = document.getElementById('usersTableBody');
    if (tableBody) {
        tableBody.innerHTML = adminState.users.map(user => `
            <tr>
                <td><input type="checkbox" class="select-user" value="${user.id}"></td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar small">
                            ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                        </div>
                        <div>
                            <strong>${user.firstName} ${user.lastName}</strong>
                            <small>${user.phone}</small>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <span class="badge role ${user.role}">${user.role}</span>
                </td>
                <td>
                    <span class="status-badge ${user.status}">${user.status}</span>
                </td>
                <td>${user.registered}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="openEditModal('user', ${user.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger" onclick="deleteUser(${user.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function updateStatusUsersGrid() {
    const statusGrid = document.getElementById('statusUsersGrid');
    if (statusGrid) {
        statusGrid.innerHTML = adminState.users.map(user => `
            <div class="status-item ${adminState.selectedItems.users.includes(user.id) ? 'selected' : ''}" 
                 onclick="toggleUserSelection(${user.id})">
                <input type="checkbox" class="status-checkbox" ${adminState.selectedItems.users.includes(user.id) ? 'checked' : ''}>
                <div class="user-avatar">
                    ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                </div>
                <div class="status-item-info">
                    <h4>${user.firstName} ${user.lastName}</h4>
                    <p>${user.email}</p>
                    <div class="status-toggle-small">
                        <button class="btn-status ${user.status === 'active' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateUserStatus(${user.id}, 'active')">
                            Active
                        </button>
                        <button class="btn-status ${user.status === 'inactive' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateUserStatus(${user.id}, 'inactive')">
                            Inactive
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// User Operations
function toggleUserSelection(userId) {
    const index = adminState.selectedItems.users.indexOf(userId);
    if (index > -1) {
        adminState.selectedItems.users.splice(index, 1);
    } else {
        adminState.selectedItems.users.push(userId);
    }
    
    updateDeleteUsersGrid();
    updateStatusUsersGrid();
    
    if (adminState.selectedItems.users.length > 0) {
        showToast(`${adminState.selectedItems.users.length} user(s) selected`, 'info');
    }
}

function deleteSelectedUsers() {
    if (adminState.selectedItems.users.length === 0) {
        showToast('Please select users to delete', 'warning');
        return;
    }
    
    openConfirmationModal(
        'Delete Users',
        `Are you sure you want to delete ${adminState.selectedItems.users.length} user(s)? This action cannot be undone.`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                const deletedCount = adminState.selectedItems.users.length;
                adminState.users = adminState.users.filter(
                    user => !adminState.selectedItems.users.includes(user.id)
                );
                
                adminState.selectedItems.users = [];
                updateUserLists();
                updateDashboardStats();
                
                // Add recent activity
                addRecentActivity('user', 'delete', `${deletedCount} user(s) deleted from system`);
                
                showLoading(false);
                showToast('Users deleted successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function setBulkUserStatus(status) {
    if (adminState.selectedItems.users.length === 0) {
        showToast('Please select users to update', 'warning');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        adminState.users.forEach(user => {
            if (adminState.selectedItems.users.includes(user.id)) {
                user.status = status;
            }
        });
        
        updateUserLists();
        showLoading(false);
        showToast(`Status updated for ${adminState.selectedItems.users.length} user(s)`, 'success');
    }, 1500);
}

// Order Management Functions
function showOrderAction(action) {
    adminState.currentAction.orders = action;
    
    // Hide all order action panels
    const panels = document.querySelectorAll('#orders-section .action-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected action panel
    const targetPanel = document.getElementById(action + '-order-content');
    if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Update data if needed
        if (action === 'view' || action === 'edit' || action === 'delete' || action === 'status') {
            updateOrderLists();
        }
        
        showToast(`Order ${action} mode activated`, 'info');
    }
}

// Update Order Lists
function updateOrderLists() {
    // Update view orders table
    updateOrdersTable();
    
    // Update edit orders list
    updateEditOrdersList();
    
    // Update delete orders grid
    updateDeleteOrdersGrid();
    
    // Update status orders grid
    updateStatusOrdersGrid();
    
    // Update order chart
    updateOrderChart();
}

function updateOrdersTable() {
    const tableBody = document.getElementById('ordersTableBody');
    if (tableBody) {
        const searchTerm = document.getElementById('viewOrderSearch')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('orderStatusFilter')?.value || '';
        
        const filteredOrders = adminState.orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchTerm) ||
                                order.customerName.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
        
        tableBody.innerHTML = filteredOrders.map(order => `
            <tr>
                <td>
                    <strong>${order.id}</strong>
                </td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar small">
                            ${order.customerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <strong>${order.customerName}</strong>
                            <small>Customer ID: ${order.customerId}</small>
                        </div>
                    </div>
                </td>
                <td>${order.date.split(' ')[0]}</td>
                <td>${order.items}</td>
                <td>
                    <strong>$${order.total.toFixed(2)}</strong>
                </td>
                <td>
                    <span class="status-badge ${order.status}">${order.status}</span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="openEditModal('order', '${order.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="updateOrderStatus('${order.id}', 'processing')">
                            <i class="fas fa-truck"></i>
                        </button>
                        <button class="btn-icon danger" onclick="cancelOrder('${order.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function updateEditOrdersList() {
    const editList = document.getElementById('editOrdersList');
    if (editList) {
        editList.innerHTML = adminState.orders.map(order => `
            <div class="list-item" onclick="openEditModal('order', '${order.id}')">
                <div class="order-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <div class="list-item-content">
                    <h4>Order ${order.id}</h4>
                    <p class="list-item-subtext">
                        <span>${order.customerName}</span>
                        <span>${order.date.split(' ')[0]}</span>
                        <span>$${order.total.toFixed(2)}</span>
                    </p>
                </div>
                <div class="list-item-actions">
                    <span class="status-badge ${order.status}">${order.status}</span>
                    <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openEditModal('order', '${order.id}')">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function updateDeleteOrdersGrid() {
    const deleteGrid = document.getElementById('deleteOrdersGrid');
    if (deleteGrid) {
        deleteGrid.innerHTML = adminState.orders.map(order => `
            <div class="delete-item ${adminState.selectedItems.orders.includes(order.id) ? 'selected' : ''}" 
                 onclick="toggleOrderSelection('${order.id}')">
                <div class="delete-item-header">
                    <input type="checkbox" class="delete-checkbox" ${adminState.selectedItems.orders.includes(order.id) ? 'checked' : ''}>
                    <div class="order-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <div>
                        <h4>Order ${order.id}</h4>
                        <p>${order.customerName}</p>
                    </div>
                </div>
                <div class="delete-item-details">
                    <span class="date">${order.date.split(' ')[0]}</span>
                    <span class="total">$${order.total.toFixed(2)}</span>
                    <span class="status ${order.status}">${order.status}</span>
                </div>
            </div>
        `).join('');
        
        // Update delete button state
        const deleteBtn = document.querySelector('#deleteOrderActions .btn-danger');
        const cancelBtn = document.querySelector('#deleteOrderActions .btn-warning');
        if (deleteBtn && cancelBtn) {
            deleteBtn.disabled = adminState.selectedItems.orders.length === 0;
            cancelBtn.disabled = adminState.selectedItems.orders.length === 0;
        }
    }
}

function updateStatusOrdersGrid() {
    const statusGrid = document.getElementById('statusOrdersGrid');
    if (statusGrid) {
        statusGrid.innerHTML = adminState.orders.map(order => `
            <div class="status-item ${adminState.selectedItems.orders.includes(order.id) ? 'selected' : ''}" 
                 onclick="toggleOrderSelection('${order.id}')">
                <input type="checkbox" class="status-checkbox" ${adminState.selectedItems.orders.includes(order.id) ? 'checked' : ''}>
                <div class="order-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <div class="status-item-info">
                    <h4>Order ${order.id}</h4>
                    <div class="status-toggle-small">
                        <button class="btn-status ${order.status === 'pending' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateOrderStatus('${order.id}', 'pending')">
                            Pending
                        </button>
                        <button class="btn-status ${order.status === 'processing' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateOrderStatus('${order.id}', 'processing')">
                            Processing
                        </button>
                        <button class="btn-status ${order.status === 'delivered' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateOrderStatus('${order.id}', 'delivered')">
                            Delivered
                        </button>
                        <button class="btn-status ${order.status === 'cancelled' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); updateOrderStatus('${order.id}', 'cancelled')">
                            Cancelled
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Order Operations
function toggleOrderSelection(orderId) {
    const index = adminState.selectedItems.orders.indexOf(orderId);
    if (index > -1) {
        adminState.selectedItems.orders.splice(index, 1);
    } else {
        adminState.selectedItems.orders.push(orderId);
    }
    
    updateDeleteOrdersGrid();
    updateStatusOrdersGrid();
    
    if (adminState.selectedItems.orders.length > 0) {
        showToast(`${adminState.selectedItems.orders.length} order(s) selected`, 'info');
    }
}

function deleteSelectedOrders() {
    if (adminState.selectedItems.orders.length === 0) {
        showToast('Please select orders to delete', 'warning');
        return;
    }
    
    openConfirmationModal(
        'Delete Orders',
        `Are you sure you want to delete ${adminState.selectedItems.orders.length} order(s)? This action cannot be undone.`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                const deletedCount = adminState.selectedItems.orders.length;
                adminState.orders = adminState.orders.filter(
                    order => !adminState.selectedItems.orders.includes(order.id)
                );
                
                adminState.selectedItems.orders = [];
                updateOrderLists();
                updateDashboardStats();
                
                // Add recent activity
                addRecentActivity('order', 'delete', `${deletedCount} order(s) deleted from system`);
                
                showLoading(false);
                showToast('Orders deleted successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function cancelSelectedOrders() {
    if (adminState.selectedItems.orders.length === 0) {
        showToast('Please select orders to cancel', 'warning');
        return;
    }
    
    openConfirmationModal(
        'Cancel Orders',
        `Are you sure you want to cancel ${adminState.selectedItems.orders.length} order(s)?`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                adminState.orders.forEach(order => {
                    if (adminState.selectedItems.orders.includes(order.id)) {
                        order.status = 'cancelled';
                    }
                });
                
                adminState.selectedItems.orders = [];
                updateOrderLists();
                
                showLoading(false);
                showToast('Orders cancelled successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function updateBulkOrderStatus() {
    const newStatus = document.getElementById('bulkOrderStatus').value;
    
    if (adminState.selectedItems.orders.length === 0) {
        showToast('Please select orders to update', 'warning');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        adminState.orders.forEach(order => {
            if (adminState.selectedItems.orders.includes(order.id)) {
                order.status = newStatus;
            }
        });
        
        adminState.selectedItems.orders = [];
        updateOrderLists();
        
        showLoading(false);
        showToast(`Order status updated to ${newStatus}`, 'success');
    }, 1500);
}

// Reports Functions
function showReportAction(action) {
    adminState.currentAction.reports = action;
    
    // Hide all report panels
    const panels = document.querySelectorAll('#reports-section .action-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected report panel
    const targetPanel = document.getElementById(action + '-report-content');
    if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Update report data
        updateReport(action);
        
        // Add recent activity
        addRecentActivity('report', 'view', `${action.charAt(0).toUpperCase() + action.slice(1)} report viewed`);
        
        showToast(`${action.charAt(0).toUpperCase() + action.slice(1)} Report loaded`, 'info');
    }
}

function updateReport(reportType) {
    switch(reportType) {
        case 'sales':
            updateSalesChart();
            break;
        case 'product':
            updateProductReport();
            break;
        case 'user':
            updateUserReport();
            break;
        case 'order':
            updateOrderReport();
            break;
    }
}

function updateSalesChart() {
    if (adminState.charts.sales) {
        // Update chart based on selected period
        const period = document.getElementById('salesPeriod').value;
        const chartType = document.getElementById('salesChartType').value;
        
        // Update chart type if changed
        adminState.charts.sales.config.type = chartType;
        
        // Simulate data update based on period
        let data;
        switch(period) {
            case 'today':
                data = [1200, 800, 1500, 900, 1800, 2100, 2500];
                break;
            case 'week':
                data = [3200, 2800, 3500, 4200, 3800, 4500, 5200];
                break;
            case 'month':
                data = [12000, 13500, 14200, 15600, 14800, 16200, 17500];
                break;
            case 'quarter':
                data = [45000, 52000, 58000, 62000];
                break;
            case 'year':
                data = [180000, 195000, 210000, 225000, 240000, 255000, 270000, 285000, 300000, 315000, 330000, 345000];
                break;
        }
        
        adminState.charts.sales.data.datasets[0].data = data;
        adminState.charts.sales.update();
        
        // Update total
        const total = data.reduce((a, b) => a + b, 0);
        document.getElementById('salesTotal').textContent = `$${total.toLocaleString()}`;
    }
}

function updateProductReport() {
    updateTopProductsList();
    
    if (adminState.charts.product) {
        const categoryFilter = document.getElementById('productCategoryFilter').value;
        
        // Filter data based on category
        let filteredProducts = adminState.products;
        if (categoryFilter) {
            filteredProducts = adminState.products.filter(p => p.category === categoryFilter);
        }
        
        // Update chart with filtered data
        // (In a real app, you would fetch actual sales data per category)
        adminState.charts.product.update();
    }
}

function updateTopProductsList() {
    const topList = document.getElementById('topProductsList');
    if (topList) {
        // Sort products by sales (using stock as proxy for demo)
        const topProducts = [...adminState.products]
            .sort((a, b) => (b.price * b.stock) - (a.price * a.stock))
            .slice(0, 5);
        
        topList.innerHTML = topProducts.map((product, index) => `
            <div class="top-product-item">
                <span class="rank">${index + 1}</span>
                <img src="${product.image}" alt="${product.name}">
                <div class="top-product-info">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)} • ${product.stock} in stock</p>
                </div>
                <span class="sales">$${(product.price * product.stock).toFixed(2)}</span>
            </div>
        `).join('');
    }
}

function updateUserReport() {
    if (adminState.charts.user) {
        const period = document.getElementById('userReportPeriod').value;
        
        // Update user statistics
        const newUsers = period === 'month' ? 156 : period === 'quarter' ? 420 : 1560;
        const activeUsers = period === 'month' ? 1245 : period === 'quarter' ? 3580 : 12450;
        const userOrders = period === 'month' ? 3456 : period === 'quarter' ? 10200 : 34560;
        const userRevenue = period === 'month' ? 45678 : period === 'quarter' ? 135000 : 456780;
        
        document.getElementById('newUsers').textContent = newUsers;
        document.getElementById('activeUsers').textContent = activeUsers;
        document.getElementById('userOrders').textContent = userOrders.toLocaleString();
        document.getElementById('userRevenue').textContent = `$${userRevenue.toLocaleString()}`;
        
        adminState.charts.user.update();
    }
}

function updateOrderReport() {
    if (adminState.charts.order) {
        const period = document.getElementById('orderReportPeriod').value;
        
        // Update order statistics based on period
        const stats = {
            pending: period === 'week' ? 23 : period === 'month' ? 45 : 120,
            processing: period === 'week' ? 45 : period === 'month' ? 120 : 450,
            delivered: period === 'week' ? 1180 : period === 'month' ? 2450 : 11800,
            cancelled: period === 'week' ? 12 : period === 'month' ? 25 : 120
        };
        
        document.getElementById('pendingOrders').textContent = stats.pending;
        document.getElementById('processingOrders').textContent = stats.processing;
        document.getElementById('deliveredOrders').textContent = stats.delivered.toLocaleString();
        document.getElementById('cancelledOrders').textContent = stats.cancelled;
        
        // Update chart data
        adminState.charts.order.data.datasets[0].data = [
            stats.delivered,
            stats.processing,
            stats.pending,
            stats.cancelled
        ];
        adminState.charts.order.update();
    }
}

function updateOrderChart() {
    if (adminState.charts.order) {
        // Calculate order status distribution
        const statusCount = {
            delivered: 0,
            processing: 0,
            pending: 0,
            cancelled: 0
        };
        
        adminState.orders.forEach(order => {
            statusCount[order.status]++;
        });
        
        adminState.charts.order.data.datasets[0].data = [
            statusCount.delivered,
            statusCount.processing,
            statusCount.pending,
            statusCount.cancelled
        ];
        adminState.charts.order.update();
    }
}

// Export Functions
function exportProducts() {
    showLoading(true);
    
    setTimeout(() => {
        const csv = convertToCSV(adminState.products);
        downloadCSV(csv, 'freshmart-products.csv');
        showLoading(false);
        showToast('Products exported successfully!', 'success');
    }, 1000);
}

function exportUsers() {
    showLoading(true);
    
    setTimeout(() => {
        const csv = convertToCSV(adminState.users);
        downloadCSV(csv, 'freshmart-users.csv');
        showLoading(false);
        showToast('Users exported successfully!', 'success');
    }, 1000);
}

function exportOrders() {
    showLoading(true);
    
    setTimeout(() => {
        const csv = convertToCSV(adminState.orders);
        downloadCSV(csv, 'freshmart-orders.csv');
        showLoading(false);
        showToast('Orders exported successfully!', 'success');
    }, 1000);
}

function exportReport(reportType) {
    showLoading(true);
    
    setTimeout(() => {
        let data, filename;
        switch(reportType) {
            case 'sales':
                data = adminState.orders;
                filename = 'sales-report.csv';
                break;
            case 'product':
                data = adminState.products;
                filename = 'product-report.csv';
                break;
            case 'user':
                data = adminState.users;
                filename = 'user-report.csv';
                break;
            case 'order':
                data = adminState.orders;
                filename = 'order-report.csv';
                break;
        }
        
        const csv = convertToCSV(data);
        downloadCSV(csv, filename);
        showLoading(false);
        showToast('Report exported successfully!', 'success');
        
        // Add recent activity
        addRecentActivity('report', 'export', `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report exported`);
    }, 1000);
}

// Utility Functions
function updateDashboardStats() {
    // Calculate totals
    const totalRevenue = adminState.orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = adminState.orders.length;
    const totalUsers = adminState.users.length;
    const totalProducts = adminState.products.length;
    
    // Update display
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
    document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
    document.getElementById('totalUsers').textContent = totalUsers.toLocaleString();
    document.getElementById('totalProducts').textContent = totalProducts.toLocaleString();
}

function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    switch (formId) {
        case 'addProductForm':
            handleAddProduct(formData);
            break;
        case 'addUserForm':
            handleAddUser(formData);
            break;
        // Add other forms as needed
    }
}

// Modal Functions
function openConfirmationModal(title, message, confirmCallback) {
    const modal = document.getElementById('confirmationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const confirmBtn = document.getElementById('confirmAction');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    // Update confirm button callback
    confirmBtn.onclick = function() {
        confirmCallback();
    };
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('confirmationModal').classList.remove('show');
}

function openEditModal(type, id) {
    adminState.editItem = { type, id };
    
    const modal = document.getElementById('editModal');
    const modalTitle = document.getElementById('editModalTitle');
    const modalBody = document.getElementById('editModalBody');
    
    let item;
    if (type === 'product') {
        item = adminState.products.find(p => p.id === id);
        modalTitle.textContent = `Edit Product: ${item.name}`;
        modalBody.innerHTML = `
            <form class="edit-form" id="editProductForm">
                <div class="form-group">
                    <label for="editProductName">Product Name</label>
                    <input type="text" id="editProductName" value="${item.name}" required>
                </div>
                <div class="form-group">
                    <label for="editProductPrice">Price ($)</label>
                    <input type="number" id="editProductPrice" value="${item.price}" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="editProductStock">Stock</label>
                    <input type="number" id="editProductStock" value="${item.stock}" required>
                </div>
                <div class="form-group">
                    <label for="editProductStatus">Status</label>
                    <select id="editProductStatus">
                        <option value="active" ${item.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="inactive" ${item.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </div>
            </form>
        `;
    } else if (type === 'user') {
        item = adminState.users.find(u => u.id === id);
        modalTitle.textContent = `Edit User: ${item.firstName} ${item.lastName}`;
        modalBody.innerHTML = `
            <form class="edit-form" id="editUserForm">
                <div class="form-group">
                    <label for="editUserFirstName">First Name</label>
                    <input type="text" id="editUserFirstName" value="${item.firstName}" required>
                </div>
                <div class="form-group">
                    <label for="editUserLastName">Last Name</label>
                    <input type="text" id="editUserLastName" value="${item.lastName}" required>
                </div>
                <div class="form-group">
                    <label for="editUserEmail">Email</label>
                    <input type="email" id="editUserEmail" value="${item.email}" required>
                </div>
                <div class="form-group">
                    <label for="editUserRole">Role</label>
                    <select id="editUserRole">
                        <option value="customer" ${item.role === 'customer' ? 'selected' : ''}>Customer</option>
                        <option value="staff" ${item.role === 'staff' ? 'selected' : ''}>Staff</option>
                        <option value="admin" ${item.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editUserStatus">Status</label>
                    <select id="editUserStatus">
                        <option value="active" ${item.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="inactive" ${item.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </div>
            </form>
        `;
    } else if (type === 'order') {
        item = adminState.orders.find(o => o.id === id);
        modalTitle.textContent = `Edit Order: ${item.id}`;
        modalBody.innerHTML = `
            <div class="order-details">
                <div class="detail-item">
                    <strong>Customer:</strong> ${item.customerName}
                </div>
                <div class="detail-item">
                    <strong>Date:</strong> ${item.date}
                </div>
                <div class="detail-item">
                    <strong>Total:</strong> $${item.total.toFixed(2)}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong>
                    <select id="editOrderStatus">
                        <option value="pending" ${item.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${item.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="delivered" ${item.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${item.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
                <div class="detail-item">
                    <strong>Items:</strong>
                    <ul>
                        ${item.itemsDetail.map(item => `
                            <li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    modal.classList.add('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
    adminState.editItem = null;
}

// Add Product Modal Functions
function openAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.add('show');
    resetAddProductModal();
    
    // Add event listeners for image upload
    const uploadArea = document.getElementById('modalUploadArea');
    const imageFileInput = document.getElementById('modalProductImageFile');
    
    if (uploadArea && imageFileInput) {
        // Remove existing listeners
        const newUploadArea = uploadArea.cloneNode(true);
        const newImageFileInput = imageFileInput.cloneNode(true);
        
        uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
        imageFileInput.parentNode.replaceChild(newImageFileInput, imageFileInput);
        
        // Add new listeners
        newUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        newUploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        newUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleModalImageUpload(file);
            }
        });
        
        newImageFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleModalImageUpload(file);
            }
        });
    }
}

function closeAddProductModal() {
    document.getElementById('addProductModal').classList.remove('show');
    resetAddProductModal();
}

function resetAddProductModal() {
    const form = document.getElementById('addProductModalForm');
    if (form) {
        form.reset();
        // Reset image preview
        const uploadArea = document.getElementById('modalUploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop or click to upload</p>
                <input type="file" id="modalProductImageFile" name="productImageFile" accept="image/*" hidden>
                <button type="button" class="btn btn-outline" onclick="document.getElementById('modalProductImageFile').click()">Choose File</button>
            `;
        }
    }
}

function submitAddProductModal() {
    const form = document.getElementById('addProductModalForm');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        handleAddProduct(formData);
        closeAddProductModal();
    } else {
        showToast('Please fill in all required fields', 'warning');
    }
}

// Add User Modal Functions
function openAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.classList.add('show');
    resetAddUserModal();
}

function closeAddUserModal() {
    document.getElementById('addUserModal').classList.remove('show');
    resetAddUserModal();
}

function resetAddUserModal() {
    const form = document.getElementById('addUserModalForm');
    if (form) {
        form.reset();
    }
}

function submitAddUserModal() {
    const form = document.getElementById('addUserModalForm');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        handleAddUser(formData);
        closeAddUserModal();
    } else {
        showToast('Please fill in all required fields', 'warning');
    }
}

// Modal Helper Functions
function adjustModalPrice(change) {
    const priceInput = document.getElementById('modalProductPrice');
    if (priceInput) {
        let currentValue = parseFloat(priceInput.value) || 0;
        let newValue = currentValue + change;
        
        if (newValue < 0.01) newValue = 0.01;
        
        priceInput.value = newValue.toFixed(2);
        
        // Add animation
        priceInput.classList.add('changed');
        setTimeout(() => {
            priceInput.classList.remove('changed');
        }, 300);
    }
}

function toggleModalPasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function saveEdit() {
    const { type, id } = adminState.editItem;
    
    showLoading(true);
    
    setTimeout(() => {
        if (type === 'product') {
            const product = adminState.products.find(p => p.id === id);
            if (product) {
                product.name = document.getElementById('editProductName').value;
                product.price = parseFloat(document.getElementById('editProductPrice').value);
                product.stock = parseInt(document.getElementById('editProductStock').value);
                product.status = document.getElementById('editProductStatus').value;
            }
        } else if (type === 'user') {
            const user = adminState.users.find(u => u.id === id);
            if (user) {
                user.firstName = document.getElementById('editUserFirstName').value;
                user.lastName = document.getElementById('editUserLastName').value;
                user.email = document.getElementById('editUserEmail').value;
                user.role = document.getElementById('editUserRole').value;
                user.status = document.getElementById('editUserStatus').value;
            }
        } else if (type === 'order') {
            const order = adminState.orders.find(o => o.id === id);
            if (order) {
                order.status = document.getElementById('editOrderStatus').value;
            }
        }
        
        updateProductLists();
        updateUserLists();
        updateOrderLists();
        
        showLoading(false);
        showToast('Changes saved successfully!', 'success');
        closeEditModal();
    }, 1000);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageEl = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');
    
    if (toast && messageEl) {
        // Update message and icon
        messageEl.textContent = message;
        
        // Update icon based on type
        switch(type) {
            case 'success':
                icon.className = 'fas fa-check-circle';
                break;
            case 'error':
                icon.className = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                icon.className = 'fas fa-exclamation-triangle';
                break;
            case 'info':
                icon.className = 'fas fa-info-circle';
                break;
        }
        
        // Update toast class
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
}

// Loading Overlay
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }
}

// Utility Functions
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function resetProductForm() {
    const form = document.getElementById('addProductForm');
    if (form) {
        form.reset();
        // Reset image preview
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop or click to upload</p>
                <button type="button" class="btn btn-outline" onclick="document.getElementById('productImageFile').click()">Choose File</button>
            `;
        }
    }
}

function resetUserForm() {
    const form = document.getElementById('addUserForm');
    if (form) {
        form.reset();
    }
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Filter Functions
function filterProductsTable() {
    const searchTerm = document.getElementById('manageProductSearch')?.value.toLowerCase() || '';
    const rows = document.querySelectorAll('#productsTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterUsersTable() {
    const searchTerm = document.getElementById('manageUserSearch')?.value.toLowerCase() || '';
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterOrdersTable() {
    updateOrdersTable(); // Already handles filtering
}

// Search Functions
function searchProducts() {
    const searchTerm = document.getElementById('editProductSearch')?.value.toLowerCase() || '';
    const items = document.querySelectorAll('#editProductsList .list-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function searchUsers() {
    const searchTerm = document.getElementById('editUserSearch')?.value.toLowerCase() || '';
    const items = document.querySelectorAll('#editUsersList .list-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function searchOrders() {
    const searchTerm = document.getElementById('editOrderSearch')?.value.toLowerCase() || '';
    const items = document.querySelectorAll('#editOrdersList .list-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Individual Operations
function deleteProduct(id) {
    const product = adminState.products.find(p => p.id === id);
    if (!product) return;
    
    openConfirmationModal(
        'Delete Product',
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                adminState.products = adminState.products.filter(p => p.id !== id);
                updateProductLists();
                updateDashboardStats();
                
                showLoading(false);
                showToast('Product deleted successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function deleteUser(id) {
    const user = adminState.users.find(u => u.id === id);
    if (!user) return;
    
    openConfirmationModal(
        'Delete User',
        `Are you sure you want to delete "${user.firstName} ${user.lastName}"? This action cannot be undone.`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                adminState.users = adminState.users.filter(u => u.id !== id);
                updateUserLists();
                updateDashboardStats();
                
                showLoading(false);
                showToast('User deleted successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function cancelOrder(id) {
    const order = adminState.orders.find(o => o.id === id);
    if (!order) return;
    
    openConfirmationModal(
        'Cancel Order',
        `Are you sure you want to cancel order "${id}"?`,
        function() {
            showLoading(true);
            
            setTimeout(() => {
                order.status = 'cancelled';
                updateOrderLists();
                
                showLoading(false);
                showToast('Order cancelled successfully!', 'success');
                closeModal();
            }, 1500);
        }
    );
}

function updateProductStock(id, stock) {
    const product = adminState.products.find(p => p.id === id);
    if (product) {
        product.stock = parseInt(stock) || 0;
        updateProductLists();
        showToast('Stock updated', 'success');
    }
}

function adjustProductStock(id, change) {
    const product = adminState.products.find(p => p.id === id);
    if (product) {
        product.stock = Math.max(0, product.stock + change);
        updateProductLists();
        showToast('Stock adjusted', 'success');
    }
}

function updateProductStatus(id, status) {
    const product = adminState.products.find(p => p.id === id);
    if (product) {
        product.status = status;
        updateProductLists();
        showToast('Product status updated', 'success');
    }
}

function updateUserStatus(id, status) {
    const user = adminState.users.find(u => u.id === id);
    if (user) {
        user.status = status;
        updateUserLists();
        showToast('User status updated', 'success');
    }
}

function updateOrderStatus(id, status) {
    const order = adminState.orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        updateOrderLists();
        showToast('Order status updated', 'success');
    }
}

function generateReport(type) {
    showLoading(true);
    
    setTimeout(() => {
        exportReport(type);
    }, 1000);
}

// Make functions globally accessible
window.showSection = showSection;
window.showProductAction = showProductAction;
window.showUserAction = showUserAction;
window.showOrderAction = showOrderAction;
window.showReportAction = showReportAction;
window.adjustPrice = adjustPrice;
window.adjustBulkStock = adjustBulkStock;
window.handleImageUpload = handleImageUpload;
window.removeImagePreview = removeImagePreview;
window.toggleProductSelection = toggleProductSelection;
window.toggleUserSelection = toggleUserSelection;
window.toggleOrderSelection = toggleOrderSelection;
window.deleteSelectedProducts = deleteSelectedProducts;
window.deleteSelectedUsers = deleteSelectedUsers;
window.deleteSelectedOrders = deleteSelectedOrders;
window.cancelSelectedOrders = cancelSelectedOrders;
window.applyBulkStockUpdate = applyBulkStockUpdate;
window.setBulkStatus = setBulkStatus;
window.setBulkUserStatus = setBulkUserStatus;
window.updateBulkOrderStatus = updateBulkOrderStatus;
window.exportProducts = exportProducts;
window.exportUsers = exportUsers;
window.exportOrders = exportOrders;
window.exportReport = exportReport;
window.generateReport = generateReport;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.saveEdit = saveEdit;
window.resetProductForm = resetProductForm;
window.resetUserForm = resetUserForm;
window.togglePasswordVisibility = togglePasswordVisibility;
window.filterProductsTable = filterProductsTable;
window.filterUsersTable = filterUsersTable;
window.filterOrdersTable = filterOrdersTable;
window.searchProducts = searchProducts;
window.searchUsers = searchUsers;
window.searchOrders = searchOrders;
window.deleteProduct = deleteProduct;
window.deleteUser = deleteUser;
window.cancelOrder = cancelOrder;
window.updateProductStock = updateProductStock;
window.adjustProductStock = adjustProductStock;
window.updateProductStatus = updateProductStatus;
window.updateUserStatus = updateUserStatus;
window.updateOrderStatus = updateOrderStatus;
window.updateSalesChart = updateSalesChart;
window.updateProductReport = updateProductReport;
window.updateUserReport = updateUserReport;
window.updateOrderReport = updateOrderReport;

// Add Modal Functions
window.openAddProductModal = openAddProductModal;
window.closeAddProductModal = closeAddProductModal;
window.submitAddProductModal = submitAddProductModal;
window.openAddUserModal = openAddUserModal;
window.closeAddUserModal = closeAddUserModal;
window.submitAddUserModal = submitAddUserModal;
window.adjustModalPrice = adjustModalPrice;
window.toggleModalPasswordVisibility = toggleModalPasswordVisibility;
window.handleModalImageUpload = handleModalImageUpload;
window.removeModalImagePreview = removeModalImagePreview;
window.renderActivities = renderActivities;
window.addRecentActivity = addRecentActivity;
window.clearRecentActivity = clearRecentActivity;
window.exportActivity = exportActivity;

console.log('🎯 FreshMart Admin Dashboard loaded successfully!');