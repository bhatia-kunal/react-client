import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  const errorStyle = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
      {(error) ? <info style={{ color: 'red' }}>{error}</info> : ''}
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
