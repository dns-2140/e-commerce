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

  function handleClickDelete() {
    console.log('handleclickdelete');
  }

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
  console.log(product);
  return (
    <>
      <div>
        {product && (
          <>
            <span onClick={() => navigate(`/`)}>go back</span>
            <img src={product.image} alt='' width={128} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <div onClick={handleClickUpdate}>update</div>
            <div onClick={handleClickDelete}>delete</div>

            {isEditing && (
              <form onSubmit={handleSubmit}>
                <label htmlFor='title'>title</label>
                <input
                  type='text'
                  name='title'
                  placeholder='xyz'
                  onChange={handleInputChange}
                  id='title'
                  value={formData.title}
                />

                <label htmlFor='price'>price</label>
                <input
                  type='text'
                  name='price'
                  id='price'
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  id='description'
                  onChange={handleInputChange}
                />
                <label htmlFor='category'>category</label>
                <input
                  type='text'
                  name='category'
                  value={formData.category}
                  id='category'
                  onChange={handleInputChange}
                />
                <button type='submit'>submit</button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
