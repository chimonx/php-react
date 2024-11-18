import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, deleteDoc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import CommentSection from './CommentSection';

function PostItem({ post, onPostDeleted, username }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const postRef = doc(db, 'posts', post.id);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setLikes(postData.likes || 0);
        setIsLiked(postData.likedBy?.includes(username) || false);
      }
    };
    fetchLikes();
  }, [post.id, username]);

  const handleLike = async () => {
    const postRef = doc(db, 'posts', post.id);
    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: likes - 1,
          likedBy: arrayRemove(username),
        });
        setLikes(likes - 1);
      } else {
        await updateDoc(postRef, {
          likes: likes + 1,
          likedBy: arrayUnion(username),
        });
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const postRef = doc(db, 'posts', post.id);
      try {
        await deleteDoc(postRef);
        alert('Post deleted successfully!');
        onPostDeleted();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Posted by: {post.username}</p>
      <div className="button-container">
        <button className="like-btn" onClick={handleLike}>
          {isLiked ? 'Unlike' : 'Like'} ({likes})
        </button>
        {post.username === username && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete Post
          </button>
        )}
      </div>
      <CommentSection postId={post.id} username={username} />
    </div>
  );
}

export default PostItem;
