import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Search from './search/Search';
import Results from './results/Results';

const { REACT_APP_API_URL } = process.env;

function processQuery(query) {
  const output = {};
  try {
    const tokens = query.match(/(?:[^\s"]+|"[^"]*")+/g);
    const t = [];
    console.log(tokens);
    for (let i = 0; i < tokens.length; i++) {
      const tokens2 = tokens[i].split(':');
      const param = tokens2[0].trim();
      const args = tokens2[1].trim().replace(/"/g, '');
      console.log(param, args);

      if (param === 'location') {
        output.location = args;
      } else if (param.startsWith('lang')) {
        const currLang = param.split('.')[1].trim();
        output.ownedReposLangsMonths = output.ownedReposLangsMonths || {};
        output.ownedReposLangsMonths[currLang] = parseInt(
          args.replace(/"/g, '')
        );
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
      results: [{}, {}],
      query: '',
      isLoading: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  async componentDidMount() {}

  async getQuery({ query = '' }) {
    // TODO split query here ----------------------------
    const searchQuery = processQuery(query);
    if (!searchQuery) {
      return;
    }

    console.log({ ...searchQuery, page: 1 });

    const res = await fetch(`${REACT_APP_API_URL}/supersearch`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...searchQuery, page: 1 })
    });
    const resJson = await res.json();
    console.log(resJson);
    this.setState({
      results: resJson
    });
  }

  handleSearchChange(e, { value }) {
    console.log(value);
    this.setState({
      isLoading: true,
      query: value
    });

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
        await this.getQuery({ query });
        this.setState({
          isLoading: false
        });
      })();
    }, 1000);
    // TODO then change results here
  }

  render() {
    const { results, query, isLoading } = this.state;
    return (
      <div>
        <Container>
          <Search
            onSearchChange={this.handleSearchChange}
            onResultSelect={this.onResultSelect}
            isLoading={isLoading}
            query={query}
          />
          <Results results={results} />
        </Container>
      </div>
    );
  }
}

export default App;
