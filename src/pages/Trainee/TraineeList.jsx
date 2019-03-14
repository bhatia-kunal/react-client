/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, RemoveDialog, EditDialog } from './components';
import { Table } from '../../components';
import { getDateFormatted } from '../../libs/utils';
import { lastAcceptableDate } from '../../configs/constants';
import { callApi } from '../../libs/utils';
import { SnackBarConsumer } from '../../contexts';


const style = {
  button: {
    position: 'relative',
    float: 'right',
    marginBottom: '10px',
  },
};
class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      count: 0,
      traineeList: [],
      apiResponseError: '',
      loader: false,
      dataLength: true,
    }
  }


  componentDidMount = () => {
    this.getTraineesData();
  }

  getTraineesData = async () => {
    const { page } = this.state;
    await this.setState({
      loader: true,
    });
    const skip = page * 10;
    const result = await callApi('get', `/trainee/?limit=10&skip=${skip}`, {});
    if(result && result.data) {
      const { records, count } = result.data.data;
      this.setState({
        count,
        traineeList: records,
        loader: false,
        dataLength: records.length,
      });
    } else {
      this.setState({
        apiResponseError: result,
        loader: false,
      })
    }
  }

  renderAPIErrorSanck = (handleOpen) => {
    const { apiResponseError } = this.state;

    if(!apiResponseError) {
      return null;
    }

    handleOpen(apiResponseError, 'error');
    return (
      <h1>Oops! No Response</h1>
    )
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = Dialog => () => {
    this.setState({ [Dialog]: false, deleteTrainee: {}, editTrainee: {} });
  };

  handleSubmit = async (value, handleOpen) => {
    const { name, email, password } = value;
    this.setState({
      name,
      email,
      password,
    });
    const result = await callApi('post', '/trainee', {...value, role: 'trainee'});
    this.setState({
      open: false,
    })
    if(result.data) {
      handleOpen('Successfully created', 'success');
    } else {
      handleOpen(result, 'error');
    }
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
    const { openRemove, deleteTrainee } = this.state;

    if (!openRemove) {
      return null;
    }

    return (
      <RemoveDialog
        open={openRemove}
        trainee={deleteTrainee}
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

  handleRemoveSubmit = async (handleOpen) => {
    const { deleteTrainee, page } = this.state;
    const { createdAt, email, originalId } = deleteTrainee;
    const result = await callApi('delete', `/trainee/${originalId}`, {});
    this.setState({
      openRemove: false,
    });
    if(result && result.data) {
      const date = getDateFormatted(lastAcceptableDate);
      if (createdAt < lastAcceptableDate) {
          handleOpen(`Record of ${email.toUpperCase()} is created before ${date.slice(0, date.lastIndexOf(','))} and hence  can not be removed`, 'error');
      } else {
        handleOpen(`Record of ${email} with originalId - ${originalId} removed successfully`, 'success');
        await this.getTraineesData();
        const { dataLength } = this.state;
        if (!dataLength) {
        this.setState({
            loader: true,
            page: page-1,
        }, () => this.getTraineesData());
        }
      }
    } else {
      handleOpen(result, 'error');
    }
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

  handleEditSubmit = async (dataToUpdate, handleOpen) => {
    const result = await callApi('put', '/trainee', dataToUpdate);
    this.setState({
      openEdit: false,
    });
    if(result && result.data) {
      handleOpen('Updated successfully', 'success');
      await this.getTraineesData();
    } else {
      handleOpen(result, 'error');
    }
  }

  handleOnSelect = (row) => {
    const { history } = this.props;
    history.push(`/trainee/${row.originalId}`);
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

  handleChangePage = async (event, page) => {
    await this.setState({ page });
    this.getTraineesData();
  };

  renderTable = () => {
    const {
      order,
      orderBy,
      page,
      traineeList,
      loader,
      dataLength,
      count,
    } = this.state;

    return (
      <Table
        id="originalId"
        data={traineeList}
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
        count={count}
        rowsPerPage={10}
        page={page}
        onChangePage={this.handleChangePage}
        loader={loader}
        dataLength={dataLength}
      />
    )
  }


  render() {
    const { apiResponseError } = this.state;
    return (

      <SnackBarConsumer>
        {handleOpen => (
            <div>
              <br />
              <Button variant="outlined" style={style.button} size="small" color="primary" onClick={this.handleClickOpen}>
                Add Trainee
              </Button>
              {apiResponseError ? (this.renderAPIErrorSanck(handleOpen)) : (this.renderTable())}
              {this.renderDialog()}
              {this.renderRemoveDialog()}
              {this.renderEditDialog()}
            </div>
        )}
      </SnackBarConsumer>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.arrayOf.isRequired,
};

export default TraineeList;
