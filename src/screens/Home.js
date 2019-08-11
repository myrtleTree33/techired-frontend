import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ky from 'ky';

import Splash from '../components/splash/Splash';

const { REACT_APP_API_URL } = process.env;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  checkUserIsValid = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    // Login user
    try {
      const res = await ky
        .get(`${REACT_APP_API_URL}/user`, {
          headers: {
            Authorization: `JWT ${token}`
          }
        })
        .json();
      console.error('Valid user; redirecting to /app');
      history.push('/app');

      // Invalid user
    } catch (e) {
      const { status, statusText } = e.response;
      console.log(status, statusText);

      // Invalidate email and tokens
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    }
  };

  async componentDidMount() {
    await this.checkUserIsValid();
  }

  render() {
    return <Splash />;
  }
}

HomeScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default withRouter(HomeScreen);
