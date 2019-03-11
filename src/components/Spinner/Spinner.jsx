import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit,
  },
});

function Spinner(props) {
  const { classes, size, ...rest } = props;
  return (
    <div>
      <CircularProgress size={size} {...rest} className={classes.progress} />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 24,
}

export default withStyles(styles)(Spinner);
