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


function sortTrans(trans) {
    trans.sort((a, b) => (createDate(a.scheduleDate) - createDate(b.sheduleDate)))
}
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
		targetRow[action.payload.fieldName] = parseInt(action.payload.value);
		state.transactions[rowIdx] = targetRow;
	    }
	    sortTrans(state.transactions)
	    return newState(state,
			    {transactions: state.transactions,
			     seriesStruct: getBalanceSeriesStruct(state.transactions, CURRENT_BALANCE, CURRENT_DATE)});
	},
	[AT.ONDELETEROW] : (state, action) => {
	    console.log(action.payload);
	    state.transactions = state.transactions.filter((tran) => {
		return tran.id !== action.payload[0];
	    })
	    sortTrans(state.transactions)
	    return newState(state,
			    {transactions: state.transactions,
			     seriesStruct: getBalanceSeriesStruct(state.transactions, CURRENT_BALANCE, CURRENT_DATE)});
	},
	[AT.ONADDROW] : (state, action) => {
	    console.log(action.payload);
      const row = action.payload;
      row.amount = parseInt(row.amount)
	    state.transactions.push(row)
	    sortTrans(state.transactions)	    
	    return newState(state,
			    {transactions: state.transactions,
			     seriesStruct: getBalanceSeriesStruct(state.transactions, CURRENT_BALANCE, CURRENT_DATE)});
	}
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
