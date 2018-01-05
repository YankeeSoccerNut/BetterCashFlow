import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from './components/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import BetterCashFlow from './containers/BetterCashFlow';
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
          <Route path='/better-cash-flow' component={BetterCashFlow} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
