import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ky from 'ky';

import User from '../components/user/User';

const { REACT_APP_API_URL } = process.env;

class UserScreen extends Component {
  state = {
    user: null
  };

  getUser = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    // Login user
    try {
      const user = await ky
        .get(`${REACT_APP_API_URL}/user`, {
          headers: {
            Authorization: `JWT ${token}`
          }
        })
        .json();

      // Return user
      return user;

      // Invalid user
    } catch (e) {
      // Invalidate email and tokens
      localStorage.removeItem('email');
      localStorage.removeItem('token');

      history.push('/');
    }
  };

  async componentDidMount() {
    const user = await this.getUser();
    this.setState({ ...user });
  }

  render() {
    const { user } = this.state;
    return <User user={user} />;
  }
}

UserScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default withRouter(UserScreen);
