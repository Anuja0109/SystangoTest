import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddPlayer from '../components/AddPlayer';
import FirstQuarter from '../components/FirstQuarter';
import SelectedTeam from '../components/SelectedTeam';

const Routes = () => (
  <Switch>
    <Route path="/" component={AddPlayer} exact />
    <Route path="/firstquarter" component={FirstQuarter} exact />
    <Route path="/team" component={SelectedTeam} exact />
  </Switch>
);

export default Routes;
