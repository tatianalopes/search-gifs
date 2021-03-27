import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/favorites" component={Favorites} />
  </Switch>
);

export default Routes;