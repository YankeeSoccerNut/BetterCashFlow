import {generateReducer, newState, applyName, getDates, getBalanceSeriesStruct} from './lib.js';
import {getTransactions, getBalances, accountNameTypes, typeTypes} from './data.mock.js';

// following design guides here: https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
const Name = 'AppRedux';
//view type
const VT = {
    DASHBOARD: 'dashboard'
};
//redux action type
const AT = applyName(Name, {
    TRANSACTIONS_UPDATED: 'TRANSACTIONS_UPDATED'
});

////////////action creators
//loosely following https://github.com/acdlite/redux-actions for action format
const Action = {
    transactionsUpdated: (transactions) => ({type: AT.TRANSACTIONS_UPDATED, payload: transactions})
};

const initTransactions = getTransactions();
const CURRENT_BALANCE = getBalances();

const CURRENT_DATE = new Date();


///////////reducers and inital state
const Reducer = generateReducer(
    {
        [AT.TRANSACTIONS_UPDATED] : (state, action) => (newState(state,
								 {transactions: action.payload,
								  seriesStruct: getBalanceSeriesStruct(action.payload, CURRENT_BALANCE, CURRENT_DATE)}))
        // [AT.MENU] : (state, action) => (newState(state, {op: OT.MENU})),
        // [AT.QRVIEW] : (state, action) => (newState(state, {op: OT.QRVIEW})),
        // [AT.QRCODE] : (state, action) => (newState(state, {qrcode: action.payload, op: OT.MENU})),
        // [AT.SENDCODE] : (state, action) => (state.qrcode == null ? state : newState(state, {qrcode: state.qrcode, op: OT.SENDCODE}))
    },
    {
	transactions: initTransactions,
	vt: VT.DASHBOARD,
	seriesStruct: getBalanceSeriesStruct(initTransactions, CURRENT_BALANCE, CURRENT_DATE)
    }
    // {camPerm: false, op: OT.MENU, qrcode: null}
);

const AppRedux = {VT, Action, Reducer, Name};
export default AppRedux;
