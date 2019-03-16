import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const Profile = ({ login }) => {
  console.log(`Login: ${login}`);
  return <Container>This is the profile component for {`${login}`}</Container>;
};

export default Profile;
