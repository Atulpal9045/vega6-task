import React, { useState, useEffect } from "react";
import axios from "axios";

const Comment = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyText, setReplyText] = useState({});
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/comments/${blogId}`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment || !author) return;

        try {
            await axios.post(`http://localhost:4000/comments/${blogId}`, {
                text: newComment,
                author
            });
            setNewComment("");
            setAuthor("");
            fetchComments(); 
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        if (!replyText[commentId]) return;

        try {
            await axios.post(`http://localhost:4000/comments/${blogId}/${commentId}/reply`, {
                text: replyText[commentId],
                author
            });
            setReplyText({ ...replyText, [commentId]: "" });
            fetchComments();
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h4>Comments</h4>

            {/* New Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Your Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-primary">Comment</button>
            </form>

       
            {comments.map((comment) => (
                <div key={comment._id} className="card mb-2">
                    <div className="card-body">
                        <h6>{comment.author}</h6>
                        <p>{comment.text}</p>

              
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Write a reply..."
                            value={replyText[comment._id] || ""}
                            onChange={(e) =>
                                setReplyText({ ...replyText, [comment._id]: e.target.value })
                            }
                        />
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleReplySubmit(comment._id)}
                        >
                            Reply
                        </button>

                 
                        {comment.replies?.length > 0 && (
                            <div className="mt-2">
                                <h6>Replies:</h6>
                                {comment.replies.map((reply, index) => (
                                    <div key={index} className="border-start ps-3">
                                        <h6>{reply.author}</h6>
                                        <p>{reply.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comment;
