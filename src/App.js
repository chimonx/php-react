import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import PostList from './components/PostList';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

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
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <Router>
      <MainApp
        isAuthenticated={isAuthenticated}
        username={username}
        handleLoginSuccess={handleLoginSuccess}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

function MainApp({ isAuthenticated, username, handleLoginSuccess, handleLogout }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      document.body.classList.add('no-scroll'); // Disable scrolling on login page
    } else {
      document.body.classList.remove('no-scroll'); // Enable scrolling on other pages
    }

    return () => {
      document.body.classList.remove('no-scroll'); // Cleanup on unmount
    };
  }, [location.pathname]);

  return (
    <div>
      {/* Show navigator only if not on the login page */}
      {location.pathname !== '/login' && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <Link className="navbar-brand text-primary" to="/">
              Post App
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">Welcome, {username}!</span>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger btn-sm nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container mt-4">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/"
            element={<PostList username={username} isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
