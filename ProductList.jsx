import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, Grid } from '@material-ui/core';

const ProductList = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        getProducts();
        getProductCategories();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
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
            <Grid container spacing={2}>

                {/* Category Dropdown */}
                <Grid item xs={12} sm={4}>
                    <Select
                        displayEmpty
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Select Category
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>

            {/* Display Products with Thumbnails */}
            <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                    <Grid key={product.id} item xs={6} sm={3}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <p>{product.title}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductList;
