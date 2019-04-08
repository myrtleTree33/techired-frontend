import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

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
    const user = await auth.getUser();
    const accessToken = await auth.getAccessToken();
    sessionStorage.setItem('accessToken', accessToken);
    this.setState({ authenticated, user });
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
      await this.props.auth.logout('/');
      this.setState({
        user: false,
        authenticated: false
      });
      document.location.reload();
    } catch (e) {}
  }

  render() {
    const { user, authenticated } = this.state;

    if (authenticated === null) return null;
    return (
      <div>
        {authenticated ? (
          // <Button as="a" onClick={this.logout}>
          //   Logout
          // </Button>

          <Dropdown item text={`${user.name}`}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/account">Account</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div>
            {' '}
            <Button onClick={this.login} as="a">
              Login
            </Button>
            <Button
              onClick={this.login}
              as="a"
              primary
              style={{ marginLeft: '0.5em' }}
            >
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
