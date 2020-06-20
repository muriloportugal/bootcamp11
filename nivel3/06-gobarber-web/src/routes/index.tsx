import React from 'react';
import { Switch } from 'react-router-dom';
// Switch garante que somente uma rota seja exibida

import Route from './Route';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
