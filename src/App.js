import React, { Component } from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';

import './App.css';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import AccountScreen from './screens/Account';

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
    const fixed = true;
    return (
      <div className="App">
        <Segment>
          <Menu
            fixed="top"
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Item as="a">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item as="a">
                <Link to="/account">Account</Link>
              </Menu.Item>
              <Menu.Item position="right">
                <Button as="a" inverted={!fixed}>
                  Log in
                </Button>
                <Button
                  as="a"
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
        {/* <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        /> */}

        {/* This is the main body */}
        <div
          style={{
            marginTop: '3rem'
          }}
        >
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/profile/:login" component={ProfileScreen} />
            <Route path="/account" component={AccountScreen} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
