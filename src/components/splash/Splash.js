import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import TypedText from './TypedText';

import logo from '../../techired-logo-black.png';
import { MobileView, BrowserView, isMobile } from 'react-device-detect';

const Splash = props => {
  const { history } = props;

  // slide one
  const SlideOne = props => {
    return (
      <div
        style={{
          // padding: '0 2rem',
          background: '#ffd800',
          minHeight: '120vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            textAlign: 'center'
          }}
        >
          <BrowserView>
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
          </BrowserView>
          <div>
            <img
              src={logo}
              alt="logo"
              style={{
                width: '400px',
                maxWidth: '80%'
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
            <Button
              fluid={isMobile}
              size="huge"
              color="black"
              onClick={() => history.push('/login')}
              style={{
                marginBottom: '.5rem'
              }}
            >
              Login
            </Button>

            <Button
              fluid={isMobile}
              size="huge"
              color="red"
              onClick={() => history.push('/login')}
            >
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
            textAlign: 'left'
          }}
        >
          <h2>How it works</h2>
          <div
            style={{
              fontSize: '1.2em',
              lineHeight: '2em'
            }}
          >
            <p>
              We've built a search engine that finds top developers based on
              their public contributions online. To date, we have enmassed 3
              million users through our system.
            </p>

            <p>Use our system to find top developers directly.</p>
          </div>
        </div>
      </div>
    );
  };

  // slide three
  const SlideThree = props => {
    const handleSignup = () => {
      window.location.href = 'https://forms.gle/dZkoDf6bbZW2yyvB7';
    };

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
          {/* <h2>Not convinced? Give us a spin!</h2> */}
          <h2>We're in public beta. Try us now.</h2>
          <div
            style={{
              marginTop: '4rem'
            }}
          >
            <Button size="huge" color="red" onClick={() => handleSignup()}>
              Sign up now
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <MetaTags>
        <title>Page 1</title>
        <meta name="description" content="Techired.  Hire people." />
        <meta property="og:title" content="Techired.co: Search" />
        <meta property="og:image" content="../../techired-logo-black.png" />
      </MetaTags>
      <SlideOne {...props} />
      <SlideTwo {...props} />
      <SlideThree {...props} />
    </div>
  );
};

export default withRouter(Splash);
