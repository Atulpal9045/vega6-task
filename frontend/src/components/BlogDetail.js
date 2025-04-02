import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className='container'>
      <h2>{blog.title}</h2> 
      <img src={blog.image} alt='' className='img-fluid' width={200}/>
      <p>{blog.description}</p>

      <h2>Author: {blog.author?.email}</h2> 

      <Comment blogId={id} />
    </div>
  );
};

export default BlogDetail;