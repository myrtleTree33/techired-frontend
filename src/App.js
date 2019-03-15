import React, { Component } from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';

function isAuthenticated() {
  // TODO
  // return localStorage.getItem('auth');
  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  // TODO refactor this if needed
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

class App extends Component {
  /**
   * Allows the creation of a protected route, if the user is not signed in.
   * @param {*} param0
   */
  render() {
    return (
      <div className="App">
        <header>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </header>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
