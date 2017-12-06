import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { createStore } from 'redux';
import { Provider } from 'react-redux';

// this is the root of the Store...we define it!
import reducers from './reducers/index';

// now make theStore!
const theStore = createStore(reducers);


// import AppRedux from './app.redux.js';
// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import PropTypes from 'prop-types';
// import {connect, Provider} from 'react-redux';
// import createLogger from 'redux-logger';
// import DataTableView from './containers/DataTableView';
// import DataChartView from './containers/DataChartView';
// import FinAccount from './containers/FinAccount';

ReactDOM.render(
    <Provider store={theStore}>
      <App/>
    </Provider>,
    document.getElementById('root'));
