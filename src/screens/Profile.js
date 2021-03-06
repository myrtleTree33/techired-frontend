import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';

import Profile from '../components/profile/Profile';

const { REACT_APP_API_URL } = process.env;

class ProfileScreen extends Component {
  state = {
    profile: null
  };

  getProfile = async profile => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
      return;
    }

    // Login user
    try {
      const profileRes = await ky
        .get(`${REACT_APP_API_URL}/profiles/${profile}`, {
          headers: {
            Authorization: `JWT ${token}`
          }
        })
        .json();

      // Return profile
      return profileRes;

      // Forbidden
    } catch (e) {
      // Invalidate email and tokens
      localStorage.removeItem('email');
      localStorage.removeItem('token');

      history.push('/');
    }
  };

  getRepos = async profile => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
      return;
    }

    // Login user
    try {
      const reposRes = await ky
        .get(`${REACT_APP_API_URL}/profiles/${profile}/repos?page=1`, {
          headers: {
            Authorization: `JWT ${token}`
          }
        })
        .json();

      // Return profile
      return reposRes;

      // Forbidden
    } catch (e) {
      // Invalidate email and tokens
      localStorage.removeItem('email');
      localStorage.removeItem('token');

      history.push('/');
    }
  };

  async componentDidMount() {
    const { login } = this.props.match.params;
    const [profile, repos] = await Promise.all([
      this.getProfile(login),
      this.getRepos(login)
    ]);
    this.setState({ profile, repos });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { login } = this.props.match.params;

    if (!prevState || !prevState.profile) {
      return;
    }

    const {
      profile: { login: prevLogin }
    } = prevState;

    if (login === prevLogin) {
      return;
    }

    const [profile, repos] = await Promise.all([
      this.getProfile(login),
      this.getRepos(login)
    ]);
    this.setState({ profile, repos });
  }

  render() {
    const { profile, repos } = this.state;
    return <Profile profile={profile} repos={repos} />;
  }
}

ProfileScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default ProfileScreen;
