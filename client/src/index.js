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
    onCellEdit,
    onDeleteRow,
    onAddRow,
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
		<DataTableView transactions={transactions} onCellEdit={onCellEdit} onDeleteRow={onDeleteRow} onAddRow={onAddRow} />
	      </div>
	    </div>
	);
    }
};
console.log(PropTypes);
_app.propTypes = {
    onCellEdit: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired,
    onAddRow: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    currentView: PropTypes.string.isRequired,
    seriesStruct: PropTypes.object.isRequired
};


const App = connect((state) => ({
    transactions: state[AppRedux.Name].transactions,
    currentView: state[AppRedux.Name].vt,
    seriesStruct: state[AppRedux.Name].seriesStruct
}), (dispatch) => ({
    onCellEdit: (row, fieldName, value) => dispatch(AppRedux.Action.onCellEdit({row, fieldName, value})),
    onDeleteRow: (row) => dispatch(AppRedux.Action.onDeleteRow({row})),
    onAddRow: (row) => dispatch(AppRedux.Action.onAddRow({row}))
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
