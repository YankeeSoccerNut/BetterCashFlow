import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import React, {Component, PropTypes} from 'react';
import { connect, Provider } from 'react-redux';

import Home from './views/Home';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
