import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import trainees from './data/trainee';
import { getDateFormatted } from '../../libs/utils';
import { NoMatch } from '../NoMatch';

const styles = theme => ({
  card: {
    margin: '20px',
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    backgroundColor: 'grey',
  },
  thumbnail: {
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '35%',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    position: 'relative',
    left: '48%',
  },
});

const renderTrainee = (id, classes) => {
  const trainee = trainees.find(item => item.id === id);

  if (!trainee) {
    return <NoMatch />;
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cover}>
          <Typography className={classes.thumbnail} variant="subtitle1">
            Thumbnail
          </Typography>
        </CardContent>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {trainee.name}
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              {getDateFormatted(trainee.createdAt)}
            </Typography>
            <Typography variant="subheading" color="textPrimary">
              {trainee.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Button component={Link} to="/trainee" className={classes.button} variant="contained" color="default" size="small">
          Back
      </Button>
    </>
  );
};

const TraineeDetail = (props) => {
  const { classes, match } = props;
  const { id } = match.params;

  return (
    renderTrainee(id, classes)
  );
};

TraineeDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles, { withTheme: true })(TraineeDetail);
