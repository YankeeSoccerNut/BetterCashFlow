import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from './components/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import Logout from './containers/Logout';

import BetterCashFlow from './containers/BetterCashFlow';
import LinkFinAccounts from './containers/LinkFinAccounts';
import PlanHistory from './containers/PlanHistory';

import BCFnavBar from './containers/BCFnavBar';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <BCFnavBar/>
        <div className="app-body">
          {/* <BetterCashFlow /> */}
        </div>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path='/better-cash-flow' component={BetterCashFlow} />
          <Route path='/link-fin-accts' component={LinkFinAccounts} />
          <Route path='/plan-history' component={PlanHistory} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
