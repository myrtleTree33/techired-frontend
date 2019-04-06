import React from 'react';
import PropTypes from 'prop-types';
import Result from './result/Result';

const Results = ({ results = [] }) => {
  return (
    <div>
      {results.map((r, i) => (
        <Result result={r} id={i} />
      ))}
    </div>
  );
};

export default Results;
