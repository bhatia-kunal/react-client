import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';
import trainees from './data/trainee';

class TraineeList extends React.Component {
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

  renderList = (listItems) => {
    if (!listItems) {
      return null;
    }

    return (
      <ul>
        {listItems.map(item => (
          <li>
            <Link to={`/trainee/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
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
        {this.renderList(trainees)}
      </div>
    );
  }
}

export default TraineeList;
