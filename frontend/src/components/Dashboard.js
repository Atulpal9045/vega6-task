import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user) navigate('/login')
  }, [user])

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className='container'>
      <h2>Dashboard</h2>
      {user && (
        <div className='d-flex justify-content-between align-items-center'>
          <h4>Welcome, {user.email}</h4>
          {/* <img src={user.profileImage} alt='Profile' className='rounded-circle' width='50' height='50' /> */}
          <button className='btn btn-secondary' onClick={handleLogout}>logout</button>
        </div>
        
      )}
      
      <Link to='/blogs' className='btn btn-primary mt-3'>View Blogs</Link>
    </div>
  );
};

export default Dashboard;