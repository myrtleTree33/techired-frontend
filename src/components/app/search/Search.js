import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Dropdown, Search, Segment } from 'semantic-ui-react';

const langDefinitions = [
  { code: "ruby", label: "Ruby", value: "lang.Ruby: \"24\"" },
  { code: "js", label: "JavaScript", value: "lang.JavaScript: \"24\"" }
]
const langOptions = _.map(langDefinitions, (language, index) => ({
  key: language.code,
  text: language.label,
  value: language.value,
}))

const cityDefinitions = [
  { code: "sg", label: "Singapore", value: "city: \"Singapore\"" },
  { code: "hk", label: "Hong Kong", value: "city: \"Hong Kong\"" },
  { code: "kr", label: "Seoul", value: "city: \"Seoul\"" }
]
const cityOptions = _.map(cityDefinitions, (city, index) => ({
  key: city.code,
  text: city.label,
  value: city.value,
}))

const DropdownFiltersMultipleSearchSelection = ({ query, isLoading, onSearchChange }) => (
  <Segment.Group horizontal>
    <Segment>
      <Dropdown
        placeholder='Languages'
        fluid
        // multiple
        search
        selection
        options={langOptions}
        onChange={onSearchChange}
        results={[]}
        value={query}
        loading={isLoading}
      />
    </Segment>
    <Segment>
      <Dropdown
        placeholder='City'
        fluid
        // multiple
        search
        selection
        options={cityOptions}
        onChange={onSearchChange}
        results={[]}
        value={query}
        loading={isLoading}
      />
    </Segment>
  </Segment.Group>
)

export default DropdownFiltersMultipleSearchSelection;

// const SearchComp = ({ query, isLoading, onSearchChange, onResultSelect }) => {
//   return (
//     <Segment>
//       <Search
//         input={{ fluid: true }}
//         placeholder={`e.g.   lang.JavaScript: "48" distance: "50000" city: "Hong Kong" `}
//         size="big"
//         loading={isLoading}
//         onResultSelect={onResultSelect}
//         onSearchChange={_.debounce(onSearchChange, 500, { leading: true })}
//         results={[]}
//         value={query}
//         showNoResults={false}
//       />
//     </Segment>
//   );
// };

// export default SearchComp;