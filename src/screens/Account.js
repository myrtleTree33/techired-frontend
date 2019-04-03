import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuth } from '@okta/okta-react';

import Account from '../components/account/Account';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const { auth } = this.props;
    const authenticated = await auth.isAuthenticated();
    this.setState({ authenticated });

    console.log('--- token ---');
    console.log(await auth.getAccessToken());
    console.log(await auth.getUser());
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  async login() {
    const { auth } = this.props;
    // Redirect to '/' after login
    auth.login('/');
  }

  async logout() {
    const { auth } = this.props;
    // Redirect to '/' after logout
    auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;
    return (
      <div>
        <Account />
        {this.state.authenticated ? (
          <button onClick={this.logout}>Logout</button>
        ) : (
          <button onClick={this.login}>Login</button>
        )}
      </div>
    );
  }
}

AccountScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default withAuth(AccountScreen);
