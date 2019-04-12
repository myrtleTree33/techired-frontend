import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Label, Menu, Table, Button } from 'semantic-ui-react';

const SubscribeSplash = () => {
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
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>
              <Icon color="green" name="checkmark" size="large" />
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary size="massive">
        Subscribe now
      </Button>
    </div>
  );
};

export default SubscribeSplash;
