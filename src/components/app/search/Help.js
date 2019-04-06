import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Grid, Modal, Divider } from 'semantic-ui-react';
import HelpEntry from './HelpEntry';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.triggerClose = this.triggerClose.bind(this);
    this.triggerHelp = this.triggerHelp.bind(this);
  }

  triggerHelp(e) {
    e.preventDefault();
    console.log('hihi');
    this.setState({ open: true });
  }

  triggerClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'right',
          padding: '0 .2rem'
        }}
      >
        <a onClick={this.triggerHelp}>
          <code>Help {'>'}</code>
        </a>
        <Modal size="tiny" open={this.state.open} onClose={this.triggerClose}>
          <Modal.Header>Help Snippets</Modal.Header>
          <Modal.Content>
            <HelpEntry
              query={`location: "singapore" lang.JavaScript: "0, 36" `}
              description={`
        Find developers in Singapore, with between 0 to 36 months of experience in
        JavaScript.
      `}
            />

            <HelpEntry
              query={`city: "surabaya" distance: "10000" lang.PHP: "12"  `}
              description={`
        Find developers 10km from Surabaya, with at least 12 months experience in
        PHP.
      `}
            />

            <HelpEntry
              query={`city: "hong kong" distance: "50000" lang.Java: "12"  numFollowers: "50"`}
              description={`Find developers 50km from the city of Hong Kong, with at least 50 followers and 12 months experience in Java.`}
            />
          </Modal.Content>
          <Modal.Actions />
        </Modal>
      </div>
    );
  }
}

export default Help;
