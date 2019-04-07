import React from 'react';
import PropTypes from 'prop-types';

import TypedText from './TypedText';

import logo from '../../techired-logo-black.png';
import { Button } from 'semantic-ui-react';

const Splash = ({ onLogin }) => {
  return (
    <div
      style={{
        background: '#ffd800',
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
        <TypedText
          style={{
            marginBottom: '2rem'
          }}
          strings={[
            'software engineer in Seoul',
            'CTO in Nepal',
            'Golang engineer in Kuala Lumpur',
            'Ruby developer with 2 years of experience in Chiang Mai',
            'CTO within 10 kilometers of Busan, South Korea',
            'Java Developer in Hanoi',
            'C firmware engineer in Bangkok',
            'C++ hardware engineer in  Shenzhen'
          ]}
        />
        <div>
          <img
            src={logo}
            alt="logo"
            style={{
              maxWidth: '400px'
            }}
          />
        </div>
        <div
          style={{
            marginTop: '.5rem'
          }}
        >
          Less bullshit . Hire developers . Get stuff done .
        </div>
        <div
          style={{
            margin: '4rem'
          }}
        >
          <Button size="huge" color="black" onClick={() => onLogin()}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
