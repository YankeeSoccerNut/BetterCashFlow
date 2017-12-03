'use strict';
import {render} from 'react-dom'
// import {Resource, Styles} from './res.js'
// import SCPViewRedux from './scpview.redux.js'
import AppRedux from './app.redux.js'
////////////////////////react native dependency starts here
import {createStore, combineReducers, applyMiddleware} from 'redux';
import React, {Component, PropTypes} from 'react';
import {connect, Provider} from 'react-redux';
import createLogger from 'redux-logger';
import DataTable from './views/DataTable';

// import QRView from './qrview.js';
// import SCPView from './scpview.js'

////////////control flags
const LOG_REDUX = false;
////////////components

const _app = ({}) => {
  return (<DataTable/>)
};

_app.propTypes = {
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
  // camPermissionGranted: state[AppRedux.Name].camPerm,
  // currentOperation: state[AppRedux.Name].op,
  // qrcodeText: state[AppRedux.Name].qrcode === null
  //   ? 'No qrcode scanned'
  //   : `last scanned qrcode: ${state[AppRedux.Name].qrcode}`
}), (dispatch) => ({
  // onCamPermissionGranted: (granted) => dispatch(AppRedux.Action.camPermission(granted)),
  // onQrCodeDecoded: onQrCodeDecoded(dispatch),
  // onStartQrViewButtonClicked: () => dispatch(AppRedux.Action.qrview()),
  // onSendQrCodeButtonClicked: () => dispatch(AppRedux.Action.sendcode())
}))(_app);

///////////fire it up
const store = createStore(
  combineReducers({
  [AppRedux.Name]: AppRedux.Reducer,
  // [SCPViewRedux.Name]: SCPViewRedux.Reducer
}), LOG_REDUX
  ? applyMiddleware(createLogger())
  : undefined);

//testing steps
/* store.dispatch(AppRedux.Action.camPermission(true)) onQrCodeDecoded(store.dispatch)('testcode') store.dispatch(AppRedux.Action.sendcode()) store.dispatch(SCPViewRedux.Action.password('pass')) store.dispatch(SCPViewRedux.Action.host('user@host')) store.dispatch(SCPViewRedux.Action.path('/home/user/file')) store.dispatch(SCPViewRedux.Action.send()) */
console.log(store.getState())

render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'))
