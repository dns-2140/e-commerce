import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId;
  const API_URL = `https://fakestoreapi.com/products/${productId}`;
  console.log(API_URL);

  function handleClickUpdate(event) {
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    });
    setIsEditing(true);
  }

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(API_URL);
      navigate('/'); // Redirect to home page after successful deletion
    } catch (error) {
      setError(error);
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios(API_URL);
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      image: product.image,
      rating: product.rating,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(API_URL, formData);
      setProduct(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) return 'Loading..';
  if (error) return 'error';

  return (
    <>
      <div className='p-4 flex flex-col gap-8'>
        {product && (
          <>
            <span onClick={() => navigate(`/`)}> go back</span>
            <img src={product.image} alt='' width={256} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>$ {product.price}</p>
            <div
              onClick={handleClickUpdate}
              className='bg-blue-500 text-white px-4 py-2'
            >
              update
            </div>
            <div
              onClick={handleClickDelete}
              className='bg-red-500 text-white px-4 py-2'
            >
              delete
            </div>

            {isEditing && (
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <label htmlFor='title'>title</label>
                <input
                  type='text'
                  name='title'
                  placeholder='xyz'
                  onChange={handleInputChange}
                  id='title'
                  value={formData.title}
                  className='border border-slate-200'
                />

                <label htmlFor='price'>price</label>
                <input
                  type='text'
                  name='price'
                  id='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  className='border border-slate-200'
                />
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  id='description'
                  onChange={handleInputChange}
                  className='border border-slate-200'
                />
                <label htmlFor='category'>category</label>
                <input
                  type='text'
                  name='category'
                  value={formData.category}
                  id='category'
                  onChange={handleInputChange}
                  className='border border-slate-200'
                />
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2'
                >
                  submit
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
