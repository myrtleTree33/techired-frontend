import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Divider } from 'semantic-ui-react';
import SubscribeSplash from './SubscribeSplash';

const Subscription = ({ account }) => {
  const { email } = account;
  const isSubscribed = false;
  return (
    <Segment basic>
      <h2>Tool Subscription</h2>
      {isSubscribed ? (
        <div>hihi</div>
      ) : (
        <div>
          <div>You are currently not subscribed.</div>
          <Divider hidden />
          <SubscribeSplash />
        </div>
      )}
    </Segment>
  );
};

export default Subscription;
