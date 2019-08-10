import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Button, Form, Label } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numYears: 0,
      lang: undefined,
      // city: undefined,
      numFollowers: undefined,
      numFollowing: undefined,
      distance: 0,
      location: undefined,
      company: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, val) {
    this.setState({
      [field]: val
    });
  }

  handleChange2(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const { onRefineSearch } = this.props;
    const {
      numYears,
      lang,
      city,
      distance,
      numFollowers,
      numFollowing,
      company,
      location
    } = this.state;
    console.log(this.state);
    let sanitizedQuery = {};
    if (lang && numYears) {
      sanitizedQuery.ownedReposLangsMonths = {};
      sanitizedQuery.ownedReposLangsMonths[lang] = numYears * 12;
    }

    if (location) {
      sanitizedQuery.location = [location.trim().toLowerCase()];
    }

    if (company) {
      sanitizedQuery.company = [company.trim().toLowerCase()];
    }

    if (city) {
      sanitizedQuery.cities = [city.trim().toLowerCase()];
    }

    if (city && distance) {
      sanitizedQuery.distance = distance;
    }

    sanitizedQuery.numFollowers = numFollowers;
    sanitizedQuery.numFollowing = numFollowing;

    // Remove all falsey (incld. 0) values
    sanitizedQuery = _.pickBy(sanitizedQuery, _.identity);
    console.log('*******************');
    console.log(sanitizedQuery);
    console.log('*******************');
    onRefineSearch(sanitizedQuery);
  }

  render() {
    const { handleChange, handleChange2, handleSubmit } = this;
    const {
      lang,
      city,
      location,
      company,
      numYears,
      distance,
      numFollowers,
      numFollowing
    } = this.state;

    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Input
              placeholder="Location"
              name="location"
              value={location}
              onChange={handleChange2}
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              placeholder="Language"
              name="lang"
              value={lang}
              onChange={handleChange2}
            />

            <Slider
              discrete
              color="red"
              inverted={false}
              settings={{
                start: 0,
                min: 0,
                max: 10,
                step: 1,
                onChange: v => handleChange('numYears', v)
              }}
            />
            <p>
              Years of experience
              <Label
                circular
                color="red"
                style={{
                  marginLeft: '1rem'
                }}
              >
                {numYears}
              </Label>
            </p>
          </Form.Field>

          {/* <Form.Field>
            <Form.Input
              placeholder="City"
              name="city"
              value={city}
              onChange={handleChange2}
            />

            <Slider
              discrete
              color="red"
              inverted={false}
              settings={{
                start: 0,
                min: 0,
                max: 50000,
                step: 1000,
                onChange: v => handleChange('distance', v)
              }}
            />
            <p>
              Distance from city
              <Label
                circular
                color="red"
                style={{
                  marginLeft: '1rem'
                }}
              >
                {distance / 1000} km
              </Label>
            </p>
          </Form.Field> */}

          <Form.Field>
            <Slider
              discrete
              color="red"
              inverted={false}
              settings={{
                start: 0,
                min: 0,
                max: 300,
                step: 1,
                onChange: v => handleChange('numFollowers', v)
              }}
            />
            <p>Fanbase</p>
          </Form.Field>

          <Form.Field>
            <Slider
              discrete
              color="red"
              inverted={false}
              settings={{
                start: 0,
                min: 0,
                max: 300,
                step: 1,
                onChange: v => handleChange('numFollowing', v)
              }}
            />
            <p>Readership of others</p>
          </Form.Field>

          <Form.Field>
            <Form.Input
              placeholder="Company"
              name="company"
              value={company}
              onChange={handleChange2}
            />
          </Form.Field>

          <div
            style={{
              marginTop: '2rem'
            }}
          />
        </Form>
        <Button fluid color="red" onClick={handleSubmit}>
          Go!
        </Button>
      </div>
    );
  }
}

export default Filters;
