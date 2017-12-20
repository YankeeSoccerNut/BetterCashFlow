import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import BetterCashFlow from './containers/BetterCashFlow';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path='/better-cash-flow' component={BetterCashFlow} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
