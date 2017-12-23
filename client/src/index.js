import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux';

import RootReducer from './reducers/RootReducer';
import reduxPromise from 'redux-promise';

// React needs to know about it...Provider accomplishes this
import { Provider } from 'react-redux';

// using IIFE way to create theStore....
const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// wrap the App with the Provider so everything in the App can use state
ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>,
	document.getElementById('root'
));
