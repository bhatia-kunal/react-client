import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { SnackBarConsumer } from '../../../../contexts';
import { Spinner } from '../../../../components';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  classes: PropTypes.objectOf.isRequired,
  trainee: PropTypes.objectOf.isRequired,
};

const defaultProps = {
  open: false,
  onSubmit: () => {},
};

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  handleSubmit = (handleOpen) => {
    const { onSubmit } = this.props
    this.setState({
      isLoading: true,
    });
    onSubmit(handleOpen);
  }

  render() {
    const {
      classes,
      onClose,
      onSubmit,
      trainee,
      ...other
    } = this.props;

    const { isLoading } = this.state;

    const { email } = trainee;

    return (
      <>
        <SnackBarConsumer>
          {handleOpen => (
            <Dialog
              aria-labelledby="simple-dialog-title"
              {...other}
              fullWidth
              maxWidth="md"
              onClose={onClose}
            >
              <DialogTitle id="alert-dialog-title">Remove Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you really want to remove {email} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={onClose} color="default">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => this.handleSubmit(handleOpen)}
                  color="primary"
                  disabled={isLoading}
                  autoFocus
                >
                  {isLoading ? (<Spinner size={16} />) : 'Delete'}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </SnackBarConsumer>
      </>
    );
  }
}

RemoveDialog.propTypes = propTypes;
RemoveDialog.defaultProps = defaultProps;

export default withStyles(styles)(RemoveDialog);
