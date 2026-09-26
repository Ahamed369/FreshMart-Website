// Complete Enhanced Product JavaScript for FreshMart
document.addEventListener('DOMContentLoaded', function () {
    initializeProductPage();
    initializeNotifications();
    initializeStockManagement();
    initializePromotionSystem();
});

// Enhanced Product Data with All 24 Products
const allProductsData = {
    // Fruits Category (3 products)
    1: {
        id: 1,
        name: 'Fresh Organic Apples',
        category: 'fruits',
        description: 'Premium organic red apples, crisp and sweet. Perfect for snacking or baking. Rich in fiber and antioxidants.',
        fullDescription: 'Our premium organic red apples are carefully selected from the best local orchards. Each apple is crisp, juicy, and packed with natural sweetness. Perfect for eating fresh, adding to salads, or using in your favorite baked recipes. These apples are certified organic and grown without synthetic pesticides or fertilizers.',
        price: 4.99,
        originalPrice: 6.99,
        images: ['../images/products/apple.jpg', '../images/products/apple-2.jpg', '../images/products/apple-3.jpg'],
        badge: 'Sale',
        stock: 45,
        rating: 4.5,
        reviews: 128,
        organic: true,
        glutenFree: true,
        vegan: true,
        weightOptions: ['500g', '1kg', '1.5kg', '2kg', 'Custom Weight'],
        features: ['Certified Organic', 'Locally Grown', 'Rich in Fiber', 'No Artificial Additives'],
        nutrition: {
            servingSize: '100g',
            calories: 52,
            totalFat: '0.2g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '1mg',
            totalCarbohydrate: '14g',
            dietaryFiber: '2.4g',
            totalSugars: '10g',
            protein: '0.3g',
            vitaminC: '7%',
            potassium: '107mg'
        },
        storage: 'Store in a cool, dry place. Refrigerate for longer freshness.',
        origin: 'Local Farm, California',
        shelfLife: '1-2 weeks',
        promotionEnd: '2024-12-31',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'University Branch', 'Downtown Market'],
        ratingBreakdown: { 5: 80, 4: 35, 3: 10, 2: 2, 1: 1 },
        tags: ['organic', 'fruit', 'healthy', 'snack']
    },
    2: {
        id: 2,
        name: 'Fresh Bananas',
        category: 'fruits',
        description: 'Naturally ripened bananas, perfect sweetness and texture. Great source of potassium and energy.',
        fullDescription: 'Our bananas are naturally ripened to perfection, offering the ideal balance of sweetness and texture. They are an excellent source of potassium, vitamin B6, and natural energy. Perfect for eating fresh, adding to smoothies, or using in baking recipes.',
        price: 2.49,
        originalPrice: null,
        images: ['../images/products/banana.jpg', '../images/products/banana-2.jpg'],
        badge: 'Popular',
        stock: 78,
        rating: 4.4,
        reviews: 156,
        organic: false,
        glutenFree: true,
        vegan: true,
        weightOptions: ['1kg', '1.5kg', '2kg', '3kg', 'Custom Weight'],
        features: ['Rich in Potassium', 'Natural Energy Source', 'Perfect Ripeness', 'Versatile Usage'],
        nutrition: {
            servingSize: '100g',
            calories: 89,
            totalFat: '0.3g',
            saturatedFat: '0.1g',
            cholesterol: '0mg',
            sodium: '1mg',
            totalCarbohydrate: '23g',
            dietaryFiber: '2.6g',
            totalSugars: '12g',
            protein: '1.1g',
            vitaminC: '14%',
            potassium: '358mg'
        },
        storage: 'Store at room temperature. Refrigerate when ripe.',
        origin: 'Ecuador',
        shelfLife: '3-5 days',
        promotionEnd: null,
        limitedStock: true,
        preOrder: false,
        newProduct: true,
        comboPack: false,
        deliveryTime: '1 day',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 100, 4: 45, 3: 8, 2: 2, 1: 1 },
        tags: ['fruit', 'energy', 'potassium']
    },
    3: {
        id: 3,
        name: 'Fresh Mangoes',
        category: 'fruits',
        description: 'Sweet, juicy mangoes packed with vitamins and flavor. Perfect for smoothies, desserts, or fresh eating.',
        fullDescription: 'Our premium mangoes are selected at peak ripeness for maximum sweetness and flavor. Each mango is juicy, fragrant, and packed with essential vitamins and antioxidants. Perfect for eating fresh, blending into smoothies, or using in tropical desserts.',
        price: 5.99,
        originalPrice: 7.99,
        images: ['../images/products/mango.jpg', '../images/products/mango-2.jpg'],
        badge: 'Seasonal',
        stock: 23,
        rating: 4.7,
        reviews: 89,
        organic: true,
        glutenFree: true,
        vegan: true,
        weightOptions: ['500g', '1kg', '2kg', 'Custom Weight'],
        features: ['Seasonal Selection', 'Rich in Vitamin C', 'Sweet and Juicy', 'Antioxidant Rich'],
        nutrition: {
            servingSize: '100g',
            calories: 60,
            totalFat: '0.4g',
            saturatedFat: '0.1g',
            cholesterol: '0mg',
            sodium: '1mg',
            totalCarbohydrate: '15g',
            dietaryFiber: '1.6g',
            totalSugars: '14g',
            protein: '0.8g',
            vitaminC: '60%',
            vitaminA: '20%'
        },
        storage: 'Store at room temperature until ripe, then refrigerate.',
        origin: 'Mexico',
        shelfLife: '4-7 days',
        promotionEnd: '2024-08-31',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'Downtown Market'],
        ratingBreakdown: { 5: 65, 4: 20, 3: 3, 2: 1, 1: 0 },
        tags: ['seasonal', 'tropical', 'vitamin-c']
    },
    // Vegetables Category (3 products)
    4: {
        id: 4,
        name: 'Fresh Potatoes',
        category: 'vegetables',
        description: 'Versatile potatoes perfect for boiling, baking, frying, or mashing. Rich in carbohydrates and potassium.',
        fullDescription: 'Our fresh potatoes are versatile and perfect for all your cooking needs. Whether you prefer them boiled, baked, fried, or mashed, these potatoes deliver excellent texture and flavor. They are a great source of complex carbohydrates and essential nutrients.',
        price: 3.49,
        originalPrice: null,
        images: ['../images/products/potato.jpg', '../images/products/potato-2.jpg'],
        badge: 'Kitchen Essential',
        stock: 67,
        rating: 4.2,
        reviews: 94,
        organic: false,
        glutenFree: true,
        vegan: true,
        weightOptions: ['1kg', '2kg', '5kg', 'Custom Weight'],
        features: ['Versatile Cooking', 'Rich in Potassium', 'Long Shelf Life', 'Kitchen Essential'],
        nutrition: {
            servingSize: '100g',
            calories: 77,
            totalFat: '0.1g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '6mg',
            totalCarbohydrate: '17g',
            dietaryFiber: '2.2g',
            totalSugars: '0.8g',
            protein: '2g',
            vitaminC: '24%',
            potassium: '421mg'
        },
        storage: 'Store in a cool, dark, well-ventilated place.',
        origin: 'Idaho, USA',
        shelfLife: '2-3 months',
        promotionEnd: null,
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'University Branch', 'Downtown Market'],
        ratingBreakdown: { 5: 60, 4: 25, 3: 7, 2: 1, 1: 1 },
        tags: ['vegetable', 'staple', 'versatile']
    },
    5: {
        id: 5,
        name: 'Fresh Tomatoes',
        category: 'vegetables',
        description: 'Vine-ripened tomatoes with rich flavor. Perfect for salads, sauces, and cooking. High in lycopene and vitamin C.',
        fullDescription: 'Our vine-ripened tomatoes are grown for maximum flavor and nutritional value. Each tomato is juicy, flavorful, and perfect for salads, sandwiches, sauces, or cooking. They are rich in lycopene, an antioxidant linked to many health benefits.',
        price: 3.99,
        originalPrice: 4.99,
        images: ['../images/products/tomato.jpg', '../images/products/tomato-2.jpg'],
        badge: 'Sale',
        stock: 42,
        rating: 4.3,
        reviews: 91,
        organic: true,
        glutenFree: true,
        vegan: true,
        weightOptions: ['500g', '1kg', '1.5kg', 'Custom Weight'],
        features: ['Vine-Ripened', 'Rich in Lycopene', 'Juicy and Flavorful', 'Versatile Usage'],
        nutrition: {
            servingSize: '100g',
            calories: 18,
            totalFat: '0.2g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '5mg',
            totalCarbohydrate: '3.9g',
            dietaryFiber: '1.2g',
            totalSugars: '2.6g',
            protein: '0.9g',
            vitaminC: '28%',
            vitaminA: '20%'
        },
        storage: 'Store at room temperature away from direct sunlight.',
        origin: 'Local Greenhouse',
        shelfLife: '5-7 days',
        promotionEnd: '2024-11-30',
        limitedStock: true,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1 day',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 55, 4: 30, 3: 5, 2: 1, 1: 0 },
        tags: ['vegetable', 'fresh', 'salad']
    },
    6: {
        id: 6,
        name: 'Fresh Broccoli',
        category: 'vegetables',
        description: 'Nutrient-packed broccoli with crisp texture. Great for steaming, roasting, or adding to stir-fries.',
        fullDescription: 'Our fresh broccoli is packed with essential nutrients and offers a satisfying crisp texture. Perfect for steaming, roasting, stir-frying, or eating raw in salads. It is an excellent source of vitamins C and K, and contains powerful antioxidants.',
        price: 4.49,
        originalPrice: null,
        images: ['../images/products/broccoli.jpg', '../images/products/broccoli-2.jpg'],
        badge: 'Healthy',
        stock: 35,
        rating: 4.5,
        reviews: 78,
        organic: true,
        glutenFree: true,
        vegan: true,
        weightOptions: ['300g', '500g', '1kg', 'Custom Weight'],
        features: ['Nutrient Dense', 'Rich in Vitamin C', 'Antioxidant Properties', 'Versatile Cooking'],
        nutrition: {
            servingSize: '100g',
            calories: 34,
            totalFat: '0.4g',
            saturatedFat: '0.1g',
            cholesterol: '0mg',
            sodium: '33mg',
            totalCarbohydrate: '7g',
            dietaryFiber: '2.6g',
            totalSugars: '1.7g',
            protein: '2.8g',
            vitaminC: '149%',
            vitaminK: '127%'
        },
        storage: 'Refrigerate in crisper drawer.',
        origin: 'California, USA',
        shelfLife: '5-7 days',
        promotionEnd: null,
        limitedStock: false,
        preOrder: false,
        newProduct: true,
        comboPack: false,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'Downtown Market'],
        ratingBreakdown: { 5: 50, 4: 25, 3: 2, 2: 1, 1: 0 },
        tags: ['vegetable', 'healthy', 'nutrient-rich']
    },

    // Dairy Category (3 products)
    7: {
        id: 7,
        name: 'Farm Fresh Milk',
        category: 'dairy',
        description: 'Premium whole milk from local farms. Rich and creamy, perfect for cereals, coffee, or drinking.',
        fullDescription: 'Our farm-fresh whole milk comes from local dairy farms that prioritize animal welfare and sustainable practices. The milk is pasteurized for safety while maintaining its rich, creamy texture and natural flavor. Perfect for drinking, cereals, coffee, or cooking.',
        price: 3.49,
        originalPrice: null,
        images: ['../images/products/milk.jpg', '../images/products/milk-2.jpg'],
        badge: 'Fresh',
        stock: 23,
        rating: 4.3,
        reviews: 89,
        organic: false,
        glutenFree: true,
        vegan: false,
        sizeOptions: ['1L', '2L', '500ml'],
        features: ['Local Farms', 'Creamy Texture', 'Pasteurized', 'Rich in Calcium'],
        nutrition: {
            servingSize: '250ml',
            calories: 150,
            totalFat: '8g',
            saturatedFat: '5g',
            cholesterol: '35mg',
            sodium: '120mg',
            totalCarbohydrate: '12g',
            dietaryFiber: '0g',
            totalSugars: '12g',
            protein: '8g',
            calcium: '30%',
            vitaminD: '25%'
        },
        storage: 'Refrigerate at or below 4°C',
        origin: 'Local Dairy Farm',
        shelfLife: '7-10 days',
        promotionEnd: null,
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '1 day',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 55, 4: 25, 3: 8, 2: 1, 1: 0 },
        tags: ['dairy', 'fresh', 'calcium']
    },
    8: {
        id: 8,
        name: 'Aged Cheddar Cheese',
        category: 'dairy',
        description: 'Premium aged cheddar with rich, sharp flavor. Perfect for sandwiches, cooking, or cheese boards.',
        fullDescription: 'Our premium aged cheddar cheese is carefully crafted and aged for 12 months to develop its distinctive sharp flavor and crumbly texture. Made from high-quality milk using traditional cheese-making methods. Perfect for sandwiches, cooking, or serving on cheese boards.',
        price: 8.99,
        originalPrice: 9.99,
        images: ['../images/products/cheese.jpg', '../images/products/cheese-2.jpg'],
        badge: 'Sale',
        stock: 15,
        rating: 4.8,
        reviews: 178,
        organic: false,
        glutenFree: true,
        vegan: false,
        weightOptions: ['200g', '400g', '1kg', 'Custom Weight'],
        features: ['12-Month Aged', 'Sharp Flavor', 'Traditional Methods', 'Versatile Usage'],
        nutrition: {
            servingSize: '30g',
            calories: 120,
            totalFat: '10g',
            saturatedFat: '6g',
            cholesterol: '30mg',
            sodium: '180mg',
            totalCarbohydrate: '1g',
            dietaryFiber: '0g',
            totalSugars: '0g',
            protein: '7g',
            calcium: '20%'
        },
        storage: 'Refrigerate in original packaging',
        origin: 'Wisconsin, USA',
        shelfLife: '3-4 weeks',
        promotionEnd: '2024-10-15',
        limitedStock: true,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'Downtown Market'],
        ratingBreakdown: { 5: 140, 4: 30, 3: 6, 2: 1, 1: 1 },
        tags: ['dairy', 'cheese', 'aged']
    },
    9: {
        id: 9,
        name: 'Greek Yogurt',
        category: 'dairy',
        description: 'Thick, creamy Greek yogurt packed with protein. Perfect for breakfast, snacks, or cooking.',
        fullDescription: 'Our Greek yogurt is strained to remove excess whey, resulting in a thick, creamy texture and higher protein content compared to regular yogurt. It is rich in probiotics and perfect for breakfast bowls, smoothies, dips, or as a healthy snack.',
        price: 5.99,
        originalPrice: 6.99,
        images: ['../images/products/yogurt.jpg', '../images/products/yogurt-2.jpg'],
        badge: 'High Protein',
        stock: 29,
        rating: 4.6,
        reviews: 112,
        organic: true,
        glutenFree: true,
        vegan: false,
        sizeOptions: ['500g', '1kg'],
        features: ['High Protein', 'Creamy Texture', 'Probiotic Rich', 'Versatile Usage'],
        nutrition: {
            servingSize: '150g',
            calories: 130,
            totalFat: '4g',
            saturatedFat: '2.5g',
            cholesterol: '15mg',
            sodium: '65mg',
            totalCarbohydrate: '6g',
            dietaryFiber: '0g',
            totalSugars: '4g',
            protein: '15g',
            calcium: '15%'
        },
        storage: 'Refrigerate at or below 4°C',
        origin: 'Local Dairy',
        shelfLife: '2-3 weeks',
        promotionEnd: '2024-09-30',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 80, 4: 25, 3: 5, 2: 1, 1: 1 },
        tags: ['dairy', 'yogurt', 'protein']
    },

    // Meat & Poultry Category (3 products)
    10: {
        id: 10,
        name: 'Fresh Chicken Breast',
        category: 'meat',
        description: 'Premium boneless, skinless chicken breast. Lean and protein-rich, perfect for healthy meals.',
        fullDescription: 'Our premium chicken breasts are carefully selected and trimmed to provide the leanest, most tender cuts. They are perfect for grilling, baking, or pan-searing. Each breast is individually wrapped for freshness and convenience.',
        price: 12.99,
        originalPrice: 14.99,
        images: ['../images/products/chicken.jpg', '../images/products/chicken-2.jpg'],
        badge: 'Sale',
        stock: 18,
        rating: 4.4,
        reviews: 203,
        organic: false,
        glutenFree: true,
        vegan: false,
        weightOptions: ['500g', '1kg', '2kg', 'Custom Weight'],
        features: ['Boneless & Skinless', 'High Protein', 'Lean Cut', 'Versatile Cooking'],
        nutrition: {
            servingSize: '100g',
            calories: 165,
            totalFat: '3.6g',
            saturatedFat: '1g',
            cholesterol: '85mg',
            sodium: '74mg',
            totalCarbohydrate: '0g',
            dietaryFiber: '0g',
            totalSugars: '0g',
            protein: '31g',
            iron: '4%'
        },
        storage: 'Keep refrigerated or freeze',
        origin: 'Local Poultry Farm',
        shelfLife: '2-3 days refrigerated',
        promotionEnd: '2024-08-20',
        limitedStock: true,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '1 day',
        storeLocations: ['Main Store'],
        ratingBreakdown: { 5: 150, 4: 45, 3: 6, 2: 1, 1: 1 },
        tags: ['meat', 'chicken', 'protein']
    },
    11: {
        id: 11,
        name: 'Premium Beef Steak',
        category: 'meat',
        description: 'Quality beef steak, well-marbled and tender. Perfect for grilling or pan-searing.',
        fullDescription: 'Our premium beef steaks are carefully selected for optimal marbling and tenderness. Each steak is cut to perfection and aged to develop rich flavor. Perfect for special occasions or everyday gourmet meals.',
        price: 24.99,
        originalPrice: 29.99,
        images: ['../images/products/beef.jpg', '../images/products/beef-2.jpg'],
        badge: 'Premium',
        stock: 12,
        rating: 4.7,
        reviews: 156,
        organic: false,
        glutenFree: true,
        vegan: false,
        weightOptions: ['300g', '500g', '1kg', 'Custom Weight'],
        features: ['Well-Marbled', 'Tender Cut', 'Aged for Flavor', 'Restaurant Quality'],
        nutrition: {
            servingSize: '100g',
            calories: 271,
            totalFat: '19g',
            saturatedFat: '7.7g',
            cholesterol: '77mg',
            sodium: '58mg',
            totalCarbohydrate: '0g',
            dietaryFiber: '0g',
            totalSugars: '0g',
            protein: '25g',
            iron: '15%'
        },
        storage: 'Keep refrigerated or freeze',
        origin: 'Grass-fed, Local Ranch',
        shelfLife: '2-3 days refrigerated',
        promotionEnd: '2024-07-31',
        limitedStock: true,
        preOrder: true,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'Downtown Market'],
        ratingBreakdown: { 5: 120, 4: 30, 3: 4, 2: 1, 1: 1 },
        tags: ['meat', 'beef', 'premium']
    },
    12: {
        id: 12,
        name: 'Fresh Salmon Fillet',
        category: 'meat',
        description: 'Fresh Atlantic salmon fillet, rich in omega-3. Perfect for baking, grilling, or pan-searing.',
        fullDescription: 'Our fresh Atlantic salmon fillets are sustainably sourced and rich in heart-healthy omega-3 fatty acids. Each fillet is carefully trimmed and skin-on for optimal flavor and moisture retention during cooking.',
        price: 18.99,
        originalPrice: 22.99,
        images: ['../images/products/fish.jpg', '../images/products/fish-2.jpg'],
        badge: 'Omega-3',
        stock: 14,
        rating: 4.8,
        reviews: 189,
        organic: false,
        glutenFree: true,
        vegan: false,
        weightOptions: ['300g', '500g', '1kg', 'Custom Weight'],
        features: ['Rich in Omega-3', 'Sustainably Sourced', 'Skin-On', 'Heart Healthy'],
        nutrition: {
            servingSize: '100g',
            calories: 208,
            totalFat: '13g',
            saturatedFat: '3.1g',
            cholesterol: '55mg',
            sodium: '59mg',
            totalCarbohydrate: '0g',
            dietaryFiber: '0g',
            totalSugars: '0g',
            protein: '20g',
            omega3: '2.3g'
        },
        storage: 'Keep refrigerated or freeze',
        origin: 'Sustainable Atlantic Fisheries',
        shelfLife: '1-2 days refrigerated',
        promotionEnd: '2024-08-15',
        limitedStock: false,
        preOrder: false,
        newProduct: true,
        comboPack: false,
        deliveryTime: '1 day',
        storeLocations: ['Main Store'],
        ratingBreakdown: { 5: 150, 4: 35, 3: 3, 2: 1, 1: 0 },
        tags: ['seafood', 'fish', 'healthy']
    },

    // Beverages Category (3 products)
    13: {
        id: 13,
        name: 'Orange Juice',
        category: 'beverages',
        description: '100% pure orange juice, not from concentrate. Freshly squeezed flavor with no added sugars.',
        fullDescription: 'Our 100% pure orange juice is made from freshly squeezed oranges with no concentrates or added sugars. Packed with vitamin C and natural sweetness, it is the perfect way to start your day or refresh anytime.',
        price: 4.99,
        originalPrice: 5.99,
        images: ['../images/products/juice.jpg', '../images/products/juice-2.jpg'],
        badge: '100% Pure',
        stock: 32,
        rating: 4.5,
        reviews: 134,
        organic: true,
        glutenFree: true,
        vegan: true,
        sizeOptions: ['1L', '2L', '500ml'],
        features: ['Not From Concentrate', 'No Added Sugar', 'Rich in Vitamin C', 'Freshly Squeezed'],
        nutrition: {
            servingSize: '250ml',
            calories: 110,
            totalFat: '0g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '0mg',
            totalCarbohydrate: '26g',
            dietaryFiber: '0g',
            totalSugars: '22g',
            protein: '2g',
            vitaminC: '130%'
        },
        storage: 'Refrigerate after opening',
        origin: 'Florida, USA',
        shelfLife: '7-10 days unopened',
        promotionEnd: '2024-09-10',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'University Branch', 'Downtown Market'],
        ratingBreakdown: { 5: 90, 4: 35, 3: 8, 2: 1, 1: 0 },
        tags: ['beverage', 'juice', 'vitamin-c']
    },
    14: {
        id: 14,
        name: 'Sparkling Soda',
        category: 'beverages',
        description: 'Refreshing sparkling soda in various flavors. Perfect carbonation with natural flavors.',
        fullDescription: 'Our sparkling sodas are made with natural flavors and perfect carbonation for a refreshing beverage experience. Available in multiple flavors, they are perfect for parties, meals, or as a refreshing treat.',
        price: 2.49,
        originalPrice: null,
        images: ['../images/products/soda.jpg', '../images/products/soda-2.jpg'],
        badge: 'Sparkling',
        stock: 56,
        rating: 4.2,
        reviews: 98,
        organic: false,
        glutenFree: true,
        vegan: true,
        sizeOptions: ['330ml', '500ml', '1L', '2L'],
        features: ['Natural Flavors', 'Perfect Carbonation', 'Multiple Flavors', 'Refreshing'],
        nutrition: {
            servingSize: '330ml',
            calories: 150,
            totalFat: '0g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '35mg',
            totalCarbohydrate: '39g',
            dietaryFiber: '0g',
            totalSugars: '38g',
            protein: '0g'
        },
        storage: 'Store in cool, dry place',
        origin: 'Local Beverage Company',
        shelfLife: '6 months',
        promotionEnd: null,
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 60, 4: 30, 3: 6, 2: 1, 1: 1 },
        tags: ['beverage', 'soda', 'sparkling']
    },
    15: {
        id: 15,
        name: 'Soft Drink',
        category: 'beverages',
        description: 'Classic soft drinks in popular flavors. Perfect for parties, meals, or refreshment.',
        fullDescription: 'Enjoy classic soft drink flavors that everyone loves. Our selection includes all the popular options, perfect for parties, family meals, or whenever you need a refreshing beverage.',
        price: 1.99,
        originalPrice: 2.49,
        images: ['../images/products/softdrink.jpg', '../images/products/softdrink-2.jpg'],
        badge: 'Classic',
        stock: 89,
        rating: 4.1,
        reviews: 267,
        organic: false,
        glutenFree: true,
        vegan: true,
        sizeOptions: ['330ml', '500ml', '1L', '2L'],
        features: ['Classic Flavors', 'Refreshing', 'Party Favorite', 'Family Size Available'],
        nutrition: {
            servingSize: '330ml',
            calories: 140,
            totalFat: '0g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '45mg',
            totalCarbohydrate: '39g',
            dietaryFiber: '0g',
            totalSugars: '39g',
            protein: '0g'
        },
        storage: 'Store in cool, dry place',
        origin: 'Various Manufacturers',
        shelfLife: '9 months',
        promotionEnd: '2024-10-31',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'University Branch', 'Downtown Market'],
        ratingBreakdown: { 5: 180, 4: 70, 3: 12, 2: 3, 1: 2 },
        tags: ['beverage', 'soft-drink', 'classic']
    },

    // Snacks Category (3 products)
    16: {
        id: 16,
        name: 'Butter Popcorn',
        category: 'snacks',
        description: 'Delicious butter-flavored popcorn, perfect for movie nights or snacking.',
        fullDescription: 'Our butter-flavored popcorn delivers that classic movie theater taste right at home. Made with quality kernels and real butter flavor, it is the perfect snack for movie nights, parties, or anytime cravings.',
        price: 3.99,
        originalPrice: 4.99,
        images: ['../images/products/popcorn.jpg', '../images/products/popcorn-2.jpg'],
        badge: 'Movie Night',
        stock: 42,
        rating: 4.3,
        reviews: 178,
        organic: false,
        glutenFree: true,
        vegan: false,
        sizeOptions: ['100g', '200g', '500g'],
        features: ['Butter Flavor', 'Movie Theater Taste', 'Quick Preparation', 'Family Favorite'],
        nutrition: {
            servingSize: '30g',
            calories: 150,
            totalFat: '8g',
            saturatedFat: '5g',
            cholesterol: '20mg',
            sodium: '250mg',
            totalCarbohydrate: '18g',
            dietaryFiber: '3g',
            totalSugars: '0g',
            protein: '2g'
        },
        storage: 'Store in cool, dry place',
        origin: 'USA',
        shelfLife: '6 months',
        promotionEnd: '2024-08-25',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 120, 4: 50, 3: 6, 2: 1, 1: 1 },
        tags: ['snack', 'popcorn', 'movie']
    },
    17: {
        id: 17,
        name: 'Chocolate Chip Cookies',
        category: 'snacks',
        description: 'Soft-baked chocolate chip cookies with rich chocolate chunks. Perfect treat any time.',
        fullDescription: 'Our soft-baked chocolate chip cookies are made with real chocolate chunks and a secret family recipe. Each cookie is baked to perfection with a soft center and slightly crisp edges - the perfect treat for any occasion.',
        price: 5.49,
        originalPrice: 6.49,
        images: ['../images/products/cookies.jpg', '../images/products/cookies-2.jpg'],
        badge: 'Fresh Baked',
        stock: 28,
        rating: 4.7,
        reviews: 223,
        organic: false,
        glutenFree: false,
        vegan: false,
        weightOptions: ['200g', '400g', '800g', 'Custom Weight'],
        features: ['Soft-Baked', 'Real Chocolate Chunks', 'Family Recipe', 'Perfect Texture'],
        nutrition: {
            servingSize: '30g (1 cookie)',
            calories: 140,
            totalFat: '7g',
            saturatedFat: '4g',
            cholesterol: '15mg',
            sodium: '85mg',
            totalCarbohydrate: '19g',
            dietaryFiber: '1g',
            totalSugars: '11g',
            protein: '2g'
        },
        storage: 'Store in airtight container',
        origin: 'Local Bakery',
        shelfLife: '2 weeks',
        promotionEnd: '2024-09-05',
        limitedStock: true,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1-2 days',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 180, 4: 35, 3: 6, 2: 1, 1: 1 },
        tags: ['snack', 'cookies', 'chocolate']
    },
    18: {
        id: 18,
        name: 'Premium Chocolate Bar',
        category: 'snacks',
        description: 'Luxury chocolate bar with smooth texture and rich cocoa flavor. Perfect indulgence.',
        fullDescription: 'Our premium chocolate bars are crafted with the finest cocoa beans for a smooth, rich chocolate experience. Each bar is carefully tempered to achieve the perfect snap and melt-in-your-mouth texture.',
        price: 4.99,
        originalPrice: 5.99,
        images: ['../images/products/chocolate.jpg', '../images/products/chocolate-2.jpg'],
        badge: 'Premium',
        stock: 35,
        rating: 4.8,
        reviews: 189,
        organic: true,
        glutenFree: true,
        vegan: false,
        weightOptions: ['100g', '200g'],
        features: ['Premium Cocoa', 'Smooth Texture', 'Fair Trade', 'Luxury Indulgence'],
        nutrition: {
            servingSize: '40g',
            calories: 220,
            totalFat: '14g',
            saturatedFat: '8g',
            cholesterol: '5mg',
            sodium: '10mg',
            totalCarbohydrate: '24g',
            dietaryFiber: '3g',
            totalSugars: '20g',
            protein: '3g'
        },
        storage: 'Store in cool, dry place',
        origin: 'Belgium',
        shelfLife: '12 months',
        promotionEnd: '2024-10-20',
        limitedStock: false,
        preOrder: false,
        newProduct: true,
        comboPack: false,
        deliveryTime: '3-5 days',
        storeLocations: ['Main Store', 'Downtown Market'],
        ratingBreakdown: { 5: 150, 4: 35, 3: 3, 2: 1, 1: 0 },
        tags: ['snack', 'chocolate', 'premium']
    },

    // Pantry Staples Category (3 products)
    19: {
        id: 19,
        name: 'Basmati Rice',
        category: 'pantry',
        description: 'Premium long-grain basmati rice with delicate aroma and fluffy texture.',
        fullDescription: 'Our premium basmati rice is aged to perfection, resulting in long, slender grains that cook up light and fluffy with a delicate aroma. Perfect for biryanis, pilafs, and as a side dish for any meal.',
        price: 8.99,
        originalPrice: 10.99,
        images: ['../images/products/rice.jpg', '../images/products/rice-2.jpg'],
        badge: 'Premium',
        stock: 24,
        rating: 4.6,
        reviews: 156,
        organic: true,
        glutenFree: true,
        vegan: true,
        weightOptions: ['1kg', '2kg', '5kg', '10kg', 'Custom Weight'],
        features: ['Long Grain', 'Aromatic', 'Aged for Quality', 'Fluffy Texture'],
        nutrition: {
            servingSize: '45g dry',
            calories: 160,
            totalFat: '0g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '0mg',
            totalCarbohydrate: '35g',
            dietaryFiber: '1g',
            totalSugars: '0g',
            protein: '3g'
        },
        storage: 'Store in airtight container in cool, dry place',
        origin: 'India',
        shelfLife: '2 years',
        promotionEnd: '2024-11-15',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '3-5 days',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 110, 4: 40, 3: 5, 2: 1, 1: 0 },
        tags: ['pantry', 'rice', 'staple']
    },
    20: {
        id: 20,
        name: 'All-Purpose Flour',
        category: 'pantry',
        description: 'Versatile all-purpose flour perfect for baking, cooking, and all your kitchen needs.',
        fullDescription: 'Our all-purpose flour is milled from premium wheat and is perfect for all your baking and cooking needs. From breads and cakes to sauces and gravies, this versatile flour delivers consistent results every time.',
        price: 4.49,
        originalPrice: null,
        images: ['../images/products/flour.jpg', '../images/products/flour-2.jpg'],
        badge: 'Essential',
        stock: 38,
        rating: 4.4,
        reviews: 134,
        organic: false,
        glutenFree: false,
        vegan: true,
        weightOptions: ['1kg', '2kg', '5kg', '10kg', 'Custom Weight'],
        features: ['Versatile', 'Consistent Quality', 'Baking Essential', 'Kitchen Staple'],
        nutrition: {
            servingSize: '30g',
            calories: 110,
            totalFat: '0g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '0mg',
            totalCarbohydrate: '23g',
            dietaryFiber: '1g',
            totalSugars: '0g',
            protein: '3g'
        },
        storage: 'Store in airtight container in cool, dry place',
        origin: 'Local Mill',
        shelfLife: '1 year',
        promotionEnd: null,
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'University Branch', 'Downtown Market'],
        ratingBreakdown: { 5: 90, 4: 35, 3: 8, 2: 1, 1: 0 },
        tags: ['pantry', 'flour', 'baking']
    },
    21: {
        id: 21,
        name: 'Granulated Sugar',
        category: 'pantry',
        description: 'Pure granulated sugar for baking, sweetening, and all your culinary needs.',
        fullDescription: 'Our pure granulated sugar is perfect for all your baking and sweetening needs. With its fine texture and consistent quality, it dissolves easily and works perfectly in recipes from cakes and cookies to beverages and sauces.',
        price: 3.99,
        originalPrice: 4.49,
        images: ['../images/products/sugar.jpg', '../images/products/sugar-2.jpg'],
        badge: 'Pure',
        stock: 45,
        rating: 4.3,
        reviews: 98,
        organic: false,
        glutenFree: true,
        vegan: true,
        weightOptions: ['1kg', '2kg', '5kg', 'Custom Weight'],
        features: ['Pure Cane Sugar', 'Fine Texture', 'Easy Dissolving', 'Baking Essential'],
        nutrition: {
            servingSize: '4g',
            calories: 15,
            totalFat: '0g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '0mg',
            totalCarbohydrate: '4g',
            dietaryFiber: '0g',
            totalSugars: '4g',
            protein: '0g'
        },
        storage: 'Store in airtight container',
        origin: 'Local Refinery',
        shelfLife: '2 years',
        promotionEnd: '2024-08-30',
        limitedStock: false,
        preOrder: false,
        newProduct: false,
        comboPack: false,
        deliveryTime: '2-3 days',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 65, 4: 25, 3: 6, 2: 1, 1: 1 },
        tags: ['pantry', 'sugar', 'sweetener']
    },

    // Bakery Category (3 products)
    22: {
        id: 22,
        name: 'Fresh Bread Loaf',
        category: 'bakery',
        description: 'Freshly baked bread loaf with soft texture and golden crust. Perfect for sandwiches or toast.',
        fullDescription: 'Our freshly baked bread loaf is made daily using traditional methods and quality ingredients. With its soft interior and golden crust, it is perfect for sandwiches, toast, or simply enjoyed with butter.',
        price: 3.99,
        originalPrice: null,
        images: ['../images/products/bread.jpg', '../images/products/bread-2.jpg'],
        badge: 'Fresh Daily',
        stock: 16,
        rating: 4.5,
        reviews: 201,
        organic: false,
        glutenFree: false,
        vegan: true,
        sizeOptions: ['400g', '800g'],
        features: ['Freshly Baked', 'Soft Texture', 'Golden Crust', 'Versatile'],
        nutrition: {
            servingSize: '50g (2 slices)',
            calories: 130,
            totalFat: '1g',
            saturatedFat: '0g',
            cholesterol: '0mg',
            sodium: '230mg',
            totalCarbohydrate: '25g',
            dietaryFiber: '2g',
            totalSugars: '3g',
            protein: '5g'
        },
        storage: 'Store in bread box or airtight container',
        origin: 'Local Bakery',
        shelfLife: '3-5 days',
        promotionEnd: null,
        limitedStock: true,
        preOrder: false,
        newProduct: false,
        comboPack: true,
        deliveryTime: '1 day',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 150, 4: 45, 3: 5, 2: 1, 1: 0 },
        tags: ['bakery', 'bread', 'fresh']
    },
    23: {
        id: 23,
        name: 'Chocolate Cake',
        category: 'bakery',
        description: 'Decadent chocolate cake with rich frosting. Perfect for celebrations or special treats.',
        fullDescription: 'Our decadent chocolate cake features moist layers of rich chocolate cake filled and frosted with creamy chocolate buttercream. Perfect for birthdays, celebrations, or whenever you need a special treat.',
        price: 24.99,
        originalPrice: 29.99,
        images: ['../images/products/cake.jpg', '../images/products/cake-2.jpg'],
        badge: 'Celebration',
        stock: 8,
        rating: 4.9,
        reviews: 167,
        organic: false,
        glutenFree: false,
        vegan: false,
        sizeOptions: ['6-inch', '8-inch', '10-inch'],
        features: ['Rich Chocolate', 'Creamy Frosting', 'Celebration Ready', 'Moist Layers'],
        nutrition: {
            servingSize: '100g',
            calories: 350,
            totalFat: '16g',
            saturatedFat: '10g',
            cholesterol: '60mg',
            sodium: '280mg',
            totalCarbohydrate: '48g',
            dietaryFiber: '2g',
            totalSugars: '35g',
            protein: '4g'
        },
        storage: 'Refrigerate',
        origin: 'Local Bakery',
        shelfLife: '3-4 days',
        promotionEnd: '2024-09-20',
        limitedStock: true,
        preOrder: true,
        newProduct: false,
        comboPack: false,
        deliveryTime: '1 day',
        storeLocations: ['Main Store'],
        ratingBreakdown: { 5: 140, 4: 25, 3: 2, 2: 0, 1: 0 },
        tags: ['bakery', 'cake', 'chocolate']
    },
    24: {
        id: 24,
        name: 'Butter Croissants',
        category: 'bakery',
        description: 'Flaky, buttery croissants with golden layers. Perfect for breakfast or snacks.',
        fullDescription: 'Our butter croissants are made with layers of delicate pastry and real butter, creating that perfect flaky texture and rich flavor. Baked fresh daily, they are perfect for breakfast, brunch, or as a special snack.',
        price: 6.99,
        originalPrice: 8.99,
        images: ['../images/products/croissants.jpg', '../images/products/croissants-2.jpg'],
        badge: 'Fresh Baked',
        stock: 12,
        rating: 4.7,
        reviews: 145,
        organic: false,
        glutenFree: false,
        vegan: false,
        quantityOptions: ['2 pieces', '4 pieces', '6 pieces'],
        features: ['Flaky Layers', 'Buttery Flavor', 'Fresh Daily', 'Perfectly Golden'],
        nutrition: {
            servingSize: '57g (1 croissant)',
            calories: 230,
            totalFat: '12g',
            saturatedFat: '7g',
            cholesterol: '40mg',
            sodium: '320mg',
            totalCarbohydrate: '26g',
            dietaryFiber: '1g',
            totalSugars: '6g',
            protein: '5g'
        },
        storage: 'Store in airtight container',
        origin: 'Local French Bakery',
        shelfLife: '2-3 days',
        promotionEnd: '2024-08-10',
        limitedStock: true,
        preOrder: false,
        newProduct: true,
        comboPack: false,
        deliveryTime: '1 day',
        storeLocations: ['Main Store', 'University Branch'],
        ratingBreakdown: { 5: 110, 4: 30, 3: 4, 2: 1, 1: 0 },
        tags: ['bakery', 'croissant', 'breakfast']
    }
};

// Enhanced Product Page Initialization
function initializeProductPage() {
    loadProductDetails();
    initializeProductGallery();
    initializeQuantitySelector();
    initializeProductOptions();
    initializeTabs();
    initializeImageZoom();
    initializeWishlist();
    initializeRelatedProducts();
    initializeProductReviews();
    initializePromotionTimer();
    initializeStockAlerts();
    initializeSocialSharing();
    initializeDeliveryOptions();
    initializeStoreLocations();
    initializeRatingSystem();
    initializeComboOffers();
    initializePreOrderSystem();
    initializeCustomWeightInput();
    initializeNotifications();
    initializeBreadcrumb();
}

// Enhanced Product Details Loading
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = allProductsData[productId];

    if (!product) {
        showProductNotFound();
        return;
    }

    updateProductDisplay(product);
    updateProductMetaTags(product);
    updateBreadcrumb(product);
}

function updateProductDisplay(product) {
    // Update basic product info
    if (document.getElementById('productName')) {
        document.getElementById('productName').textContent = product.name;
    }
    if (document.getElementById('productDescription')) {
        document.getElementById('productDescription').textContent = product.description;
    }
    if (document.getElementById('productFullDescription')) {
        document.getElementById('productFullDescription').textContent = product.fullDescription;
    }

    // Update pricing with enhanced features
    updatePricingDisplay(product);

    // Update stock information with enhanced features
    updateStockDisplay(product);

    // Update product images with enhanced gallery
    updateProductGallery(product.images, product.name);

    // Update product options with custom weight
    updateProductOptions(product);

    // Update product details in tabs
    updateProductTabs(product);

    // Update dietary badges
    updateDietaryBadges(product);

    // Update promotion timer
    updatePromotionTimer(product);

    // Update delivery options
    updateDeliveryOptions(product);

    // Update store locations
    updateStoreLocations(product);

    // Update combo offers
    updateComboOffers(product);

    // Update pre-order information
    updatePreOrderInfo(product);

    // Update rating system
    updateRatingSystem(product);
}
// Enhanced Pricing Display
function updatePricingDisplay(product) {
    const currentPriceElem = document.getElementById('productPrice') || document.querySelector('.current-price');
    const originalPriceElem = document.getElementById('productOriginalPrice') || document.querySelector('.original-price');
    const savingsElem = document.getElementById('savingsAmount') || document.querySelector('.save-amount');
    const pricePerUnitElem = document.getElementById('pricePerUnit');

    if (currentPriceElem) {
        currentPriceElem.textContent = `$${product.price.toFixed(2)}`;
    }

    if (product.originalPrice) {
        const savings = product.originalPrice - product.price;
        const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

        if (originalPriceElem) {
            originalPriceElem.textContent = `$${product.originalPrice.toFixed(2)}`;
            originalPriceElem.style.display = 'block';
        }
        if (savingsElem) {
            savingsElem.textContent = `Save $${savings.toFixed(2)} (${savingsPercentage}%)`;
            savingsElem.style.display = 'block';
        }

        // Show "Don't miss this opportunity" message for high discounts
        if (savingsPercentage >= 20) {
            showSpecialOfferMessage(`Save $${savings.toFixed(2)} on ${product.name}! Don't miss this opportunity!`);
        }
    } else {
        if (originalPriceElem) originalPriceElem.style.display = 'none';
        if (savingsElem) savingsElem.style.display = 'none';
    }

    // Calculate and display price per unit
    if (pricePerUnitElem && product.weightOptions) {
        const baseWeight = product.weightOptions[0];
        const weightValue = parseFloat(baseWeight);
        const unit = baseWeight.replace(/[0-9.]/g, '');
        const pricePerUnit = product.price / weightValue;
        pricePerUnitElem.textContent = `$${pricePerUnit.toFixed(2)}/${unit}`;
        pricePerUnitElem.style.display = 'block';
    }
}
// Enhanced Stock Management
function updateStockDisplay(product) {
    const stockElem = document.getElementById('stockStatus') || document.querySelector('.product-stock');
    const stockCountElem = document.getElementById('stockCount');
    const addToCartBtn = document.getElementById('addToCartBtn') || document.querySelector('.btn-add-to-cart');
    const preOrderBtn = document.getElementById('preOrderBtn');
    const lowStockAlert = document.getElementById('lowStockAlert');

    if (stockCountElem) {
        stockCountElem.textContent = product.stock;
    }

    let stockClass = '';
    let stockText = '';

    if (product.stock > 10) {
        stockText = 'In Stock';
        stockClass = 'in-stock';
        if (addToCartBtn) addToCartBtn.disabled = false;
        if (lowStockAlert) lowStockAlert.style.display = 'none';
    } else if (product.stock > 0) {
        stockText = `Low Stock - Only ${product.stock} left!`;
        stockClass = 'low-stock';
        if (addToCartBtn) addToCartBtn.disabled = false;
        if (lowStockAlert) {
            lowStockAlert.textContent = `Hurry! Only ${product.stock} items left in stock`;
            lowStockAlert.style.display = 'block';
        }
    } else if (product.preOrder) {
        stockText = 'Available for Pre-Order';
        stockClass = 'pre-order';
        if (addToCartBtn) addToCartBtn.style.display = 'none';
        if (preOrderBtn) preOrderBtn.style.display = 'block';
    } else {
        stockText = 'Out of Stock';
        stockClass = 'out-of-stock';
        if (addToCartBtn) addToCartBtn.disabled = true;
        if (lowStockAlert) {
            lowStockAlert.textContent = 'This item is currently out of stock';
            lowStockAlert.style.display = 'block';
        }
    }

    if (stockElem) {
        stockElem.textContent = stockText;
        stockElem.className = `stock-status ${stockClass}`;
    }
}

// Show limited stock warning
if (product.limitedStock) {
    showLimitedStockWarning();
}

// Enhanced Product Options with Custom Weight
function updateProductOptions(product) {
    const optionsContainer = document.getElementById('productOptions') || document.querySelector('.product-options');
    if (!optionsContainer) return;

    optionsContainer.innerHTML = '';

    // Weight/Size options with custom input
    if (product.weightOptions) {
        const weightGroup = createEnhancedOptionGroup('Weight', 'weight', product.weightOptions, product.weightOptions[0]);
        optionsContainer.appendChild(weightGroup);
    }
    if (product.sizeOptions) {
        const sizeGroup = createEnhancedOptionGroup('Size', 'size', product.sizeOptions, product.sizeOptions[0]);
        optionsContainer.appendChild(sizeGroup);
    }
    if (product.quantityOptions) {
        const quantityGroup = createEnhancedOptionGroup('Quantity', 'quantity', product.quantityOptions, product.quantityOptions[0]);
        optionsContainer.appendChild(quantityGroup);
    }

    // Add custom weight input if needed
    if (product.weightOptions && product.weightOptions.includes('Custom Weight')) {
        initializeCustomWeightInput();
    }
}

function createEnhancedOptionGroup(label, name, options, defaultValue) {
    const group = document.createElement('div');
    group.className = 'option-group';
    group.innerHTML = `
        <label class="option-label">${label}:</label>
        <div class="option-buttons" id="${name}Options">
            ${options.map(option => `
                <button type="button" class="option-btn ${option === defaultValue ? 'active' : ''}" 
                        data-value="${option}" 
                        data-type="${name}">${option}</button>
            `).join('')}
        </div>
    `;

    group.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Handle custom weight selection
            if (this.dataset.value === 'Custom Weight') {
                showCustomWeightInput(this.dataset.type);
            } else {
                hideCustomWeightInput();
                updateProductPrice(this.dataset.value, this.dataset.type);
            }
        });
    });

    return group;
}

// Custom Weight Input System
function initializeCustomWeightInput() {
    const customWeightHTML = `
        <div class="custom-weight-container" id="customWeightContainer" style="display: none;">
            <label for="customWeightInput">Enter Custom Weight:</label>
            <div class="custom-weight-input-group">
                <input type="number" id="customWeightInput" min="0.1" max="10" step="0.1" placeholder="0.00">
                <select id="customWeightUnit">
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                </select>
                <button type="button" class="btn-apply-weight" onclick="applyCustomWeight()">Apply</button>
            </div>
            <div class="weight-suggestions">
                <span>Quick select:</span>
                <button type="button" class="btn-weight-suggestion" onclick="setCustomWeight(0.5, 'kg')">500g</button>
                <button type="button" class="btn-weight-suggestion" onclick="setCustomWeight(1, 'kg')">1kg</button>
                <button type="button" class="btn-weight-suggestion" onclick="setCustomWeight(1.5, 'kg')">1.5kg</button>
            </div>
        </div>
    `;

    const optionsContainer = document.getElementById('productOptions') || document.querySelector('.product-options');
    if (optionsContainer) {
        optionsContainer.insertAdjacentHTML('beforeend', customWeightHTML);
    }
}

function showCustomWeightInput(type) {
    const container = document.getElementById('customWeightContainer');
    if (container) {
        container.style.display = 'block';
        container.dataset.type = type;
    }
}

function hideCustomWeightInput() {
    const container = document.getElementById('customWeightContainer');
    if (container) {
        container.style.display = 'none';
    }
}

function setCustomWeight(weight, unit) {
    const weightInput = document.getElementById('customWeightInput');
    const unitSelect = document.getElementById('customWeightUnit');

    if (weightInput && unitSelect) {
        weightInput.value = weight;
        unitSelect.value = unit;
        applyCustomWeight();
    }
}

function applyCustomWeight() {
    const weightInput = document.getElementById('customWeightInput');
    const unitSelect = document.getElementById('customWeightUnit');
    const container = document.getElementById('customWeightContainer');

    if (weightInput && unitSelect && container) {
        const weight = parseFloat(weightInput.value);
        const unit = unitSelect.value;
        const type = container.dataset.type;

        if (weight && weight > 0) {
            const customValue = `${weight}${unit}`;
            updateProductPrice(customValue, type);
            showEnhancedToast(`Custom ${type} set to ${customValue}`, 'success');
        } else {
            showEnhancedToast('Please enter a valid weight', 'error');
        }
    }
}

// Enhanced Price Calculation
function updateProductPrice(selectedOption, optionType) {
    const product = getCurrentProduct();
    const basePrice = product.price;
    let finalPrice = basePrice;

    // Calculate price based on selected option
    if (optionType === 'weight' && selectedOption !== 'Custom Weight') {
        const weightMatch = selectedOption.match(/(\d+\.?\d*)(\w+)/);
        if (weightMatch) {
            const weight = parseFloat(weightMatch[1]);
            const unit = weightMatch[2];
            const baseWeight = parseFloat(product.weightOptions[0]);

            // Simple proportional pricing
            finalPrice = (basePrice * weight) / baseWeight;
        }
    }

    // Update price display
    const priceElement = document.getElementById('productPrice') || document.querySelector('.current-price');
    if (priceElement) {
        priceElement.textContent = `$${finalPrice.toFixed(2)}`;
        showPriceUpdateAnimation(priceElement);
    }
}

function showPriceUpdateAnimation(element) {
    element.style.transform = 'scale(1.1)';
    element.style.color = '#27ae60';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 500);
}

// Enhanced Promotion System
function initializePromotionTimer() {
    const product = getCurrentProduct();
    if (product.promotionEnd) {
        updatePromotionTimer(product);
        startPromotionCountdown(product.promotionEnd);
    }
}

function updatePromotionTimer(product) {
    const timerContainer = document.getElementById('promotionTimer');
    if (!timerContainer || !product.promotionEnd) return;

    timerContainer.innerHTML = `
        <div class="promotion-timer">
            <div class="timer-label">Special Offer Ends In:</div>
            <div class="timer-display">
                <div class="timer-unit">
                    <span class="timer-value" id="days">00</span>
                    <span class="timer-label">Days</span>
                </div>
                <div class="timer-unit">
                    <span class="timer-value" id="hours">00</span>
                    <span class="timer-label">Hours</span>
                </div>
                <div class="timer-unit">
                    <span class="timer-value" id="minutes">00</span>
                    <span class="timer-label">Minutes</span>
                </div>
                <div class="timer-unit">
                    <span class="timer-value" id="seconds">00</span>
                    <span class="timer-label">Seconds</span>
                </div>
            </div>
        </div>
    `;
}

function startPromotionCountdown(endDate) {
    const countdownFunction = setInterval(function () {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const distance = end - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            const timerContainer = document.getElementById('promotionTimer');
            if (timerContainer) {
                timerContainer.innerHTML = '<div class="promotion-ended">Offer Expired</div>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElem = document.getElementById('days');
        const hoursElem = document.getElementById('hours');
        const minutesElem = document.getElementById('minutes');
        const secondsElem = document.getElementById('seconds');

        if (daysElem) daysElem.textContent = days.toString().padStart(2, '0');
        if (hoursElem) hoursElem.textContent = hours.toString().padStart(2, '0');
        if (minutesElem) minutesElem.textContent = minutes.toString().padStart(2, '0');
        if (secondsElem) secondsElem.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}


// Enhanced Cart System with Notifications
function addToCart() {
    // Get the current product safely
    const product = typeof getCurrentProduct === 'function' ? getCurrentProduct() : null;
    if (!product) {
        showEnhancedToast('Product not found', 'error');
        return;
    }

    // Get quantity input safely
    const quantityInput = document.getElementById('quantity') || document.getElementById('productQuantity');
    const quantity = quantityInput && !isNaN(quantityInput.value) ? parseInt(quantityInput.value) : 1;

    // Get selected options and custom weight safely
    const selectedOptions = typeof getSelectedOptions === 'function' ? getSelectedOptions() : {};
    const customWeight = typeof getCustomWeight === 'function' ? getCustomWeight() : null;

    // Validation
    if (product.stock === 0 && !product.preOrder) {
        showEnhancedToast('This product is out of stock', 'error');
        return;
    }

    if (quantity > product.stock && !product.preOrder) {
        showEnhancedToast(`Only ${product.stock} items available`, 'error');
        return;
    }

    // Add product to cart logic
    // Example: you can push to localStorage cart array
    let cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
    cart.push({
        productId: product.id,
        quantity: quantity,
        options: selectedOptions,
        customWeight: customWeight
    });
    localStorage.setItem('freshmartCart', JSON.stringify(cart));

    showEnhancedToast(`${product.name} added to cart!`, 'success');
}


// Create cart item
const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    options: selectedOptions,
    customWeight: customWeight,
    image: product.images[0],
    category: product.category,
    preOrder: product.preOrder,
    deliveryTime: product.deliveryTime,
    addedAt: new Date().toISOString()
};

// Add to cart storage
let cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
const existingItemIndex = cart.findIndex(item =>
    item.id === cartItem.id &&
    JSON.stringify(item.options) === JSON.stringify(cartItem.options) &&
    item.customWeight === cartItem.customWeight
);

if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
} else {
    cart.push(cartItem);
}

localStorage.setItem('freshmartCart', JSON.stringify(cart));

// Show enhanced success message
let message = `${quantity} ${product.name}`;

if (customWeight) {
    message += ` (${customWeight})`;
}
message += ' added to cart successfully! 🛒';

showEnhancedToast(message, 'success', 3000);

// Update cart count with animation
updateCartCount(quantity);

// Show related offers
showRelatedOffers(product);

function getCustomWeight() {
    const weightInput = document.getElementById('customWeightInput');
    const unitSelect = document.getElementById('customWeightUnit');

    if (weightInput && weightInput.value && unitSelect) {
        return `${weightInput.value}${unitSelect.value}`;
    }
    return null;
}

function getSelectedOptions() {
    const options = {};
    const optionGroups = document.querySelectorAll('.option-group');

    optionGroups.forEach(group => {
        const activeBtn = group.querySelector('.option-btn.active');
        if (activeBtn) {
            const optionName = activeBtn.parentElement.id.replace('Options', '');
            options[optionName] = activeBtn.dataset.value;
        }
    });

    return options;
}

// Enhanced Notification System
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
}

function showEnhancedToast(message, type = 'success', duration = 3000) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification toast ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    notificationContainer.appendChild(notification);

    // Add show class after a delay for animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Enhanced Stock Management
function initializeStockManagement() {
    checkLowStockItems();
    setInterval(checkLowStockItems, 60000); // Check every minute
}

function checkLowStockItems() {
    Object.values(allProductsData).forEach(product => {
        if (product.stock > 0 && product.stock <= 5) {
            // Could send notification or update UI
            console.log(`Low stock alert: ${product.name} - ${product.stock} left`);

        }
    });
}

function showLimitedStockWarning() {
    const warningHTML = `
        <div class="limited-stock-warning">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Limited Stock Item - Get it before it's gone!</span>
        </div>
    `;

    const productActions = document.querySelector('.product-actions');
    if (productActions) {
        productActions.insertAdjacentHTML('beforebegin', warningHTML);
    }
}

// Enhanced Related Products with Combo Offers
function initializeRelatedProducts() {
    const product = getCurrentProduct();
    const relatedProducts = getRelatedProducts(product);
    displayRelatedProducts(relatedProducts);
    displayComboOffers(product);
}

function getRelatedProducts(currentProduct) {
    // Get products from same category, excluding current product
    return Object.values(allProductsData)
        .filter(product =>
            product.category === currentProduct.category &&
            product.id !== currentProduct.id
        )
        .slice(0, 4); // Show max 4 related products
}

function displayRelatedProducts(products) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p>No related products found.</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card" onclick="window.location.href='products.html?id=${product.id}'">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                ${product.badge ? <span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span> : ''}
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? <span class="original-price">$${product.originalPrice.toFixed(2)}</span> : ''}
                </div>
                <button class="btn-add-cart" onclick="addProductToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function displayComboOffers(product) {
    const comboContainer = document.getElementById('comboOffers');
    if (!comboContainer) return;

    // Example combo offers
    const comboOffers = [
        {
            name: 'Breakfast Combo',
            products: [product.id, 7, 22], // Current product + milk + bread
            discount: 15,
            price: (product.price + 3.49 + 3.99) * 0.85,
            description: 'Perfect morning bundle with fresh items'
        },
        {
            name: 'Healthy Snack Pack',
            products: [product.id, 1, 18], // Current product + apples + chocolate
            discount: 10,
            price: (product.price + 4.99 + 4.99) * 0.90,
            description: 'Nutritious snacks for your day'
        }
    ];

    comboContainer.innerHTML = comboOffers.map(offer => `
        <div class="combo-offer-card">
            <h4>${offer.name}</h4>
            <p class="combo-description">${offer.description}</p>
            <div class="combo-discount">Save ${offer.discount}%</div>
            <div class="combo-price">$${offer.price.toFixed(2)}</div>
            <button class="btn-combo" onclick="addComboToCart([${offer.products}])">
                Add Combo to Cart
            </button>
        </div>
    `).join('');
}

function addComboToCart(productIds) {
    productIds.forEach(productId => {
        const product = allProductsData[productId];
        if (product) {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                combo: true,
                addedAt: new Date().toISOString()
            };

            // Add to cart
            let cart = JSON.parse(localStorage.getItem('freshmartCart')) || [];
            cart.push(cartItem);
            localStorage.setItem('freshmartCart', JSON.stringify(cart));
        }
    });

    showEnhancedToast('Combo pack added to cart! 🎉', 'success');
    updateCartCount(productIds.length);
}

// Enhanced Delivery Options
function initializeDeliveryOptions() {
    updateDeliveryEstimates();
}

function updateDeliveryOptions(product) {
    const deliveryContainer = document.getElementById('deliveryOptions') || document.querySelector('.delivery-info');
    if (!deliveryContainer) return;

    deliveryContainer.innerHTML = `
        <div class="delivery-option">
            <i class="fas fa-shipping-fast"></i>
            <div class="delivery-info">
                <strong>Express Delivery</strong>
                <span>Get it by tomorrow - $2.99</span>
            </div>
        </div>
        <div class="delivery-option">
            <i class="fas fa-truck"></i>
            <div class="delivery-info">
                <strong>Standard Delivery</strong>
                <span>2-3 business days - FREE over $25</span>
            </div>
        </div>
        <div class="delivery-option">
            <i class="fas fa-store"></i>
            <div class="delivery-info">
                <strong>Store Pickup</strong>
                <span>Ready in 2 hours - FREE</span>
            </div>
        </div>
        <div class="delivery-notice">
            <i class="fas fa-info-circle"></i>
            <span>Student discount: Extra 15% off with valid ID</span>
        </div>
    `;
}

// Store Locations System
function initializeStoreLocations() {
    const product = getCurrentProduct();
    updateStoreLocations(product);
}

function updateStoreLocations(product) {
    const locationsContainer = document.getElementById('storeLocations');
    if (!locationsContainer || !product.storeLocations) return;

    locationsContainer.innerHTML = `
        <h4>Available at these locations:</h4>
        <div class="store-locations-list">
            ${product.storeLocations.map(location => `
                <div class="store-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${location}</span>
                    <button class="btn-check-availability" onclick="checkStoreAvailability('${location}', ${product.id})">
                        Check Availability
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function checkStoreAvailability(location, productId) {
    // Simulate API call
showEnhancedToast(`Checking availability at ${location}...`, 'info');

setTimeout(() => {
    const isAvailable = Math.random() > 0.3; // 70% chance of availability
    if (isAvailable) {
        showEnhancedToast(`✅ Available at ${location}`, 'success');
    } else {
        showEnhancedToast(`❌ Currently unavailable at ${location}`, 'warning');
    }
}, 1000);

}

// Enhanced Rating System
function initializeRatingSystem() {
    const product = getCurrentProduct();
    displayRatingBreakdown(product);
}

function updateRatingSystem(product) {
    const ratingContainer = document.getElementById('ratingBreakdown');
    if (!ratingContainer || !product.ratingBreakdown) return;

    const totalReviews = Object.values(product.ratingBreakdown).reduce((a, b) => a + b, 0);

    ratingContainer.innerHTML = `
        <div class="rating-breakdown">
            <h4>Customer Rating Breakdown</h4>
            ${[5, 4, 3, 2, 1].map(stars => {
        const count = product.ratingBreakdown[stars] || 0;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return `
                    <div class="rating-bar">
                        <span class="rating-stars">${stars} <i class="fas fa-star"></i></span>
                        <div class="rating-progress">
                            <div class="rating-progress-bar" style="width: ${percentage}%"></div>
                        </div>
                        <span class="rating-count">${count} (${percentage.toFixed(1)}%)</span>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

// Pre-Order System
function initializePreOrderSystem() {
    const product = getCurrentProduct();
    if (product.preOrder) {
        setupPreOrderButton();
    }
}

function setupPreOrderButton() {
    const product = getCurrentProduct();
    const preOrderHTML = `
        <button class="btn-pre-order" id="preOrderBtn" onclick="handlePreOrder()">
            <i class="fas fa-calendar-plus"></i>
            Pre-Order Now
            <span class="pre-order-info">Expected delivery: ${product.deliveryTime}</span>
        </button>
    `;

    const productActions = document.querySelector('.product-actions');
    if (productActions) {
        productActions.insertAdjacentHTML('beforeend', preOrderHTML);
    }
}

function handlePreOrder() {
    const product = getCurrentProduct();
    const quantityInput = document.getElementById('quantity') || document.getElementById('productQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    const preOrderItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
        preOrder: true,
        expectedDelivery: product.deliveryTime,
        orderDate: new Date().toISOString()
    };

    // Add to pre-orders
let preOrders = JSON.parse(localStorage.getItem('freshmartPreOrders')) || [];
preOrders.push(preOrderItem);
localStorage.setItem('freshmartPreOrders', JSON.stringify(preOrders));

showEnhancedToast(`Pre-order placed successfully! Expected delivery: ${product.deliveryTime}`, 'success');


// Utility Functions
function getCurrentProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    return allProductsData[productId];
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

function updateCartCount(quantityToAdd) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const current = parseInt(cartCount.textContent) || 0;
        const newCount = current + quantityToAdd;
        cartCount.textContent = newCount;

        // Add animation
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
}

function showProductNotFound() {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="container">
                <div class="product-not-found">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Product Not Found</h2>
                    <p>We're sorry, but the product you're looking for doesn't exist or has been removed from our store.</p>
                    <div class="not-found-suggestions">
                        <p>You might be interested in:</p>
                        <div class="suggestion-products">
                            ${getRandomProducts(3).map(product => `
                                <div class="suggestion-product" onclick="window.location.href='products.html?id=${product.id}'">
                                    <img src="${product.images[0]}" alt="${product.name}">
                                    <h4>${product.name}</h4>
                                    <span class="price">$${product.price.toFixed(2)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="not-found-actions">
                        <a href="store.html" class="btn btn-primary">Continue Shopping</a>
                        <a href="category.html" class="btn btn-outline">Browse Categories</a>
                    </div>
                </div>
            </div>
        `;
    }
}

function getRandomProducts(count) {
    const products = Object.values(allProductsData);
    return products.sort(() => 0.5 - Math.random()).slice(0, count);
}

function showSpecialOfferMessage(message) {
    const specialOfferHTML = `
        <div class="special-offer-banner">
            <i class="fas fa-gift"></i>
            <span>${message}</span>
            <button class="close-banner" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    const productInfo = document.querySelector('.product-info');
    if (productInfo) {
        productInfo.insertAdjacentHTML('afterbegin', specialOfferHTML);
    }
}

function showRelatedOffers(product) {
    // Show related offers modal or notification
    setTimeout(() => {
        if (Math.random() > 0.5) { // 50% chance to show related offer
           showEnhancedToast(`💡 Customers who bought ${product.name} also loved our fresh bakery items!`, 'info', 5000);

        }
    }, 2000);
}

function updateProductMetaTags(product) {
    // Update page title
    document.title = `${product.name} - FreshMart`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = product.description;
}

function updateBreadcrumb(product) {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html">Home</a>
            <i class="fas fa-chevron-right"></i>
            <a href="category.html">Categories</a>
            <i class="fas fa-chevron-right"></i>
            <a href="category.html?category=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a>
            <i class="fas fa-chevron-right"></i>
            <span>${product.name}</span>
        `;
    }
}

// Initialize all product functionality
function initializeAllProductFeatures() {
    initializeProductPage();
}

// Export for global access
window.initializeProductPage = initializeProductPage;
window.addToCart = addToCart;
window.handlePreOrder = handlePreOrder;
window.checkStoreAvailability = checkStoreAvailability;
window.addComboToCart = addComboToCart;
window.setCustomWeight = setCustomWeight;
window.applyCustomWeight = applyCustomWeight;
window.showEnhancedToast = showEnhancedToast;
window.getCurrentProduct = getCurrentProduct;

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllProductFeatures);
} else {
    initializeAllProductFeatures();
}
}