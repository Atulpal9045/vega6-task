// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';

function App() {
  return (
    <Router>
    <div className='container mt-4'>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
        <Route path='/blogs/edit/:id' element={<EditBlog />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
