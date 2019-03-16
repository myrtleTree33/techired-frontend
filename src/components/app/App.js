import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Search from './search/Search';
import Results from './results/Results';

const { REACT_APP_API_URL } = process.env;

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

  async getQuery({ location = '' }) {
    const res = await fetch(
      `${REACT_APP_API_URL}/supersearch?location=${location}&page=1`
    );
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
        await this.getQuery({ location: query });
        this.setState({
          isLoading: false
        });
      })();
    }, 700);
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
