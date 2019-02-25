import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

const defaultProps = {
  children: () => {},
};

const Math = (props) => {
  const calculate = (first, second, operator) => {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '/') return (second === 0) ? 'Infinity' : (first / second);
    if (operator === '*') return first * second;
    return 'Invalid Operation';
  };

  const {
    first,
    second,
    operator,
    children,
  } = props;


  const result = calculate(first, second, operator);

  return (
    <div>
      {children(first, second, operator, result)}
    </div>
  );
};

Math.propTypes = propTypes;

Math.defaultProps = defaultProps;

export default Math;
