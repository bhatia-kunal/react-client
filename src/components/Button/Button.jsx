import React from 'react';
import PropTypes from 'prop-types';
import buttonStyle from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  color: 'default',
  disabled: false,
  style: {},
};

const Button = (props) => {
  const {
    color,
    disabled,
    style,
    value,
    onClick,
  } = props;

  const DisabledStyle = disabled ? '' : color;
  const buttonColorType = DisabledStyle === 'primary' ? buttonStyle.primary : {};

  return (
    <div>
      <button
        type="button"
        style={{
          ...style,
          ...buttonStyle.base,
          ...buttonColorType,
          ...color,
        }}
        disabled={disabled}
        value={value}
        {...onClick}
      >
        {value}
      </button>
    </div>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
