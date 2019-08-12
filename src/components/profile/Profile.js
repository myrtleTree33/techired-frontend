import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Card, Image, Icon, Segment } from 'semantic-ui-react';
import moment from 'moment';
import FollowersWidget from './FollowersWidget';
import SnapshotWidget from './SnapshotWidget';
import ShortBioWidget from './ShortBioWidge';
import ReposWidget from './ReposWidget';

const Profile = ({ profile, repos }) => {
  const { followerLogins } = profile || {};
  const repos2 = repos || [];
  console.log(profile);
  console.log(repos2);

  return (
    <Container
      style={{
        marginTop: '2rem'
      }}
    >
      {!!profile ? (
        <Grid stackable columns="equal">
          <Grid.Column>
            <SnapshotWidget profile={profile} />
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment basic>
              <ShortBioWidget profile={profile} />
              <FollowersWidget followerLogins={followerLogins} />
              <ReposWidget repos={repos2} />
            </Segment>
          </Grid.Column>
        </Grid>
      ) : (
        <Fragment>
          <h1>Oops! Invalid profile.</h1>
          <p>This profile has not been analyzed, or is an invalid profile.</p>
        </Fragment>
      )}
    </Container>
  );
};

export default Profile;
