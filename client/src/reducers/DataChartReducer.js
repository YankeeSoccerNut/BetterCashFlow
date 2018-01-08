import { dateToday, getBalanceSeriesStruct } from '../util/generateProjections';
import findIndex from 'lodash.findindex';

export default function(state=null, action){

  // This reducer creates the timeseries that drives the data visualization.
  // Ideally we would start with a beginning balance for the Cash and Credit line accounts.  Then we could use the dataTable to project the balances over a given timeframe.

  //The trick here is that the NEW-DATATABLE action is triggered when the DataTable componentWillReceiveProps.

  console.log("***********IN DataChartReducer**********: ", action);

  let newState = {};

  switch (action.type){

  case 'LOAD-USER-FIN-ACCTS':
    console.log('LOAD-USER-FIN-ACCTS  payload.data', action.payload.data);

    if(state === null){
      newState = {beginningCash: 0,
      beginningCredit: 0};
    } else {
      newState = {...state};
    };

    newState.beginningCash = 0;
    newState.beginningCredit = 0

    let a = action.payload.data;  //shorthand

    let cashIndex = findIndex(a, { type: 'CASH' });
    let creditIndex = findIndex(a, { type: 'CREDIT' });

    console.log('cashIndex ', cashIndex);
    console.log('creditIndex ', creditIndex);

    if(cashIndex < 0 && creditIndex < 0){
      console.log("No Cash && No Credit Accounts");
    };

    if (cashIndex > -1){
      console.log("a[cashIndex]", a[cashIndex]);
      console.log("a[cashIndex].accounts[0]", a[cashIndex].accounts[0]);

      newState.beginningCash = a[cashIndex].accounts[0].available;
    };

    if (creditIndex > -1){
      console.log("a[creditIndex]", a[creditIndex]);
      newState.beginningCredit = a[creditIndex].accounts[0].available;
    };

    console.log('newState in LOAD-USER-FIN-ACCTS for DataChart: ', newState);
    return(newState);

  case 'NEW-DATATABLE':

    console.log("NEW-DATATABLE DataChartReducer action payload", action.payload);

    newState = {...state};
    console.log("newState in NEW-DATATABLE: ", newState);

    let today = dateToday();

    // create an initial 60-day projection table...TODO:  add UI to let user choose range
    //iterate across all transactions and project daily balances for each account...begining with TODAY.  Resulting table should be:
    // date, acct1 balance, acct 2 balance
    // let cashIndex = findIndex(state.accountObjects, { type: 'CASH' });
    // let cashBeginning = state.accountObjects[cashIndex].available;
    //
    // let creditIndex = findIndex(state.accountObjects, { type: 'CREDIT' });
    // let creditBeginning = state.accountObjects[creditIndex].available;

    newState.timeSeries = getBalanceSeriesStruct(action.payload, [state.beginningCash,state.beginningCredit], today, 60);

    return newState;

  case 'LOGOUT':
    return {};

  default:
    return state;
  };
};
