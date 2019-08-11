import React from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import { withRouter } from 'react-router-dom';
import passwordValidator from 'password-validator';

import Login from '../components/login/Login';

const { REACT_APP_API_URL } = process.env;

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const LoginScreen = withRouter(props => {
  const { history } = props;

  const onCreateNewUser = async ({
    firstName,
    lastName,
    email,
    password,
    passwordCfm,
    receivePromos
  }) => {
    if (!firstName || !lastName || !email || !password || !passwordCfm) {
      return { text: 'Incomplete information.' };
    }

    if (!receivePromos) {
      return { text: 'Please agree to the terms and conditions.' };
    }

    if (password !== passwordCfm) {
      return { text: 'Passwords do not match!  Please re-enter' };
    }

    if (!passwordSchema.validate(password)) {
      return {
        text: `Passwords do not obey constraints!  Please ensure password has: 
        (1) 8 or more characters
        (2) Has uppercase and lowercase characters
        (3) Has digits
        (4) No spaces`
      };
    }

    // TODO proceed to create new user
    try {
      // Create new user
      const res = await ky
        .post(`${REACT_APP_API_URL}/auth/classic/new`, {
          json: {
            email,
            password,
            details: {
              firstName,
              lastName
            }
          }
        })
        .json();

      // Login user and go to app
      await onLoginUser({ email, password });

      // Invalid user
    } catch (e) {
      const { status, statusText } = e.response;
      console.log(status, statusText);
      return { text: 'Error creating user.  Please try again.' };
    }
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

      return { text: 'Invalid username or password' };
    }
  };

  return <Login onCreateNewUser={onCreateNewUser} onLoginUser={onLoginUser} />;
});

LoginScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default LoginScreen;
