import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Signin from './Signin';

const Login = ({ onCreateNewUser, onLoginUser }) => {
  return (
    <Container
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Signin onLoginUser={onLoginUser} />
    </Container>
  );
};

export default Login;
