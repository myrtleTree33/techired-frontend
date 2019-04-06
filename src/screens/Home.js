import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Home from '../components/home/Home';
import Splash from '../components/splash/Splash';
import withAuth from '@okta/okta-react/dist/withAuth';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };

    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  async checkAuthentication() {
    const { auth } = this.props;
    const authenticated = await auth.isAuthenticated();
    this.setState({ authenticated });
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  render() {
    const { authenticated } = this.state;
    return authenticated ? <Home /> : <Splash />;
  }
}

HomeScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default withAuth(HomeScreen);
