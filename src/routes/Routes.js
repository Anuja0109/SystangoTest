import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddPlayer from '../components/AddPlayer';
import FirstQuarter from '../components/FirstQuarter';
// import PropTypes from 'prop-types';

const Routes = () => (
  <Switch>
    <Route path="/" component={AddPlayer} exact />
    <Route path="/firstquarter" component={FirstQuarter} exact />
  </Switch>
);

// Routes.propTypes = {

// };

export default Routes;
