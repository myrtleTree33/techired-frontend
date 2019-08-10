import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Home from '../components/home/Home';
import Splash from '../components/splash/Splash';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Home />;
  }
}

HomeScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default HomeScreen;
