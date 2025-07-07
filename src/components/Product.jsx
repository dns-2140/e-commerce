import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);
  return (
    <div onClick={() => navigate(`/products/${product.id}`)}>
      {product.title}
    </div>
  );
};

export default Product;
