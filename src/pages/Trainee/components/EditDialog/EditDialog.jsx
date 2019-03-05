import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  data: PropTypes.objectOf.isRequired,
  classes: PropTypes.objectOf.isRequired,
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

class EditDialog extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const { name, email } = data;
    this.state = {
      name,
      email,
      disabled: true,
    };
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { name, email } = this.state;
    const data = {
      name,
      email,
    };
    onSubmit(data);
    this.setState = ({
      name: '',
      email: '',
    });
  }


  handleOnChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
      disabled: false,
    });
  }

  render() {
    const {
      classes,
      onClose,
      onSubmit,
      data,
      ...other
    } = this.props;

    const { name, email, disabled } = this.state;

    return (
      <>
        <Dialog
          aria-labelledby="simple-dialog-title"
          {...other}
          fullWidth
          maxWidth="md"
          onClose={onClose}
        >
          <DialogTitle id="alert-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <TextField
                  label="Name"
                  className={classes.textField}
                  value={name}
                  onChange={this.handleOnChange('name')}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="outlined-error"
                  label="Email"
                  className={classes.textField}
                  value={email}
                  onChange={this.handleOnChange('email')}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={onClose} color="default">
              Cancel
            </Button>
            <Button variant="contained" disabled={disabled} onClick={this.handleSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;

export default withStyles(styles)(EditDialog);
