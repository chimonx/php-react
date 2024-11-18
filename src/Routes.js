import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import PostList from './components/PostList';

function Routes() {
  return (
    <Router basename={'/1650901455-react'}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/posts" component={PostList} />
        <Route path="/" component={App} /> {/* Default route */}
      </Switch>
    </Router>
  );
}

export default Routes;
