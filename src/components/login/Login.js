import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Container } from 'semantic-ui-react';

import Signin from './Signin';
import Signup from './Signup';

const Login = ({ onCreateNewUser, onLoginUser }) => {
  const panes = [
    {
      menuItem: 'Sign Up',
      render: () => (
        <Tab.Pane>
          <Signup onCreateNewUser={onCreateNewUser} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Login',
      render: () => (
        <Tab.Pane>
          <Signin onLoginUser={onLoginUser} />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Container
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Tab
        panes={panes}
        style={{
          minWidth: '350px',
          maxWidth: '350px'
        }}
      />
    </Container>
  );
};

export default Login;
