import React from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components/AddDialog/AddDialog';

class Trainee extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    password: '',
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (value) => {
    const { name, email, password } = value;
    this.setState({
      open: false,
      name,
      email,
      password,
    });
  };

  renderDialog = () => {
    const { open } = this.state;

    if (!open) {
      return null;
    }

    return (
      <AddDialog
        open={open}
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <br />
        <Button variant="outlined" size="small" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        {this.renderDialog()}
      </div>
    );
  }
}

export default Trainee;
