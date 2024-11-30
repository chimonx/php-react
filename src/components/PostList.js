import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import PostForm from './PostForm';
import PostItem from './PostItem';

function PostList({ username, isAuthenticated }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(postsArray);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      marginTop: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#007bff',
    },
    searchBar: {
      marginBottom: '20px',
    },
    postCard: {
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
    },
    cardBody: {
      padding: '20px',
    },
    noPosts: {
      textAlign: 'center',
      color: '#6c757d',
    },
  };

  return (
    <div style={styles.container} className="container">
      {isAuthenticated && (
        <div style={styles.postForm}>
          <PostForm username={username} onPostAdded={fetchPosts} />
        </div>
      )}

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          className="form-control"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Post Feed */}
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} style={styles.postCard} className="card">
              <div style={styles.cardBody}>
                <PostItem
                  post={post}
                  username={username}
                  isAuthenticated={isAuthenticated}
                  onPostDeleted={fetchPosts}
                />
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default PostList;
