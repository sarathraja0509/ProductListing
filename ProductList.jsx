import React, { useState, useEffect } from 'react';

const ProductList = () => {
    // State variables
    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Fetch products on component mount
        getProducts();
        // Fetch categories on component mount
        getProductCategories();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data.products); // Initialize filteredProducts with all products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getProductCategories = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchKeyword}`);
            const data = await response.json();
            setFilteredProducts(data.products);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleCategoryChange = async (category) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await response.json();
            setFilteredProducts(data.products);
            setSelectedCategory(category);
        } catch (error) {
            console.error('Error filtering products by category:', error);
        }
    };

    return (
        <div>
            {/* Category Dropdown */}
            <select onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="" selected disabled>
                    Select Category
                </option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Display Products with Thumbnails */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredProducts.map((product) => (
                    <div key={product.id} style={{ width: '25%', padding: '10px' }}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <p>{product.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
