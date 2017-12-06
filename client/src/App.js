import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import BetterCashFlow from './containers/BetterCashFlow';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/better-cash-flow' component={BetterCashFlow} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
