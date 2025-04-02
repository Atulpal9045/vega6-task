import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await axios.delete(`http://localhost:4000/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    }
  };

  return (
    <div className='container'>
      <h2>Blogs</h2>
      <Link to='/create-blog' className='btn btn-primary mb-3'>Add New Blog</Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td><img src={blog.image} alt='' width='100' /></td>
              <td>{blog.description.slice(0, 50)}...</td>
              <td>
                <Link to={`/blogs/${blog._id}`} className='btn btn-info btn-sm me-2'>View</Link>
                <Link to={`/blogs/edit/${blog._id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className='btn btn-danger btn-sm'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;