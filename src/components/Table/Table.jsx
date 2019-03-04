import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
};

const defaultProps = {
  orderBy: '',
  order: 'asc',
  onSort: null,
  onSelect: null,
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
  } = props;

  console.log(orderBy, order, onSort, onSelect, props);

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
          </TableRow>
        </TableHead>
        <TableBody stripedRows>
          {data.map(row => (
            <TableRow className={classes.row} key={row[id]} hover onClick={() => onSelect(row)}>
              {columns.map(cell => (
                (
                  <TableCell key={cell.field} align={cell.align}>
                    {(cell.format && cell.format(row[cell.field])) || row[cell.field]}
                  </TableCell>
                )
              ))}
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = propTypes;
SimpleTable.defaultProps = defaultProps;

export default withStyles(styles)(SimpleTable);
