import React, { Component } from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from 'react-private-route';
import { Container, Menu, Segment } from 'semantic-ui-react';
import ky from 'ky';

import './App.css';
import HomeScreen from './screens/Home';
import AppScreen from './screens/App';
import ProfileScreen from './screens/Profile';
import FooterScreen from './screens/Footer';
import LogoutScreen from './screens/Logout';
import LoginScreen from './screens/Login';

import logo from './techired-logo-black.png';

const { REACT_APP_API_URL } = process.env;

class App extends Component {
  getAuthenticated = () => !!localStorage.getItem('token');

  handleLogout = e => {
    const { history } = this.props;
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    history.push('/login');
  };

  render() {
    const fixed = true;

    const isLoggedIn = this.getAuthenticated();

    return (
      <div
        className="App"
        style={{
          minHeight: '90vh'
        }}
      >
        <Segment>
          <Menu fixed="top" pointing={!fixed} secondary={!fixed} size="large">
            <Container>
              <Menu.Item as="a">
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      maxHeight: '1rem'
                    }}
                  />
                </Link>
              </Menu.Item>
              <Menu.Menu position="right">
                {isLoggedIn ? (
                  <div onClick={() => this.handleLogout()}>Logout</div>
                ) : (
                  ''
                )}
              </Menu.Menu>
            </Container>
          </Menu>
        </Segment>

        {/* This is the main body */}
        <div
          style={{
            minHeight: '100vh'
          }}
        >
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <PrivateRoute
              path="/app"
              component={AppScreen}
              isAuthenticated={isLoggedIn}
            />
            <Route path="/login" component={LoginScreen} />
            <Route path="/logout" component={LogoutScreen} />
            <Route path="/profile/:login" component={ProfileScreen} />
          </Switch>
        </div>
        <FooterScreen />
      </div>
    );
  }
}

export default withRouter(App);
