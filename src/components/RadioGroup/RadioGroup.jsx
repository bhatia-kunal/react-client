import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    onchange,
    options,
    error,
    ...rest
  } = props;

  return (
    <>
      {options.map(option => (
        <div key={`label${option.label}`}>
          <input type="radio" name={options} {...rest} key={option.label} value={option.value} onChange={onchange} />
          {option.value}
        </div>
      ))}
    </>
  );
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  value: PropTypes.string,
  onchange: PropTypes.func,
  error: PropTypes.string,
};

RadioGroup.defaultProps = {
  options: [{ id: 0, value: 'select' }],
  onchange: () => {},
  value: '',
  error: '',
};

export default RadioGroup;
