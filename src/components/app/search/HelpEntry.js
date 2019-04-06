import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Divider } from 'semantic-ui-react';

const HelpEntry = ({ query, description }) => {
  return (
    <div>
      <div>
        <code>{query}</code>
      </div>
      <div>{description}</div>
      <Divider hidden />
    </div>
  );
};

export default HelpEntry;
