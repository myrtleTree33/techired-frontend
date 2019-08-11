import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from 'semantic-ui-react';

const User = ({ user }) => {
  const { email, dateJoined } = user || {};
  console.log(user);

  return (
    <Container
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div>
        <h1>Profile</h1>
        <p>
          Welcome back, <em>{`${email}`}</em>!
        </p>
        <p>
          You are on the <Label color="blue">basic</Label> plan.
        </p>
      </div>
    </Container>
  );
};

export default User;
