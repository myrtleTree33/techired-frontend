import React from 'react';
import PropTypes from 'prop-types';
import App from '../app/App';

const Home = ({ auth }) => {
  return <App auth={auth} />;
};

export default Home;
