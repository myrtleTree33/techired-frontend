import React from 'react';
import PropTypes from 'prop-types';
import { Label, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const Follower = withRouter(({ history, followerLogin }) => {
  const handleOnClick = () => {
    history.push(`/profile/${followerLogin}`);
  };

  return (
    <Label style={{ margin: '.2rem' }} onClick={handleOnClick}>
      {followerLogin}
    </Label>
  );
});

const FollowersWidget = ({ followerLogins = [] }) => {
  return (
    <Segment>
      <h2>Followers</h2>
      {followerLogins.splice(0, 50).map(f => (
        <Follower followerLogin={f} />
      ))}
    </Segment>
  );
};

export default FollowersWidget;
