import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/user/login', { email, password });
      localStorage.setItem('token', response.data?.token);
      if(response.data?.user) localStorage.setItem('user', JSON.stringify(response.data?.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
    </div>
  );
};

export default Login;