import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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
});

const propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

function SimpleTable(props) {
  const {
    classes,
    columns,
    data,
    id,
  } = props;

  return (
    <Paper className={classes.root}>
      <Table id={id} className={classes.table}>
        <TableHead>
          <TableRow>
            {
              columns.map((column => (
                <TableCell key={column.field} align={column.align}>
                  {column.label || column.field}
                </TableCell>
              )))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(column => (
            <TableRow key={column.id}>
              {columns.map(cell => (
                (<TableCell key={cell.field} align={cell.align}>{column[cell.field]}</TableCell>)
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

export default withStyles(styles)(SimpleTable);
