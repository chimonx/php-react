import React, { useEffect, useState } from 'react';
import PostList from './components/PostList';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Check for an existing session on load
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLoginSuccess = (loggedInUsername) => {
    setIsAuthenticated(true);
    setUsername(loggedInUsername);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('username'); // Remove the username from localStorage
      setIsAuthenticated(false);
      setUsername('');
    }
  };

  return (
    <div className="container">
      <h1>Post Management App</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {username}!</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <PostList username={username} />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
