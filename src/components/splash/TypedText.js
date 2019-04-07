import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from '../app/App';
import Typed from 'typed.js';

class TypedText extends Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 20,
      backSpeed: 20,
      backDelay: 1200,
      shuffle: true,
      loop: true
    };
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="type-wrap" {...this.props}>
        <h2>
          Hire a{' '}
          <span
            style={{ whiteSpace: 'pre' }}
            ref={el => {
              this.el = el;
            }}
          />
        </h2>
      </div>
    );
  }
}

export default TypedText;
