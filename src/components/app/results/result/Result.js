import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import { Icon, Label, Segment, Image } from 'semantic-ui-react';

function flattenObjPopularity(obj) {
  // remove null key
  delete obj['null'];

  const arr = Object.keys(obj).map(lang => {
    return { lang, count: obj[lang] };
  });
  // return _.orderBy(arr, 'count', 'desc').slice(0, 8);
  return _.orderBy(arr, 'count', 'desc');
}

function genLabels(followers, starredRepos, ownedRepos) {
  const output = [];
  if (followers.length > 150) {
    output.push('Rockstar-influencer');
  } else if (followers.length > 100) {
    output.push('Mega-influencer');
  } else if (followers.length > 50) {
    output.push('Influencer');
  }

  // if (starredRepos.length > 20) {
  //   output.push('Learner');
  // } else if (starredRepos.length > 40) {
  //   output.push('Mega-learner');
  // } else if (starredRepos.length > 70) {
  //   output.push('Rockstar-learner');
  // }

  // if (starredRepos.length > 10) {
  //   output.push('Coder');
  // } else if (starredRepos.length > 30) {
  //   output.push('Mega-coder');
  // } else if (starredRepos.length > 50) {
  //   output.push('Rockstar-coder');
  // }

  if (output.length === 0) {
    return null;
  }

  return output.join(', ');
}

const Result = ({ result }) => {
  const {
    login,
    name,
    company,
    blog,
    bio,
    location,
    profilePic,
    followerLogins = [],
    starredRepoIds = [],
    ownedRepoIds = [],
    ownedReposLangs = {}
  } = result;

  const ownedReposLangsArr = flattenObjPopularity(ownedReposLangs);
  const labels = genLabels(followerLogins, starredRepoIds, ownedRepoIds);

  return (
    <Segment>
      {labels ? (
        <Label attached="top right" color="orange">
          {labels} <Icon name="star" />
        </Label>
      ) : (
        ''
      )}
      {/* <Link to={`/profile/${login}`}> */}
      <div>
        <Image src={profilePic} avatar />
        <span>
          {login} {name ? `(${name})` : ''}
        </span>
      </div>

      <div
        style={{
          margin: '1.7rem 0'
        }}
      >
        <em>{bio}</em>
      </div>

      <div
        style={{
          margin: '1.7rem 0'
        }}
      >
        Location: {location}
      </div>

      <div>
        <Label as="a" color="yellow" image>
          {followerLogins.length}
          <Label.Detail>Followers</Label.Detail>
        </Label>

        <Label as="a" color="blue" image>
          {starredRepoIds.length}
          <Label.Detail>Starred repos</Label.Detail>
        </Label>

        <Label as="a" color="teal" image>
          {ownedRepoIds.length}
          <Label.Detail>Created repos</Label.Detail>
        </Label>
      </div>

      <div>
        {ownedReposLangsArr.map((a, i) => (
          <Label
            as="a"
            color={i < 7 && a.count > 1 ? 'red' : null}
            image
            style={{
              margin: '.5rem',
              marginLeft: 0
            }}
          >
            {a.count}
            <Label.Detail>{a.lang}</Label.Detail>
          </Label>
        ))}
      </div>
      {/* </Link> */}
    </Segment>
  );
};

export default Result;
