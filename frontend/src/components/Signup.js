import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/user/signup', { email, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;