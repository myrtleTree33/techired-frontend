import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuth } from '@okta/okta-react';
import { Button, Container } from 'semantic-ui-react';

class LoginWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.checkAuthentication();
    }, 200);
  }

  async checkAuthentication() {
    const { auth } = this.props;
    const authenticated = await auth.isAuthenticated();
    this.setState({ authenticated });
  }

  async login() {
    const { auth } = this.props;
    try {
      auth.login('/');
    } catch (e) {}
  }

  async logout() {
    const { auth } = this.props;
    try {
      auth.logout('/logout');
    } catch (e) {}
  }

  render() {
    if (this.state.authenticated === null) return null;
    return (
      <div>
        {this.state.authenticated ? (
          <Button as="a" onClick={this.logout}>
            Logout
          </Button>
        ) : (
          <div>
            {' '}
            <Button onClick={this.login} as="a">
              Login
            </Button>
            <Button as="a" primary style={{ marginLeft: '0.5em' }}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    );
  }
}

LoginWidget.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default withAuth(LoginWidget);
