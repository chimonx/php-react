import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function CommentSection({ postId, username }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Function to fetch comments from Firestore
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts', postId, 'comments'));
        const commentsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsArray);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === '') return; // Prevent empty comments

    try {
      // Add comment to Firestore with the username
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        text: comment,
        username, // Include the username in the comment
        createdAt: new Date().toISOString(),
      });
      setComment(''); // Clear input after submission

      // Re-fetch comments to update the UI
      const querySnapshot = await getDocs(collection(db, 'posts', postId, 'comments'));
      const commentsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsArray);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          required
        />
        <button type="submit">Comment</button>
      </form>
      <div>
        {comments.map((comment) => (
          <p key={comment.id}>
            <strong>{comment.username}:</strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
