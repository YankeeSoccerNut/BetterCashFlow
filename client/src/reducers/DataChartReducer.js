// import { TimeSeries } from 'pondjs';
import { dateToday, getBalanceSeriesStruct } from '../util/generateProjections';

export default function(state=null, action){

  // I want this reducer to create the timeseries that drives the data visualization.  A lot going on here!
  // Ideally we would start with a beginning balance for the Cash and Credit line accounts.  Then we could use the dataTable to project the balances over a given timeframe.
  // A few gotchas....
  // 1.  Each beginning balance depends on FinAccount load completing.  There are 2.
  // 2.  There is another dependency on dataTable that represents the payables/income and their target accounts.
  // So...this DataChart state has 3 pieces

  // initialCashBalance -  state.projections.initialCashBalance,
  // initialCreditBalance -  state.projections.initialCreditBalance,
  // projectedDailyBalances: state.projections.timeSeries.dailyBalances
  // this last piece is done in generateProjections.js

  let today = dateToday();
  let projections = {};

  switch (action.type){
  // case 'LOAD-TXNS':
  //   console.log("LOAD-TXNS DataChartReducer action payload", action.payload);
  //   console.log("state", state);
  //   // tranform transactions into a TimeSeries we can use
  //   // TODO: reevaluate...beginning balances?
  //
  //   if (state === null){
  //     console.log("State is null...setting balances to 0");
  //     projections.initialCashBalance = 0;
  //     projections.initialCreditBalance = 0;
  //   };
  //
  //   // create an initial 30-day projection table...TODO:  expand to 90-day
  //
  //   //iterate across all transactions and project daily balances for each account...begining with TODAY.  Resulting table should be:
  //   // date, acct1 balance, acct 2 balance
  //
  //   projections.timeSeries = getBalanceSeriesStruct(action.payload, [100000,100000], today, 60);
  //
  //   return projections;

  case 'NEW-DATATABLE':

  console.log("NEW-DATATABLE DataChartReducer action payload", action.payload);
  console.log("state", state);

    // create an initial 30-day projection table...TODO:  expand to 90-day

    if (state === null){
      console.log("State is null...setting balances to 0");
      projections.initialCashBalance = 0;
      projections.initialCreditBalance = 0;
    };

    //iterate across all transactions and project daily balances for each account...begining with TODAY.  Resulting table should be:
    // date, acct1 balance, acct 2 balance

    projections.timeSeries = getBalanceSeriesStruct(action.payload, [1000,1000], today, 60);

    return projections;


  // case 'INIT-FIN-ACCT':
  // // we have new inital balances....
  // console.log("ChartReducer INIT-FIN-ACCT action\n", action.payload)
  //   return(state);
  //
  // case 'ADD-ROW':
  // // we have a new payable or income row that affects balances from the scheduled date forward
  // console.log("ChartReducer ADD-ROW action\n", action.payload)
  //
  //   return(state);
  //
  // case 'DELETE-ROW':
  // // a payable or income row has been deleted and that affects balances from the scheduled date forward
  // console.log("ChartReducer DELETE-ROW action\n", action.payload)
  //
  //   return(state);
  //
  // case 'CELL-EDIT':
  // // a payable cell has changed...need to understand the change and it's impact moving forward
  //   console.log("DataChartReducer CELL-EDIT action payload", action.payload);
  //   console.log("state", state);
  //   // return {...state, projections.initialCashBalance: newBalance};
  //   return state;

  default:
    return state;
  };

};
