import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Ref, Sticky, Grid } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { Segment, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ky from 'ky';
import MetaTags from 'react-meta-tags';

import Results from './results/Results';
import Filters from './search/Filters';

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
      currPage: 0,
      overrideFilters: undefined
    };
    this.contextRef = createRef();

    this.handleRefineSearch = this.handleRefineSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {}

  handleChange(tag, v) {
    console.log(tag);
    console.log(v);
  }

  async handleRefineSearch(searchFilters) {
    const { query } = this.state;

    // reset search state
    this.setState({
      isLoading: true,
      // reset page and hasMoreItems
      hasMoreItems: true,
      currPage: 0,
      results: []
    });

    if (this.scroll && this.scroll.pageLoaded) {
      this.scroll.pageLoaded = 1;
    }

    this.setState({
      overrideFilters: searchFilters
    });

    // set results
    const results = await this.getQuery({
      query,
      overrideFilters: searchFilters
    });

    // set new result
    this.setState({
      isLoading: false,
      results
    });
  }

  async getQuery({ query = '', page = 1, overrideFilters }) {
    const { history } = this.props;
    let searchQuery = processQuery(query);

    if (!searchQuery && !overrideFilters) {
      return [];
    }

    // Add additional filters if present
    if (overrideFilters) {
      searchQuery = { ...searchQuery, ...overrideFilters };
    }

    // get access token
    const token = localStorage.getItem('token');

    // make request
    try {
      return ky
        .post(`${REACT_APP_API_URL}/supersearch`, {
          headers: {
            Authorization: `JWT ${token}`
          },
          json: { ...searchQuery, page }
        })
        .json();
    } catch (e) {
      const { status, statusText } = e.response;

      // Forbidden; Invalid token
      if (status === 401) {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        history.push('/');
      }

      console.error('Unable to retrieve results!  Is API Down?');
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

    if (this.scroll && this.scroll.pageLoaded) {
      this.scroll.pageLoaded = 1;
    }

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
      const { results, query, overrideFilters } = this.state;
      console.log(page);
      const newResults = await this.getQuery({ query, page, overrideFilters });
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
        <MetaTags>
          <title>Page 1</title>
          <meta name="description" content="Techired.  Hire people." />
          <meta property="og:title" content="Techired.co: Search" />
          <meta property="og:image" content="../../techired-logo-black.png" />
        </MetaTags>

        <Ref innerRef={this.contextRef}>
          <Container>
            <Grid>
              <Grid.Column width={4}>
                <Sticky context={this.contextRef} offset={70}>
                  <Filters
                    onChange={this.handleChange}
                    onRefineSearch={this.handleRefineSearch}
                  />
                </Sticky>
              </Grid.Column>
              <Grid.Column width={12}>
                {/* <Sticky
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
                </Sticky> */}
                {results && results.length > 0 ? (
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
                ) : (
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div>
                      <h2>{'<-- '}Search for something?</h2>
                    </div>
                  </div>
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </Ref>
      </div>
    );
  }
}

export default withRouter(App);
