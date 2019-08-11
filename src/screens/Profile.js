import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lifecycle from 'react-pure-lifecycle';

import Profile from '../components/profile/Profile';

class ProfileScreen extends Component {
  state = {
    profile: null
  };

  componentDidMount() {}

  render() {
    const { profile } = this.state;
    return <Profile profile={profile} />;
  }
}

ProfileScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default ProfileScreen;
