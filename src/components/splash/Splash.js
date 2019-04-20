import React from 'react';
import PropTypes from 'prop-types';

import TypedText from './TypedText';

import logo from '../../techired-logo-black.png';
import { Button } from 'semantic-ui-react';

const Splash = props => {
  // slide one
  const SlideOne = props => {
    const { onLogin } = props;
    return (
      <div
        style={{
          background: '#ffd800',
          minHeight: '120vh',
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
            Hire faster. Hire better. Get stuff done.
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

  // slide two
  const SlideTwo = props => {
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
          <h2>How it works</h2>
          <div
            style={{
              fontSize: '1.2em',
              lineHeight: '2em'
            }}
          >
            <ol>
              <li>
                Techired collects public information from the web, about
                developers you should meet.
              </li>
              <li>
                We've build a meta-search engine, for you to find top users
                easily from their online activity.
              </li>
              <li>Curate top developers, and contact them directly.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  };

  // slide three
  const SlideThree = props => {
    const { onLogin } = props;
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
          <h2>Not convinced? Give us a spin!</h2>
          <div
            style={{
              marginTop: '4rem'
            }}
          >
            <Button size="huge" color="black" onClick={() => onLogin()}>
              Sign up now
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SlideOne {...props} />
      <SlideTwo {...props} />
      <SlideThree {...props} />
    </div>
  );
};

export default Splash;
