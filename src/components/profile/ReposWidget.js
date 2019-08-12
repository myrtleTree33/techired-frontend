import React from 'react';
import PropTypes from 'prop-types';
import { Item, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const Repo = withRouter(({ history, repo }) => {
  const {
    name,
    language,
    createdAt,
    htmlUrl,
    description,
    numForks,
    numStargazers
  } = repo;

  const handleOnClick = () => {
    window.location.href = htmlUrl;
  };

  return (
    <Item onClick={handleOnClick}>
      <Item.Content>
        <Item.Header as="a">{name}</Item.Header>
        <Item.Meta>{language}</Item.Meta>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>
          {/* {`${numForks} forked this.`} */}
          {`${numStargazers} follows. `}
          {'Created on ' + moment(createdAt).format('MMMM D, YYYY')}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
});

const ReposWidget = ({ repos = [] }) => {
  console.log(repos[0]);
  return (
    <Segment>
      <h2>Repositories</h2>
      <Item.Group>
        {repos.splice(0, 50).map(r => (
          <Repo repo={r} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ReposWidget;
