import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Home from '../components/home/Home';
import Splash from '../components/splash/Splash';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.login = this.login.bind(this);
  }

  async login() {
    const { auth } = this.props;
    try {
      auth.login('/');
    } catch (e) {}
  }

  render() {
    // const { authenticated } = this.state;
    // return authenticated ? (
    //   <Home auth={this.props.auth} />
    // ) : (
    //   <Splash onLogin={this.login} />
    // );
    return <Home />;
  }
}

HomeScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default HomeScreen;
