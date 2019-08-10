import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';

import './App.css';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import FooterScreen from './screens/Footer';
import LogoutScreen from './screens/Logout';

import logo from './techired-logo-black.png';

const { REACT_APP_OKTA_CLIENT_ID, REACT_APP_OKTA_ORG_URL } = process.env;

const config = {
  issuer: `${REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: `${REACT_APP_OKTA_CLIENT_ID}`
};

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   // TODO refactor this if needed
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

class App extends Component {
  render() {
    const fixed = true;
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
              <Menu.Menu position="right">Login here</Menu.Menu>
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
            minHeight: '100vh'
          }}
        >
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/implicit/callback" component={ImplicitCallback} />

            <Route path="/profile/:login" component={ProfileScreen} />
            <Route path="/logout" component={LogoutScreen} />
          </Switch>
        </div>
        <FooterScreen />
      </div>
    );
  }
}

export default withRouter(App);
