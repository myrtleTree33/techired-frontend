import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Card, Image, Icon, Segment } from 'semantic-ui-react';
import moment from 'moment';
import FollowersWidget from './FollowersWidget';

const SnapshotWidget = ({ profile }) => {
  const { login, name, profilePic, createdAt, bio, blog, numFollowers } =
    profile || {};
  console.log(profile);

  const sanitizeUrl = blog => {
    const prefix = 'http://';
    let s = blog;
    if (s.substr(0, prefix.length) !== prefix) {
      s = prefix + s;
    }
    return s;
  };

  return (
    <Segment basic>
      <Card>
        <Image src={profilePic} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{`${login} (${name})`}</Card.Header>
          <Card.Meta>
            <span className="date">
              {'Joined ' + moment(createdAt).format('MMMM D, YYYY')}
            </span>
          </Card.Meta>
          <Card.Description>{bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a onClick={() => (window.location.href = sanitizeUrl(blog))}>
            Website: {blog}
          </a>
        </Card.Content>
        <Card.Content extra>
          <a
            onClick={() =>
              (window.location.href = `https://www.github.com/${login}`)
            }
          >
            GitHub: {login}
          </a>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          {numFollowers} Followers
        </Card.Content>
      </Card>
    </Segment>
  );
};

export default SnapshotWidget;
