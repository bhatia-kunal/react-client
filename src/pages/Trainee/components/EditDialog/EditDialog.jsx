import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
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
import { SnackBarConsumer } from '../../../../contexts';
import { Spinner } from '../../../../components';

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
  schema = Yup.object().shape({
    name: Yup
      .string()
      .required()
      .label('Name'),
    email: Yup
      .string().email()
      .required()
      .label('Email'),
  });

  constructor(props) {
    super(props);
    const { data } = this.props;
    console.log('Edit props', data);
    const { name, email, password, originalId: id } = data;
    this.state = {
      name,
      email,
      password,
      id,
      disabled: true,
      errors: {},
      isLoading: false,
    };
  }

  handleErrors = () => {
    const parsedErrors = {};
    const {
      name,
      email,
    } = this.state;
    this.schema.validate({
      name,
      email,
    }, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: {},
        });
      })
      .catch((error) => {
        error.inner.forEach((element) => {
          parsedErrors[element.path] = element.path ? element.message : '';
        });
        this.setState({
          errors: parsedErrors,
        });
      });
  }

  getError = (Field) => {
    const { errors } = this.state;
    return errors[Field];
  }

  handleSubmit = (handleOpen) => {
    this.setState({
      isLoading: true,
    }, () => console.log('Sttttttaaaaatttteeeee', this.state));
    const { onSubmit } = this.props;
    const { name, email, password, id } = this.state;
    const data = {
      name,
      email,
      password,
      id,
    };
    console.log('Update data', data, 'State', this.state);
    onSubmit(data, handleOpen);
  }


  handleOnChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
      disabled: false,
    }, () => this.handleErrors());
  }

  render() {
    const {
      classes,
      onClose,
      onSubmit,
      data,
      ...other
    } = this.props;

    const {
      name,
      email,
      disabled,
      errors,
      isLoading,
    } = this.state;

    console.log(this.state);
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
              <DialogTitle id="alert-dialog-title">Edit Trainee</DialogTitle>
              <DialogContent>
                <List>
                  <ListItem>
                    <TextField
                      error={!!errors.name}
                      label="Name"
                      className={classes.textField}
                      value={name}
                      onChange={this.handleOnChange('name')}
                      margin="dense"
                      variant="outlined"
                      helperText={errors.name ? this.getError('name') : ''}
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
                      error={!!errors.email}
                      id="outlined-error"
                      label="Email"
                      className={classes.textField}
                      value={email}
                      onChange={this.handleOnChange('email')}
                      margin="dense"
                      variant="outlined"
                      helperText={errors.email ? this.getError('email') : ''}
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
                <Button variant="contained" disabled={disabled || isLoading} onClick={() => this.handleSubmit(handleOpen)} color="primary" autoFocus>
                  {isLoading ? <Spinner size={12} /> : 'Submit'}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </SnackBarConsumer>
      </>
    );
  }
}

EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;

export default withStyles(styles)(EditDialog);
