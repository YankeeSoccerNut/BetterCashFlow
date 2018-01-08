// Reducers are functions that return a piece of state.  They take current state, an action, and calculate the next state (which is returned)
// Reducers should be pure functions....return is always the next state with no side effects.  They should NOT directly manipulate state.

//Here we are dealing with changes to the Datatable that represents a potential payment schedule...the Datatable is being used to model the impact to various account balances over time

//I don't think any state calculations are required as the react bootstrap datatable component is doing that for us!

import findIndex from 'lodash.findindex';
import moment from 'moment';

export default function(state=null, action){

  let newState = []
  let rowIndex = -1;

  switch (action.type){
  case 'IMPORT-TXNS':
    console.log("DataTableReducer IMPORT-TXNS: ", action.payload)
    newState = action.payload.map(buildTxnObject);

    console.log("newState: ", newState);

    return (newState);
  case 'LOAD-TXNS':
    // console.log(action.payload)
    if (state === null){   // initial and ONLY time through
      return (action.payload);
    } else {
      return(state);
    }
  case 'CELL-EDIT':
    console.log("=============== DataTableReducer CELL-EDIT =================");

    console.log("action............\n", action);

    newState = [...state]; //es6 spread syntax -- aka destructuring
    // console.log("finding....", action.payload.row.id);

    rowIndex = findIndex(newState, { id: action.payload.row.id });
    console.log("rowIndex: ", rowIndex);
    console.log("BEFORE\n", newState[rowIndex]);

    newState[rowIndex][action.payload.cellName] = action.payload.cellValue;

    console.log("AFTER\n", newState[rowIndex]);
    return(newState);

  case 'ADD-ROW':
    console.log("ADD-ROW DataTableReducer:", action.payload);
    newState = [...state, action.payload];  //es6 destructuring with new item
    console.log("reducer.ADD-ROW newState\n", newState);
    return(newState);

  case 'DELETE-ROW':
    // console.log(action);
    // console.log("DELETE-ROW state: \n", state);

    newState = [...state]; //es6 spread syntax -- aka destructuring

    // payload contains array of Ids to delete....iterate through, use lodash to find index, and then remove them from newState
    action.payload.map((rowId) => {
      rowIndex = findIndex(newState, { id: rowId});
      // console.log("rowIndex: ", rowIndex);
      newState.splice(rowIndex, 1);
      // console.log("newState length: ", newState.length);
    });

    return newState;

  case 'LOGOUT':
    return [];

  default:
    return state;
  }
};

function buildTxnObject(txn, index) {

    let txnObject = {};

    txnObject.id = index+1;
    txnObject.type = txn.type;
    txnObject.accountName = txn.accountName;
    txnObject.payee = txn.payee;
    txnObject.dueDate = moment(txn.dueDate).format('YYYY-MM-DD');
    txnObject.scheduledDate = moment(txn.scheduledDate).format('YYYY-MM-DD');
    txnObject.amount = txn.amount;
    console.log("txnObject: ", txnObject)

    return(txnObject);
};
