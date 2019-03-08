import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './style';

const propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  actions: PropTypes.arrayOf,
};

const defaultProps = {
  orderBy: '',
  order: 'asc',
  onSort: null,
  onSelect: null,
  count: 0,
  page: 0,
  rowsPerPage: 100,
  onChangePage: null,
  actions: null,
};

function SimpleTable(props) {
  const {
    classes,
    columns,
    data,
    id,
    orderBy,
    order,
    onSort,
    onSelect,
    count,
    page,
    rowsPerPage,
    onChangePage,
    actions,
  } = props;
  const renderActions = (row) => {
    if (!actions) {
      return null;
    }

    let key = 0;

    return (
      <TableCell>
        {actions.map((action) => {
          key += 1;
          return (
            <IconButton
              key={key}
              className={classes.button}
              onClick={() => action.handler(row)}
            >
              {action.icon}
            </IconButton>
          );
        })}
      </TableCell>
    );
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              columns.map((column => (
                <TableCell key={column.field} align={column.align}>
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={order}
                    onClick={onSort(column.field)}
                  >
                    {column.label || column.field}
                  </TableSortLabel>
                </TableCell>
              )))
            }
            {actions ? (<TableCell />) : ''}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow className={classes.row} key={row[id]} hover>
              {columns.map(cell => (
                (
                  <TableCell key={cell.field} align={cell.align} onClick={() => onSelect(row)}>
                    {(cell.format && cell.format(row[cell.field])) || row[cell.field]}
                  </TableCell>
                )
              ))}
              {renderActions(row)}
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={onChangePage}
      />
    </Paper>
  );
}

SimpleTable.propTypes = propTypes;
SimpleTable.defaultProps = defaultProps;

export default withStyles(styles)(SimpleTable);
