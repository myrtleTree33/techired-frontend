import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';

import './App.css';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import AccountScreen from './screens/Account';
import LogoutScreen from './screens/Logout';
import LoginWidget from './components/LoginWidget/LoginWidget';

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
      <Security
        issuer={config.issuer}
        client_id={config.client_id}
        redirect_uri={config.redirect_uri}
      >
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
                  <LoginWidget />
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
              <Route path="/implicit/callback" component={ImplicitCallback} />

              <Route path="/profile/:login" component={ProfileScreen} />
              <Route path="/account" component={AccountScreen} />
              <Route path="/logout" component={LogoutScreen} />
            </Switch>
          </div>
        </div>
      </Security>
    );
  }
}

export default withRouter(App);
