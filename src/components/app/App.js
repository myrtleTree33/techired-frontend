import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

import Search from './search/Search';
import Results from './results/Results';

const { REACT_APP_API_URL } = process.env;

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
        output.ownedReposLangsMonths[currLang] = parseInt(
          args.replace(/"/g, '')
        );
      } else if (param === 'distance') {
        output.distance = parseInt(args);
      } else if (param === 'city') {
        const city = args.trim().toLowerCase();
        output.cities = [city];
      }
    }
    return output;
  } catch (e) {
    return null;
  }
}

class InfiniteScrollExtend extends InfiniteScroll {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pageStart !== this.props.pageStart) {
      this.pageLoaded = 0;
    }
    this.attachScrollListener();
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

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  async componentDidMount() {}

  async getQuery({ query = '', page = 1 }) {
    // TODO split query here ----------------------------
    const searchQuery = processQuery(query);
    if (!searchQuery) {
      return [];
    }

    const res = await fetch(`${REACT_APP_API_URL}/supersearch`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...searchQuery, page })
    });
    const results = await res.json();
    return results;
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
      <div>
        <Container>
          <Search
            onSearchChange={this.handleSearchChange}
            onResultSelect={this.onResultSelect}
            isLoading={isLoading}
            query={query}
          />
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
      </div>
    );
  }
}

export default App;
