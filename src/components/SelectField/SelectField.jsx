import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    onchange,
    value,
    options,
    error,
    defaultText,
    ...rest
  } = props;

  return (
    <>
      <select {...rest} value={value} {...error} style={style.base} onChange={onchange}>
        <option value="">{defaultText}</option>
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {(error) ? <info style={{ color: 'red' }}>{error}</info> : ''}
    </>
  );
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  value: PropTypes.string,
  onchange: PropTypes.func,
  error: PropTypes.string,
  defaultText: PropTypes.string,
};

SelectField.defaultProps = {
  options: [{ id: 0, value: 'select' }],
  onchange: () => {},
  value: '',
  error: '',
  defaultText: 'Select',
};

export default SelectField;
