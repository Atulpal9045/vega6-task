const express = require("express");
const blog = require("../model/blog");
const comment = require("../model/comment");
const router = express.Router();

router.post("/:blogId", async (req, res) => {
    try {
        const { text, author } = req.body;
        const { blogId } = req.params;
        const blogDetail = await blog.findById(blogId);
        if (!blogDetail) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const newComment = new comment({ blogId, text, author });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:blogId", async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await comment.find({ blogId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/:blogId/:commentId/reply", async (req, res) => {
    try {
        const { text, author } = req.body;
        const { commentId } = req.params;
        const parentComment = await comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const reply = { text, author, createdAt: new Date() };
        parentComment.replies.push(reply);
        await parentComment.save();
        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
