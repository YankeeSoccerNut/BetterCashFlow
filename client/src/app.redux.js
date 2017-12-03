import {generateReducer, newState, applyName, getBalanceSeriesStruct, createDate} from './lib.js';
import {getTransactions, getBalances, accountNameTypes, typeTypes} from './data.mock.js';

// following design guides here: https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
const Name = 'AppRedux';
//view type
const VT = {
    DASHBOARD: 'dashboard'
};
//redux action type
const AT = applyName(Name, {
    ONCELLEDIT: 'ONCELLEDIT',
    ONDELETEROW: 'ONDELETEROW',
    ONADDROW: 'ONADDROW'
});

////////////action creators
//loosely following https://github.com/acdlite/redux-actions for action format
const Action = {
    onCellEdit: (payload) => ({type: AT.ONCELLEDIT, payload: payload}),
    onDeleteRow: (payload) => ({type: AT.ONDELETEROW, payload: payload}),
    onAddRow: (payload) => ({type: AT.ONADDROW, payload: payload})    
};

const initTransactions = getTransactions();
const CURRENT_BALANCE = getBalances();
const CURRENT_DATE = new Date();
CURRENT_DATE.setHours(0, 0, 0, 0);


///////////reducers and inital state
const Reducer = generateReducer(
    {
        [AT.ONCELLEDIT] : (state, action) => {
	    let rowIdx;
	    const targetRow = state.transactions.find((tran, i) => {
		if (tran.id == action.payload.row.id) {
		    rowIdx = i;
		    return true;
		}
		return false;
	    });
	    if (targetRow) {
		targetRow[action.payload.fieldName] = action.payload.value;
		state.transactions[rowIdx] = targetRow;
	    }
	    return newState(state, {transactions: state.transactions, seriesStruct: getBalanceSeriesStruct(action.payload, CURRENT_BALANCE, CURRENT_DATE)});
	}
	// (
	//     newState(state,
	// 							 {transactions: action.payload,
	// 							  seriesStruct: getBalanceSeriesStruct(action.payload, CURRENT_BALANCE, CURRENT_DATE)}))
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
