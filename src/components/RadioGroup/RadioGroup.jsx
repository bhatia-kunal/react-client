import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const RadioGroup = (props) => {
  const {
    onchange,
    options,
    error,
    ...rest
  } = props;
  return (
    <>
      <div style={style.base}>
        {options.map(option => (
          <label htmlFor={option.value} key={`label${option.label}`} style={style.pointer}>
            <input type="radio" name={options} id={option.value} {...rest} key={option.label} value={option.value} onChange={onchange} />
            {option.value}
          </label>
        ))}
      </div>
      {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
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
