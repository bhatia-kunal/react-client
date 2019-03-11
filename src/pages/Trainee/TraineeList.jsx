/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, RemoveDialog, EditDialog } from './components';
import trainees from './data/trainee';
import { Table } from '../../components';
import { getDateFormatted } from '../../libs/utils';
import { lastAcceptableDate } from '../../configs/constants';

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
    openRemove: false,
    openEdit: false,
    deleteTrainee: {},
    editTrainee: {},
    name: '',
    email: '',
    password: '',
    order: 'asc',
    orderBy: '',
    page: 0,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = Dialog => () => {
    this.setState({ [Dialog]: false, deleteTrainee: {}, editTrainee: {} });
  };

  handleSubmit = (value, handleOpen) => {
    const { name, email, password } = value;
    this.setState({
      open: false,
      name,
      email,
      password,
    }, () => handleOpen('Trainee added successfully', 'success'));
  };

  renderDialog = () => {
    const { open } = this.state;

    if (!open) {
      return null;
    }

    return (
      <AddDialog
        open={open}
        onClose={this.handleClose('open')}
        onSubmit={this.handleSubmit}
      />
    );
  }

  renderRemoveDialog = () => {
    const { openRemove } = this.state;

    if (!openRemove) {
      return null;
    }

    return (
      <RemoveDialog
        open={openRemove}
        onClose={this.handleClose('openRemove')}
        onSubmit={this.handleRemoveSubmit}
      />
    );
  }

  handleRemoveDialogOpen = (row) => {
    this.setState({
      openRemove: true,
      deleteTrainee: row,
    });
  }

  handleRemoveSubmit = (handleOpen) => {
    const { deleteTrainee } = this.state;
    console.log('Deleted Trainee');
    console.log(deleteTrainee);
    const { createdAt, email } = deleteTrainee;
    this.setState({
      openRemove: false,
    }, () => {
      const date = getDateFormatted(lastAcceptableDate);
      if (createdAt < lastAcceptableDate) {
        handleOpen(`Record of ${email.toUpperCase()} is created before ${date.slice(0, date.lastIndexOf(','))} and hence  can not be removed`, 'error');
      } else {
        handleOpen('Trainee removed successfully', 'success');
      }
    });
  }

  renderEditDialog = () => {
    const { openEdit, editTrainee } = this.state;
    if (!openEdit) {
      return null;
    }

    return (

      <EditDialog
        open={openEdit}
        data={editTrainee}
        onClose={this.handleClose('openEdit')}
        onSubmit={this.handleEditSubmit}
      />
    );
  }

  handleEditDialogOpen = (row) => {
    this.setState({
      openEdit: true,
      editTrainee: row,
    });
  }

  handleEditSubmit = (newData, handleOpen) => {
    this.setState({
      openEdit: false,
      editTrainee: newData,
    }, () => handleOpen('Trainee updated successfully', 'success'));
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  render() {
    const {
      order,
      orderBy,
      page,
      editTrainee,
    } = this.state;
    console.log('Edit traineeeee', editTrainee);
    return (
      <div>
        <br />
        <Button variant="outlined" style={style.button} size="small" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <Table
          id="id"
          data={trainees}
          columns={[
            {
              field: 'name',
              label: 'Name',
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
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSelect={this.handleOnSelect}
          onSort={this.createSortHandler}
          count={100}
          rowsPerPage={10}
          page={page}
          onChangePage={this.handleChangePage}
        />
        {this.renderDialog()}
        {this.renderRemoveDialog()}
        {this.renderEditDialog()}
      </div>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.arrayOf.isRequired,
};

export default TraineeList;
