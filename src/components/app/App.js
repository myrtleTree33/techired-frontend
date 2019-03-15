import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Search from './search/Search';
import Results from './results/Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [{}, {}]
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async componentDidMount() {
    const { REACT_APP_API_URL } = process.env;
    const location = 'Indonesia';

    const res = await fetch(
      `${REACT_APP_API_URL}/supersearch?location=${location}&page=1`
    );
    const resJson = await res.json();
    console.log(resJson);
    this.setState({
      results: resJson
    });
  }

  handleSearchChange(query) {
    // TODO then change results here
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <Container>
          <Search onSearchChange={this.handleSearchChange} />
          <Results results={results} />
        </Container>
      </div>
    );
  }
}

export default App;
