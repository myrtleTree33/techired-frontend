import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Label, Menu, Table, Button } from 'semantic-ui-react';

function translateTick(toggle) {
  return toggle === 1 ? (
    <Icon color="green" name="checkmark" size="large" />
  ) : (
    <span />
  );
}

const SubscribeSplash = () => {
  const features = [['Show real name', 0, 1], ['Twitter link', 0, ]];

  return (
    <div>
      <h3>Benefits of subscription</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Feature</Table.HeaderCell>
            <Table.HeaderCell>Free</Table.HeaderCell>
            <Table.HeaderCell>Paid {'($300 monthly)'}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {features.map((f, i) => (
            <Table.Row key={i}>
              <Table.Cell>{f[0]}</Table.Cell>
              <Table.Cell>{translateTick(f[1])}</Table.Cell>
              <Table.Cell>{translateTick(f[2])}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button primary size="massive">
        Subscribe now
      </Button>
    </div>
  );
};

export default SubscribeSplash;
