import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const Profile = ({ login }) => {
  return <Container>This is the profile component for {`${login}`}</Container>;
};

export default Profile;
