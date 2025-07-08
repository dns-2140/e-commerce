import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className='flex flex-col  md:w-1/4'
    >
      <img src={product.image} />
      {product.title}
    </div>
  );
};

export default Product;
