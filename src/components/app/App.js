import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Ref, Sticky } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

import Search from './search/Search';
import Results from './results/Results';
import { Auth } from '@okta/okta-react';

const { REACT_APP_API_URL } = process.env;

function tokenizeArgs(args) {
  let containsNan = false;
  const cleanArgs = args
    .trim()
    .split(',')
    .map(a => {
      const num = parseInt(a);
      if (isNaN(num)) {
        containsNan = true;
      }
      return num;
    });

  return containsNan ? [] : cleanArgs;
}

function processQuery(query) {
  const output = {};

  try {
    const tokens = query.match(/(?:[^\s"]+\s*|"[^"]*")+/g);
    const t = [];
    for (let i = 0; i < tokens.length; i++) {
      const tokens2 = tokens[i].split(':');
      const param = tokens2[0].trim();
      const args = tokens2[1].trim().replace(/"/g, '');

      if (param === 'location') {
        output.location = args;
      } else if (param.startsWith('lang')) {
        const currLang = param.split('.')[1].trim();
        output.ownedReposLangsMonths = output.ownedReposLangsMonths || {};
        output.ownedReposLangsMonths[currLang] = tokenizeArgs(args);
      } else if (param === 'distance') {
        output.distance = parseInt(args);
      } else if (param === 'city') {
        const city = args.trim().toLowerCase();
        output.cities = [city];
      } else if (param === 'company') {
        const company = args.trim().toLowerCase();
        output.company = [company];
      } else if (param === 'bio') {
        const bio = args.trim().toLowerCase();
        output.bio = [bio];
      } else if (param === 'numFollowers') {
        const numFollowers = tokenizeArgs(args);
        output.numFollowers = numFollowers;
      } else if (param === 'numFollowing') {
        const numFollowing = tokenizeArgs(args);
        output.numFollowers = numFollowing;
      }
    }
    return output;
  } catch (e) {
    return null;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: '',
      isLoading: false,
      hasMoreItems: true,
      currPage: 0
    };
    this.contextRef = createRef();

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  async componentDidMount() {}

  async getQuery({ query = '', page = 1 }) {
    const searchQuery = processQuery(query);
    if (!searchQuery) {
      return [];
    }

    // get access token
    const accessToken = sessionStorage.getItem('accessToken');

    // make request
    try {
      const res = await fetch(`${REACT_APP_API_URL}/supersearch`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ ...searchQuery, page })
      });

      // throw error is not 200
      if (res.status !== 200) {
        throw new Error(res.status);
      }

      const results = await res.json();
      return results;
    } catch (err) {
      console.error(
        'Unable to retrieve results!  Logging out and redirecting back to main page.'
      );

      // force a logout
      try {
        await this.props.auth.logout('/');
        document.location.reload();
      } catch (e) {}
    }
  }

  handleSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      // reset page and hasMoreItems
      hasMoreItems: true,
      currPage: 0,
      query: value
    });

    this.scroll.pageLoaded = 1;

    setTimeout(() => {
      const { query } = this.state;
      if (query.length < 1) {
        this.setState({
          results: [],
          isLoading: false,
          query: ''
        });
        return; // exit
      }

      // else continue query
      (async () => {
        const results = await this.getQuery({ query });
        this.setState({
          isLoading: false,
          results
        });
      })();
    }, 1000);
    // TODO then change results here
  }

  paginate(page) {
    (async () => {
      const { results, query } = this.state;
      console.log(page);
      const newResults = await this.getQuery({ query, page });
      this.setState({
        isLoading: false,
        hasMoreItems: newResults && newResults.length > 0 && page <= 10,
        results: _.uniq([...results, ...newResults]),
        currPage: page
      });
    })();
  }

  render() {
    const { results, query, isLoading, hasMoreItems, currPage } = this.state;
    return (
      <div
        style={{
          marginTop: '3.2rem'
        }}
      >
        <Ref innerRef={this.contextRef}>
          <Container>
            <Sticky
              context={this.contextRef}
              style={{
                margin: ' 2rem 0'
              }}
            >
              <Search
                onSearchChange={this.handleSearchChange}
                onResultSelect={this.onResultSelect}
                isLoading={isLoading}
                query={query}
              />
            </Sticky>
            <InfiniteScroll
              ref={scroll => {
                this.scroll = scroll;
              }}
              pageStart={currPage}
              loadMore={this.paginate}
              hasMore={hasMoreItems}
              loader={
                <Segment
                  basic
                  style={{
                    marginTop: '2rem'
                  }}
                >
                  <Loader active key={0}>
                    Loading...
                  </Loader>
                </Segment>
              }
            >
              <Results results={results} />
            </InfiniteScroll>
          </Container>
        </Ref>
      </div>
    );
  }
}

export default App;
