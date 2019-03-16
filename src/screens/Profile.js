import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../components/profile/Profile';

const ProfileScreen = props => {
  const { login } = props.match.params;
  return <Profile login={login} />;
};

ProfileScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default ProfileScreen;
