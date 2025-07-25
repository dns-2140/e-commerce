import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios(API_URL);
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  if (loading) return 'Loading..';
  if (error) return 'error';
  console.log(products);
  return (
    <>
      <div className='md:p-32 bg-slate-100 max-w-[100vw]'>
        <ProductForm addProduct={addProduct} />

        <ProductList products={products} />
      </div>
    </>
  );
};

export default ProductListContainer;
