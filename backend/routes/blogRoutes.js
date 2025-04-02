const express = require('express');
const blog = require('../model/blog');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, image, description, author } = req.body;
    const newBlog = new blog({ title, image, description, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogs = await blog.find().populate('author', 'email');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id 
      const blogs = await blog.findById(id).populate('author', 'email');
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
      const { title, image, description } = req.body;
      const id = req.params.id 
      const updatedBlog = await blog.updateOne({ _id: id }, { $set: { title, image, description } });      
      res.status(201).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id 
      await blog.deleteOne({ _id: id });      
      res.status(201).json({deleted: true});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;