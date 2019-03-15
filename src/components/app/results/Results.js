import React from 'react';
import PropTypes from 'prop-types';
import Result from './result/Result';

const Results = ({ results = [] }) => {
  return (
    <div>
      {results.map(r => (
        <Result result={r} />
      ))}
    </div>
  );
};

export default Results;
