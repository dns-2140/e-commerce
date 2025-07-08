import { useState } from 'react';
import axios from 'axios';
import { number } from 'prop-types';

const ProductForm = ({ addProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  function handleChangeTitle(event) {
    const productTitle = event.target.value;
    setTitle(productTitle);
  }

  function handleChangePrice(event) {
    const productPrice = event.target.value;
    setPrice(productPrice);
  }

  function handleChangeDescription(event) {
    const productDescription = event.target.value;
    setDescription(productDescription);
  }

  function handleChangeCategory(event) {
    const productCategory = event.target.value;
    setCategory(productCategory);
  }

  function handleChangeImage(event) {
    const productImage = event.target.value;
    setImage(productImage);
  }

  function handleSubmit(event) {
    const API_URL = 'https://fakestoreapi.com/products';
    event.preventDefault();
    const newProductObj = {
      title,
      price: Number(price),
      description,
      category,
      image,
    };
    console.log(newProductObj);
    axios
      .post(API_URL, newProductObj)
      .then((r) => addProduct(r.data))
      .catch((e) => console.log(e));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col bg-white p-4'>
        <h3>Add new product!</h3>
        <label htmlFor='title'>title</label>
        <input
          type='text'
          id='title'
          onChange={handleChangeTitle}
          className='border border-slate-200'
        />
        <label htmlFor='price'>price</label>
        <input
          type='text'
          id='price'
          onChange={handleChangePrice}
          className='border border-slate-200'
        />
        <label htmlFor='description'>description</label>
        <input
          type='text'
          id='description'
          onChange={handleChangeDescription}
          className='border border-slate-200'
        />
        <label htmlFor='category'>category</label>
        <input
          type='text'
          id='category'
          onChange={handleChangeCategory}
          className='border border-slate-200'
        />
        <label htmlFor='image'>image</label>
        <input
          type='text'
          id='image'
          onChange={handleChangeImage}
          className='border border-slate-200'
        />
        <button
          type='submit'
          className='mt-8 bg-slate-500 text-white py-4 px-8'
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ProductForm;
