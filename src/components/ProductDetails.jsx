import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const productId = params.productId;
  const API_URL = `https://fakestoreapi.com/products/${productId}`;
  console.log(API_URL);

  function handleClickUpdate() {
    console.log('handleclickupdate');
  }

  function handleClickDelete() {
    console.log('handleclickdelete');
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios(API_URL);
        setProduct(data);
        console.log(typeof product);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return 'Loading..';
  if (error) return 'error';
  console.log(product);
  return (
    <>
      <div>{product && product.title}</div>
      <div onClick={handleClickUpdate}>update</div>
      <div onClick={handleClickDelete}>delete</div>
      <form action='' style={{ display: 'none' }}></form>
    </>
  );
};

export default ProductDetails;
