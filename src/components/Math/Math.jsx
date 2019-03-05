import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

const defaultProps = {
  children: () => {},
};

const Math = (props) => {
  const calculate = (first, second, operator) => {
    if (Number.isNaN(Number(first)) && Number.isNaN(Number(second))) return 'Error - Must provide a valid Number';
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '/') return !second ? 'Infinity' : (first / second);
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
