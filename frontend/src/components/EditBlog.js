import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/blogs/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setImage(response.data.image);
        setDescription(response.data.description);
      })
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/blogs/${id}`, { title, image, description });
    navigate('/blogs');
  };

  return (
    <div className='container'>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Title</label>
          <input type='text' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Image URL</label>
          <input type='text' className='form-control' value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <button type='submit' className='btn btn-success'>Update</button>
      </form>
    </div>
  );
};

export default EditBlog;