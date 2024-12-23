import React, { useState, useEffect } from 'react';
import { API_URL } from '../vendorDashboard/Components/Helpers/api';

const Allproducts = () => {
    const [productItems, setProductsItems] = useState([]);

    const getAllProducts = async () => {
        const firmId = localStorage.getItem('firmId');

        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const productsData = await response.json();
            setProductsItems(productsData.products || []);
            console.log(productsData);
        } catch (error) {
            console.error("Failed to Fetch Products", error);
            alert("Failed to fetch Products");
        }
    };

    useEffect(() => {
        getAllProducts();
        console.log("this is useEffect Block");
    }, []);

    const productDeleteById = async (productId) => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setProductsItems(productItems.filter((product) => product._id !== productId));
                alert("Product deleted successfully!");
            } else {
                throw new Error(`Failed to delete product: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to delete the product", error);
            alert("Failed to delete the product. Please try again.");
        }
    };
    

    return (
        <div>
            {productItems.length === 0 ? (
                <p> No Products Available </p>
            ) : (
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img
                                                src={`${API_URL}/uploads/${item.image}`}
                                                alt={item.productName}
                                                className="product-image"
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>{productDeleteById(item._id)}}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Allproducts;
