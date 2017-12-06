// Reducers are functions that return a piece of state

export default function(state, action){

    //       [AT.ONCELLEDIT] : (state, action) => {
  	//     let rowIdx;
  	//     const targetRow = state.transactions.find((tran, i) => {
  	// 	if (tran.id == action.payload.row.id) {
  	// 	    rowIdx = i;
  	// 	    return true;
  	// 	}
  	// 	return false;
  	//     });
  	//     if (targetRow) {
  	// 	targetRow[action.payload.fieldName] = parseInt(action.payload.value);
  	// 	state.transactions[rowIdx] = targetRow;
  	//     }
  	//     sortTrans(state.transactions)
  	//     return newState(state,
  	// 		    {transactions: state.transactions,
  	// 		     seriesStruct: getBalanceSeriesStruct(state.transactions, CURRENT_BALANCE, CURRENT_DATE)});
  	// },
  	// [AT.ONDELETEROW] : (state, action) => {
  	//     console.log(action.payload);
  	//     state.transactions = state.transactions.filter((tran) => {
  	// 	return tran.id !== action.payload[0];
  	//     })
  	//     sortTrans(state.transactions)
  	//     return newState(state,
  	// 		    {transactions: state.transactions,
  	// 		     seriesStruct: getBalanceSeriesStruct(state.transactions, CURRENT_BALANCE, CURRENT_DATE)});
  	// },
  	// [AT.ONADDROW] : (state, action) => {
  	//     console.log(action.payload);
    //     const row = action.payload;
    //     row.amount = parseInt(row.amount)
  	//     state.transactions.push(row)
  	//     sortTrans(state.transactions)
  	//     return newState(state,
  	// 		    {transactions: state.transactions,
  	// 		     seriesStruct: getBalanceSeriesStruct(state.transactions, CURRENT_BALANCE, CURRENT_DATE)});
  	// }
    //   },

  // all reducers have 2 parms...
  // 1. current state
  // 2. info that came from the action
  console.log(action);
  console.log(state);
  return null;
}
