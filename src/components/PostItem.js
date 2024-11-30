import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { doc, deleteDoc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import CommentSection from './CommentSection';

function PostItem({ post, onPostDeleted, username, isAuthenticated }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [editedContent, setEditedContent] = useState(post.content); // State for edited content

  useEffect(() => {
    const fetchLikes = async () => {
      const postRef = doc(db, 'posts', post.id);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setLikes(postData.likes || 0);
        if (isAuthenticated) {
          setIsLiked(postData.likedBy?.includes(username) || false);
        }
      }
    };
    fetchLikes();
  }, [post.id, username, isAuthenticated]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      Swal.fire('Error', 'You need to log in to like posts.', 'error');
      return;
    }

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
      Swal.fire('Error', 'Failed to update likes. Please try again.', 'error');
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = async () => {
    if (!isAuthenticated) {
      Swal.fire('Error', 'You need to log in to delete posts.', 'error');
      return;
    }

    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (confirmDelete.isConfirmed) {
      const postRef = doc(db, 'posts', post.id);
      try {
        await deleteDoc(postRef);
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        onPostDeleted();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete post. Please try again.', 'error');
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEdit = async () => {
    const postRef = doc(db, 'posts', post.id);
    try {
      await updateDoc(postRef, {
        content: editedContent,
      });
      Swal.fire('Success', 'Post updated successfully!', 'success');
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      Swal.fire('Error', 'Failed to update post. Please try again.', 'error');
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">{post.title}</h5>
        {!isEditing ? (
          <p className="card-text">{post.content}</p>
        ) : (
          <textarea
            className="form-control"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        )}
        <p className="text-muted">Posted by: {post.username}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-warning btn-sm me-2" onClick={handleLike}>
              {isLiked ? 'Unlike' : 'Like'} ({likes})
            </button>
            {isAuthenticated && post.username === username && !isEditing && (
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => setIsEditing(true)}
              >
                Edit Post
              </button>
            )}
            {isEditing && (
              <button className="btn btn-success btn-sm me-2" onClick={handleEdit}>
                Save Changes
              </button>
            )}
          </div>
          {isAuthenticated && post.username === username && (
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Delete Post
            </button>
          )}
        </div>
        {/* Show comment section */}
        <CommentSection postId={post.id} username={username} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}

export default PostItem;
