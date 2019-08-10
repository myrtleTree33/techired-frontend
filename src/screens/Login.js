import React from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import { withRouter } from 'react-router-dom';

import Login from '../components/login/Login';

const { REACT_APP_API_URL } = process.env;

const LoginScreen = withRouter(props => {
  const { history } = props;

  const onCreateNewUser = () => {
    console.log('create user called');
  };

  const onLoginUser = async ({ email, password }) => {
    // Login user
    try {
      const res = await ky
        .post(`${REACT_APP_API_URL}/auth/classic/token`, {
          json: {
            email,
            password
          }
        })
        .json();

      const { token, user } = res;

      // Store email and tokens
      localStorage.setItem('email', user.email);
      localStorage.setItem('token', token);

      history.push('/app');

      // Invalid user
    } catch (e) {
      const { status, statusText } = e.response;

      // Invalidate email and tokens
      localStorage.removeItem('email');
      localStorage.removeItem('token');

      // TODO include reason here and pass as result
    }
  };

  return <Login onCreateNewUser={onCreateNewUser} onLoginUser={onLoginUser} />;
});

LoginScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default LoginScreen;
