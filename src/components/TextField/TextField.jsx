import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, onchange, ...rest } = props;
  const errorStyle = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} onChange={onchange} />
      {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
  onchange: PropTypes.func,
};

TextField.defaultProps = {
  error: '',
  onchange: () => {},
};

export default TextField;
