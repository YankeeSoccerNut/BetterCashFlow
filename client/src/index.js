import {render} from 'react-dom';
import AppRedux from './app.redux.js';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';
import createLogger from 'redux-logger';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';

////////////control flags
const LOG_REDUX = false;
////////////components

const _app = ({
    onTransactionsUpdated,
    transactions,
    currentView,
    seriesStruct
}) => {
    switch(currentView) {
    case AppRedux.VT.DASHBOARD:
    default:
	return (
	    <div>
	      <div>
	      <DataChartView seriesStruct={seriesStruct} />		
	    </div>
	    <div>
	      <DataTableView transactions={transactions} onDataChanged={onTransactionsUpdated} />
	    </div>
	    </div>
	);
    }
};
console.log(PropTypes);
_app.propTypes = {
    onTransactionsUpdated: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    currentView: PropTypes.string.isRequired,
    seriesStruct: PropTypes.object.isRequired
};


const App = connect((state) => ({
    transactions: state[AppRedux.Name].transactions,
    currentView: state[AppRedux.Name].vt,
    seriesStruct: state[AppRedux.Name].seriesStruct
}), (dispatch) => ({
    onTransactionsUpdated: (transactions) => dispatch(AppRedux.Action.transactionsUpdated(transactions))
    // onCamPermissionGranted: (granted) => dispatch(AppRedux.Action.camPermission(granted)),
    // onQrCodeDecoded: onQrCodeDecoded(dispatch),
    // onStartQrViewButtonClicked: () => dispatch(AppRedux.Action.qrview()),
    // onSendQrCodeButtonClicked: () => dispatch(AppRedux.Action.sendcode())
}))(_app);

///////////fire it up
const store = createStore(
    combineReducers({
	[AppRedux.Name]: AppRedux.Reducer
	// [SCPViewRedux.Name]: SCPViewRedux.Reducer
    }), LOG_REDUX
	? applyMiddleware(createLogger())
	: undefined);

//testing steps
/* store.dispatch(AppRedux.Action.camPermission(true)) onQrCodeDecoded(store.dispatch)('testcode') store.dispatch(AppRedux.Action.sendcode()) store.dispatch(SCPViewRedux.Action.password('pass')) store.dispatch(SCPViewRedux.Action.host('user@host')) store.dispatch(SCPViewRedux.Action.path('/home/user/file')) store.dispatch(SCPViewRedux.Action.send()) */
console.log(store.getState());

render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'));
