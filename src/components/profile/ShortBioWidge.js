import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Label, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const KeyRepo = ({ repo }) => {
  const { lang, numRepos } = repo;
  return (
    <Label style={{ margin: '.2rem' }}>
      {lang}
      <Label.Detail>{numRepos}</Label.Detail>
    </Label>
  );
};

const convLangsMapToArr = ({ ownedReposLangs }) => {
  const arr = [];
  for (const k in ownedReposLangs) {
    arr.push({ lang: k, numRepos: ownedReposLangs[k] });
  }
  return arr;
};

const ShortBioWidget = ({ profile }) => {
  const {
    ownedRepoIds = [],
    ownedReposLangs = {},
    cities = [],
    countries = []
  } = profile || {};

  const ownedReposLangsArr = convLangsMapToArr({ ownedReposLangs });

  return (
    <Fragment>
      <Segment>
        <div>
          <Label as="a" color="blue" style={{ margin: '.2rem' }}>
            Total repos
            <Label.Detail>{ownedRepoIds.length}</Label.Detail>
          </Label>
          {ownedReposLangsArr.map(repo => (
            <KeyRepo repo={repo} />
          ))}
        </div>

        <div
          style={{
            marginTop: '1.2rem'
          }}
        />

        <div
          style={{
            marginTop: '1.2rem'
          }}
        >
          Cities:{' '}
          {cities.map(c => (
            <Label color="red">{c}</Label>
          ))}{' '}
          Countries:{' '}
          {countries.map(c => (
            <Label color="red">{c}</Label>
          ))}
        </div>
      </Segment>
    </Fragment>
  );
};

export default ShortBioWidget;
