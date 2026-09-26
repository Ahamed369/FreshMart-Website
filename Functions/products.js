// ===== FRESHMART PRODUCTS DATA =====
// Shared product data for all pages

const FRESHMART_PRODUCTS = [
    {
        id: 1, name: 'Artisan Bread', description: 'Traditional artisan bread with crispy crust and soft interior. Baked fresh daily.',
        price: 4.99, originalPrice: 5.99, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'bakery', badge: 'Fresh Daily', stock: 25, weight: '500g', rating: 4.6, reviews: 145,
        organic: false, glutenFree: false, vegan: true, featured: true, popularity: 85, addedDate: '2023-10-20', brand: 'FreshMart Bakery'
    },
    {
        id: 2, name: 'Chocolate Cake', description: 'Rich, moist chocolate cake with creamy frosting. Perfect for celebrations or sweet treats.',
        price: 18.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'bakery', badge: 'Celebration', stock: 8, weight: '1.5kg', rating: 4.9, reviews: 92,
        organic: false, glutenFree: false, vegan: false, featured: true, popularity: 90, addedDate: '2023-10-18', brand: 'FreshMart Bakery'
    },
    {
        id: 3, name: 'French Croissants', description: 'Buttery, flaky French croissants with delicate layers. Perfect for breakfast or snacks.',
        price: 6.99, originalPrice: 7.99, image: '../Images/Croissants.jpg', category: 'bakery', badge: 'Buttery', stock: 15, weight: '200g',
        rating: 4.7, reviews: 178, organic: false, glutenFree: false, vegan: false, featured: false, popularity: 82, addedDate: '2023-10-22', brand: 'FreshMart Bakery'
    },
    {
        id: 4, name: 'Farm Fresh Milk', description: 'Premium whole milk from local farms. Rich and creamy, perfect for cereals, coffee, or drinking.',
        price: 3.49, originalPrice: null, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'dairy', badge: 'Fresh', stock: 12, weight: '1L', rating: 4.3, reviews: 89,
        organic: false, glutenFree: true, vegan: false, featured: true, popularity: 88, addedDate: '2023-10-19', brand: 'Fresh Farms'
    },
    {
        id: 5, name: 'Aged Cheddar Cheese', description: 'Premium aged cheddar with rich, sharp flavor. Perfect for sandwiches, cooking, or cheese boards.',
        price: 8.99, originalPrice: 9.99, image: '../Images/Cheese.jpg', category: 'dairy', badge: 'Sale', stock: 10, weight: '250g',
        rating: 4.8, reviews: 178, organic: false, glutenFree: true, vegan: false, featured: true, popularity: 87, addedDate: '2023-10-12', brand: 'Cheese Masters'
    },
    {
        id: 6, name: 'Greek Yogurt', description: 'Thick, creamy Greek yogurt packed with protein. Perfect for breakfast, snacks, or cooking.',
        price: 5.99, originalPrice: 6.99, image: '../Images/Yogurt.jpg', category: 'dairy', badge: 'High Protein', stock: 20, weight: '500g',
        rating: 4.6, reviews: 112, organic: true, glutenFree: true, vegan: false, featured: false, popularity: 79, addedDate: '2023-10-18', brand: 'Greek Delight'
    },
    {
        id: 7, name: 'Fresh Organic Apples', description: 'Premium organic red apples, crisp and sweet. Perfect for snacking or baking.',
        price: 4.99, originalPrice: 6.99, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'fruits', badge: 'Sale', stock: 35, weight: '1kg', rating: 4.5, reviews: 128,
        organic: true, glutenFree: true, vegan: true, featured: true, popularity: 95, addedDate: '2023-10-15', brand: 'Organic Orchards'
    },
    {
        id: 8, name: 'Fresh Bananas', description: 'Naturally ripened bananas, perfect sweetness and texture. Great source of potassium.',
        price: 2.49, originalPrice: null, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'fruits', badge: 'Popular', stock: 50, weight: '1kg', rating: 4.4, reviews: 156,
        organic: false, glutenFree: true, vegan: true, featured: false, popularity: 84, addedDate: '2023-10-22', brand: 'Tropical Fresh'
    },
    {
        id: 9, name: 'Fresh Mangoes', description: 'Sweet, juicy mangoes packed with vitamins and flavor. Perfect for smoothies or fresh eating.',
        price: 5.99, originalPrice: 7.99, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'fruits', badge: 'Seasonal', stock: 15, weight: '1kg', rating: 4.7, reviews: 89,
        organic: false, glutenFree: true, vegan: true, featured: false, popularity: 78, addedDate: '2023-10-24', brand: 'Exotic Fruits'
    },
    {
        id: 10, name: 'Premium Chicken Breast', description: 'Boneless, skinless chicken breast. Lean protein perfect for healthy meals.',
        price: 12.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'meat', badge: 'Popular', stock: 8, weight: '500g', rating: 4.7, reviews: 203,
        organic: false, glutenFree: true, vegan: false, featured: true, popularity: 92, addedDate: '2023-10-10', brand: "Butcher's Choice"
    },
    {
        id: 11, name: 'Fresh Ground Beef', description: 'Lean ground beef perfect for burgers, meatballs, and pasta dishes. 80% lean, 20% fat.',
        price: 9.99, originalPrice: null, image: '../Images/meat.jpg', category: 'meat', badge: null, stock: 25, weight: '500g',
        rating: 4.4, reviews: 134, organic: false, glutenFree: true, vegan: false, featured: false, popularity: 75, addedDate: '2023-10-17', brand: 'Prime Meats'
    },
    {
        id: 12, name: 'Fresh Salmon Fillet', description: 'Wild-caught salmon fillet rich in omega-3. Perfect for grilling, baking, or pan-searing.',
        price: 18.99, originalPrice: 22.99, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'seafood', badge: 'Omega-3', stock: 6, weight: '400g', rating: 4.9, reviews: 167,
        organic: false, glutenFree: true, vegan: false, featured: true, popularity: 89, addedDate: '2023-10-13', brand: 'Ocean Fresh'
    },
    {
        id: 13, name: 'Basmati Rice', description: 'Premium long-grain basmati rice with delicate aroma. Perfect for biryanis and pilafs.',
        price: 6.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'pantry', badge: 'Premium', stock: 30, weight: '1kg', rating: 4.4, reviews: 87,
        organic: false, glutenFree: true, vegan: true, featured: false, popularity: 72, addedDate: '2023-10-16', brand: 'Golden Grains'
    },
    {
        id: 14, name: 'All-Purpose Flour', description: 'High-quality all-purpose flour perfect for baking bread, cakes, and pastries.',
        price: 4.49, originalPrice: 4.99, image: '../Images/Flour.jpg', category: 'pantry', badge: 'Sale', stock: 40, weight: '1kg',
        rating: 4.3, reviews: 73, organic: false, glutenFree: false, vegan: true, featured: false, popularity: 68, addedDate: '2023-10-21', brand: "Baker's Best"
    },
    {
        id: 15, name: 'Pure Cane Sugar', description: 'Natural pure cane sugar for sweetening beverages, baking, and cooking.',
        price: 3.99, originalPrice: null, image: '../Images/Sugar.jpg', category: 'pantry', badge: 'Offer', stock: 35, weight: '1kg',
        rating: 4.2, reviews: 64, organic: false, glutenFree: true, vegan: true, featured: false, popularity: 65, addedDate: '2023-10-23', brand: 'Sweet Harvest'
    },
    {
        id: 16, name: 'Butter Popcorn', description: 'Classic butter popcorn perfect for movie nights and snacking. Light, fluffy, and delicious.',
        price: 3.25, originalPrice: 4.00, image: '../Images/Popcorn.jpg', category: 'snacks', badge: 'Save 19%', stock: 28, weight: '200g',
        rating: 4.6, reviews: 234, organic: false, glutenFree: true, vegan: false, featured: false, popularity: 80, addedDate: '2023-10-20', brand: 'Snack Time'
    },
    {
        id: 17, name: 'Chocolate Chip Cookies', description: 'Soft, chewy chocolate chip cookies loaded with real chocolate chips. Baked fresh daily.',
        price: 4.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'snacks', badge: 'Fresh Baked', stock: 22, weight: '300g', rating: 4.7, reviews: 189,
        organic: false, glutenFree: false, vegan: false, featured: false, popularity: 83, addedDate: '2023-10-19', brand: 'Cookie Jar'
    },
    {
        id: 18, name: 'Dark Chocolate Bar', description: 'Premium dark chocolate with 70% cocoa. Rich, intense flavor with antioxidant benefits.',
        price: 3.99, originalPrice: 4.99, image: 'https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'snacks', badge: 'Antioxidants', stock: 18, weight: '100g', rating: 4.8, reviews: 156,
        organic: true, glutenFree: true, vegan: true, featured: false, popularity: 77, addedDate: '2023-10-14', brand: 'Chocolate Heaven'
    },
    {
        id: 19, name: 'Fresh Potatoes', description: 'Versatile potatoes perfect for boiling, baking, frying, or mashing.',
        price: 3.49, originalPrice: null, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'vegetables', badge: null, stock: 45, weight: '1kg', rating: 4.2, reviews: 94,
        organic: false, glutenFree: true, vegan: true, featured: false, popularity: 70, addedDate: '2023-10-24', brand: 'Farm Fresh'
    },
    {
        id: 20, name: 'Fresh Tomatoes', description: 'Vine-ripened tomatoes with rich flavor. Perfect for salads, sauces, and cooking.',
        price: 3.99, originalPrice: 4.99, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'vegetables', badge: 'Sale', stock: 32, weight: '500g', rating: 4.3, reviews: 91,
        organic: true, glutenFree: true, vegan: true, featured: false, popularity: 71, addedDate: '2023-10-23', brand: 'Garden Fresh'
    },
    {
        id: 21, name: 'Fresh Broccoli', description: 'Nutrient-packed broccoli with crisp texture. Great for steaming, roasting, or stir-fries.',
        price: 4.49, originalPrice: null, image: '../Images/Broccoli.jpg', category: 'vegetables', badge: 'Healthy', stock: 26, weight: '500g',
        rating: 4.5, reviews: 78, organic: true, glutenFree: true, vegan: false, featured: false, popularity: 74, addedDate: '2023-10-25', brand: 'Green Valley'
    },
    {
        id: 22, name: 'Energy Soft Drink', description: 'Energizing soft drink with natural caffeine. Great for study sessions and late nights.',
        price: 5.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'beverages', badge: 'Energetic', stock: 20, weight: '400ml', rating: 4.6, reviews: 145,
        organic: true, glutenFree: true, vegan: false, featured: false, popularity: 81, addedDate: '2023-10-17', brand: 'Energy Boost'
    },
    {
        id: 23, name: 'Orange Juice', description: 'Freshly squeezed orange juice, rich in Vitamin C. No added sugars or preservatives.',
        price: 4.49, originalPrice: 5.49, image: 'https://images.unsplash.com/photo-1550235273-ceeef3c5b06f?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600',
        category: 'beverages', badge: 'Vitamin C', stock: 18, weight: '1L', rating: 4.4, reviews: 112,
        organic: false, glutenFree: true, vegan: true, featured: true, popularity: 82, addedDate: '2023-10-19', brand: 'Fresh Squeeze'
    },
    {
        id: 24, name: 'Sparkling Soda', description: 'Refreshing sparkling soda in various flavors. Perfect carbonation for a crisp, clean taste.',
        price: 2.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1613510656581-8bf7ad6fc392?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170',
        category: 'beverages', badge: 'Refreshing', stock: 38, weight: '500ml', rating: 4.3, reviews: 89,
        organic: false, glutenFree: false, vegan: true, featured: false, popularity: 68, addedDate: '2023-10-16', brand: 'Fizzy Drinks'
    }
];

// Make products globally available
window.getStoreProducts = function() {
    return FRESHMART_PRODUCTS;
};

window.getProductById = function(id) {
    const productId = parseInt(id);
    return FRESHMART_PRODUCTS.find(product => product.id === productId);
};

console.log('✅ Products data loaded:', FRESHMART_PRODUCTS.length, 'products');