import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const Trainee = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={TraineeList} />
      <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
    </Switch>
  );
};

Trainee.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Trainee;
