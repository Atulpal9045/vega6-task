import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'))
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/blogs', { title, image, description, author: user?.id });
    navigate('/blogs');
  };

  return (
    <div className='container'>
      <h2>Create Blog</h2>
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
        <button type='submit' className='btn btn-success'>Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;