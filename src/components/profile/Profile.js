import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Card, Image, Icon, Segment } from 'semantic-ui-react';
import moment from 'moment';
import FollowersWidget from './FollowersWidget';

const Profile = ({ profile }) => {
  const {
    login,
    name,
    profilePic,
    createdAt,
    bio,
    blog,
    numFollowers,
    followerLogins
  } = profile || {};
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
    <Container
      style={{
        marginTop: '2rem'
      }}
    >
      <Grid stackable columns="equal">
        <Grid.Column>
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
                <Icon name="user" />
                {numFollowers} Followers
              </Card.Content>
            </Card>
          </Segment>
        </Grid.Column>

        <Grid.Column width={10}>
          <Segment basic>
            <FollowersWidget followerLogins={followerLogins} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Profile;
