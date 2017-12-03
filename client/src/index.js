import {render} from 'react-dom';
import AppRedux from './app.redux.js';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';
import createLogger from 'redux-logger';
import DataTableView from './DataTableView';

// import QRView from './qrview.js';
// import SCPView from './scpview.js'

////////////control flags
const LOG_REDUX = false;
////////////components

const _app = ({
    onTransactionsUpdated,
    transactions,
    currentView
}) => {
    switch(currentView) {
    case AppRedux.VT.DASHBOARD:
    default:
	return (
	    <div>
	      <DataTableView transactions={transactions} onDataChanged={onTransactionsUpdated} />
	    </div>
	);
    }
};
console.log(PropTypes);
_app.propTypes = {
    onTransactionsUpdated: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    currentView: PropTypes.string.isRequired    
    // camPermissionGranted: PropTypes.bool.isRequired,
    // currentOperation: PropTypes.string.isRequired,
    // qrcodeText: PropTypes.string.isRequired,
    // onCamPermissionGranted: PropTypes.func.isRequired,
    // onQrCodeDecoded: PropTypes.func.isRequired,
    // onStartQrViewButtonClicked: PropTypes.func.isRequired,
    // onSendQrCodeButtonClicked: PropTypes.func.isRequired
};

// const onQrCodeDecoded = dispatch => msg => {
//    dispatch(AppRedux.Action.qrcode(msg)),
//    dispatch(SCPViewRedux.Action.init(msg))
// };

const App = connect((state) => ({
    transactions: state[AppRedux.Name].transactions,
    currentView: state[AppRedux.Name].vt
    // camPermissionGranted: state[AppRedux.Name].camPerm,
    // currentOperation: state[AppRedux.Name].op,
    // qrcodeText: state[AppRedux.Name].qrcode === null
    //   ? 'No qrcode scanned'
    //   : `last scanned qrcode: ${state[AppRedux.Name].qrcode}`
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
