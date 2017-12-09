// Reducers are functions that return a piece of state.  They take current state, an action, and calculate the next state (which is returned)
// Reducers should be pure functions....return is always the next state with no side effects

//Here we are dealing with changes to the Datatable that represents a potential payment schedule...the Datatable is being used to model the impact to various account balances over time


export default function(state=null, action){

  let newState = {...state};

  switch (action.type){
  case 'LOAD-TXNS':
    console.log("=============== DataTableReducer LOAD-TXNS =================");
    console.log(action.payload)
    if (state === null){   // initial and ONLY time through
      return ({transactions: action.payload});
    };
    break;
  case 'CELL-EDIT':
    console.log(state);
    console.log(action);
    return action.payload;
    break;
  case 'ROW-ADD':
    console.log(action);
    newState = state.datatable.slice().push(action.payload);
    console.log("newState......");
    console.log(newState);
    return newState;
    break;
  case 'ROW-DELETE':
    console.log(action);
    return state;
    break;
  default:
    return state;
  };
};

// USE CODE BELOW TO RECONSTRUCT!!
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
