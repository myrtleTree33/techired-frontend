import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

/* Color Theme Swatches in Hex */
const colorThemes = {
  color0: '#ffff00',
  color1: '#F3BD1C',
  color2: '#FFDA53',
  color3: '#CCD0D1',
  color4: '#8C959E',
  color5: '#1C201F'
};

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: colorThemes.color5,
        // color: colorThemes.color1,
        color: colorThemes.color0,
        padding: '2rem 0',
        textAlign: 'center',
        marginTop: '2rem'
      }}
    >
      <Container>Techired.</Container>
    </div>
  );
};

export default Footer;
