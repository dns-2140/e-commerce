import React from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <>
      <div className='bg-white p-8'>
        <h2 className='mt-8 mb-8'>All products</h2>
        <div className='flex flex-col gap-32 md:gap-16 md:flex-row md:flex-wrap items-center justify-center'>
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
