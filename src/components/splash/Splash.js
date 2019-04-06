import React from 'react';
import PropTypes from 'prop-types';
import App from '../app/App';

const Splash = () => {
  return (
    <div
      style={{
        background: '#ff0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '50%',
          textAlign: 'center'
        }}
      >
        <h1>Techired.co</h1>
        <span>Tech talent meta-search engine</span>
      </div>
    </div>
  );
};

export default Splash;
