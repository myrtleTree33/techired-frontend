import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Splash from '../components/splash/Splash';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Splash />;
  }
}

HomeScreen.propTypes = {
  //   name: PropTypes.string.isRequired
};

export default HomeScreen;
