import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import PostForm from './PostForm';
import PostItem from './PostItem';

function PostList({ username }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch posts from Firestore
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsArray);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filtered posts based on the search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery) ||
    post.content.toLowerCase().includes(searchQuery) ||
    post.username.toLowerCase().includes(searchQuery) // Search by username
  );

  return (
    <div>
      <div style={styles.formContainer}>
        <PostForm username={username} onPostAdded={fetchPosts} />
      </div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      {filteredPosts.map(post => (
        <PostItem key={post.id} post={post} onPostDeleted={fetchPosts} username={username} />
      ))}
    </div>
  );
}

const styles = {
  formContainer: {
    marginBottom: '10px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
  },
};

export default PostList;
