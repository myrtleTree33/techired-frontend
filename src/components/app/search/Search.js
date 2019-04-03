import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Search, Segment } from 'semantic-ui-react';

const SearchComp = ({ query, isLoading, onSearchChange, onResultSelect }) => {
  return (
    <Segment>
      <Search
        input={{ fluid: true }}
        placeholder={`e.g.   lang.JavaScript: "48" distance: "50000" city: "Hong Kong" numFollowers: "50, 100" numFollowing: "50, 70" `}
        size="big"
        loading={isLoading}
        onResultSelect={onResultSelect}
        onSearchChange={_.debounce(onSearchChange, 500, { leading: true })}
        results={[]}
        value={query}
        showNoResults={false}
      />
    </Segment>
  );
};

export default SearchComp;
