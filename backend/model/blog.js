const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  });

  module.exports = mongoose.model('Blog', BlogSchema);
  