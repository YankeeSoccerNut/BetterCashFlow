// import { TimeSeries } from 'pondjs';
import { dateToday, getBalanceSeriesStruct } from '../util/generateProjections';

export default function(state=null, action){

  // This reducer creates the timeseries that drives the data visualization.
  // Ideally we would start with a beginning balance for the Cash and Credit line accounts.  Then we could use the dataTable to project the balances over a given timeframe.

  //The trick here is that the NEW-DATATABLE action is triggered when the DataTable componentWillReceiveProps.

  switch (action.type){

    case 'NEW-DATATABLE':

    console.log("NEW-DATATABLE DataChartReducer action payload", action.payload);
    console.log("state", state);

    let today = dateToday();
    let projections = {};

    if (state === null){
      console.log("State is null...setting balances to 0");
      projections.initialCashBalance = 0;
      projections.initialCreditBalance = 0;
    };

    // create an initial 60-day projection table...TODO:  add UI to let user choose range
    //iterate across all transactions and project daily balances for each account...begining with TODAY.  Resulting table should be:
    // date, acct1 balance, acct 2 balance

    projections.timeSeries = getBalanceSeriesStruct(action.payload, [0,0], today, 60);

    return projections;

  default:
    return state;
  };
};
