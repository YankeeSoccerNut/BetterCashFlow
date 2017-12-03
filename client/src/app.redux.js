'use strict';
import {generateReducer, newState, applyName} from './lib.js';
// following design guides here: https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
const Name = 'AppRedux';
//operation type
const OT = {
    // MENU : 'menu',
    // QRVIEW : 'qrview',
    // SENDCODE : 'sendcode'
};
//redux action type
const AT = applyName(Name, {
    // CAM_PERM_CHANGE : 'CAM_PERM_CHANGE',
    // MENU : 'MENU',
    // QRVIEW : 'QRVIEW',
    // QRCODE : 'QRCODE',
    // SENDCODE : 'SENDCODE'
});

////////////action creators
//loosely following https://github.com/acdlite/redux-actions for action format
const Action = {
    // camPermission : (granted) => ({type: AT.CAM_PERM_CHANGE, payload: granted}),
    // qrcode : (msg) => ({type: AT.QRCODE, payload: msg}),
    // qrview : () => ({type: AT.QRVIEW}),
    // menu : () => ({type: AT.MENU}),
    // sendcode : () => ({type: AT.SENDCODE})
};

///////////reducers and inital state
const Reducer = generateReducer(
    {
        // [AT.CAM_PERM_CHANGE] : (state, action) => (newState(state, {camPerm: action.payload})),
        // [AT.MENU] : (state, action) => (newState(state, {op: OT.MENU})),
        // [AT.QRVIEW] : (state, action) => (newState(state, {op: OT.QRVIEW})),
        // [AT.QRCODE] : (state, action) => (newState(state, {qrcode: action.payload, op: OT.MENU})),
        // [AT.SENDCODE] : (state, action) => (state.qrcode == null ? state : newState(state, {qrcode: state.qrcode, op: OT.SENDCODE}))
    },
    {}
    // {camPerm: false, op: OT.MENU, qrcode: null}
);

const AppRedux = {OT, Action, Reducer, Name};
export default AppRedux;
