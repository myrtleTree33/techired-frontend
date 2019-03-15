import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Label, Segment, Image } from 'semantic-ui-react';

function flattenObjPopularity(obj) {
  // remove null key
  delete obj['null'];

  const arr = Object.keys(obj).map(lang => {
    return { lang, count: obj[lang] };
  });
  // return _.orderBy(arr, 'count', 'desc').slice(0, 8);
  return _.orderBy(arr, 'count', 'desc');
}

const Result = ({ result }) => {
  const {
    login,
    name,
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

  return (
    <Segment>
      <div>
        <Image src={profilePic} avatar />
        <span>{login}</span>
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
        {ownedReposLangsArr.map(a => (
          <Label
            as="a"
            color="red"
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
    </Segment>
  );
};

export default Result;
