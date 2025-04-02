const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [
        {
            text: String,
            author: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("Comment", commentSchema);
