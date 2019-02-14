import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  const redError = (error !== '') ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...redError }} />
      {(error !== '') ? <info style={{ color: 'red' }}>{error}</info> : ''}
    </>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
