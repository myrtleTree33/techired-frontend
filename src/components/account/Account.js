import React from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import Subscription from './Subscription';

const Account = ({ account }) => {
  const { email } = account;
  return (
    <Container>
      <Segment basic>Welcome, {email}!</Segment>

      <Subscription account={account} />
    </Container>
  );
};

export default Account;
