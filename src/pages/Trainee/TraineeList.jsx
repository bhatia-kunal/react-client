import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';
import trainees from './data/trainee';
import { Table } from '../../components';
import { getDateFormatted } from '../../libs/utils';

const style = {
  button: {
    position: 'relative',
    float: 'right',
    marginBottom: '10px',
  },
};
class TraineeList extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    password: '',
    order: 'asc',
    orderBy: '',
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

  handleOnSelect = (row) => {
    const { history } = this.props;
    history.push(`/trainee/${row.id}`);
  }

  createSortHandler = property => event => this.handleRequestSort(event, property);

  handleRequestSort = (event, property) => {
    const currentOrderBy = property;
    let currentOrder = 'asc';
    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'asc') {
      currentOrder = 'desc';
    }

    this.setState({ order: currentOrder, orderBy: currentOrderBy });
  };

  render() {
    const { order, orderBy } = this.state;
    console.log(this.state);
    return (
      <div>
        <br />
        <Button variant="outlined" style={style.button} size="small" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <Table
          id="Trainee-Table"
          data={trainees}
          columns={[
            {
              field: 'name',
              label: 'Name',
              align: 'center',
            },
            {
              field: 'email',
              label: 'Email Address',
              format: value => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: getDateFormatted,
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSelect={this.handleOnSelect}
          onSort={this.createSortHandler}
        />
        {this.renderDialog()}
      </div>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.arrayOf.isRequired,
};

export default TraineeList;
