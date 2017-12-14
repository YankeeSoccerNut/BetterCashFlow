import { TimeSeries } from 'pondjs';

export default function(state=null, action){

  // I want this reducer to create the timeseries that drives the data visualization.  A lot going on here!
  // Ideally we would start with a beginning balance for the Cash and Credit line accounts.  Then we could use the dataTable to project the balances over a given timeframe.
  // A few gotchas....
  // 1.  Each beginning balance depends on FinAccount load completing.  There are 2.
  // 2.  There is another dependency on dataTable that represents the payables/income and their target accounts.
  // So...this DataChart state has 3 pieces

  // initialCashBalance: state.initialCashBalance,
  // initialCreditBalance: state.initialCreditBalance,
  // projectedBalances: state.projectedBalances

  console.log("+++++++++++++++++WILL NEED TO CALC TIME SERIES");

  switch (action.type){
  case 'LOAD-TXNS':
    console.log("LOAD-TXNS DataChartReducer action payload", action.payload);
    console.log("state", state);
    let newState = {};
    // tranform transactions into a TimeSeries we can use
    // TODO: reevaluate...beginning balances?

    if (state === null){
      console.log("State is null...setting balances to 0");
      newState.initialCashBalance = 0;
      newState.initialCreditBalance = 0;
    };

    let seriesTrans = action.payload.map((t) => {  //(t)ransaction
      return [t.scheduledDate, t.accountName, t.type, t.amount]
    });
    console.log("reformatted transactions for series\n", seriesTrans)

    newState.timeSeries = new TimeSeries({
        name: "Balances",
        utc: false,
        columns: ["index", "account", "type", "amount"],
        points: seriesTrans
    });

    console.log("seriesStruct:\n", newState.timeSeries);

    return newState;
    break;

  case 'INIT-FIN-ACCT':
  case 'ADD-ROW':
  case 'DELETE-ROW':
  case 'CELL-EDIT':
    console.log("DataChartReducer action payload", action.payload);
    console.log("state", state);
    let newBalance = state.initialCashBalance += 1;
    return {...state, initialCashBalance: newBalance};
    break;

  default:
    return state;
  };

};
