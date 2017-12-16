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


  switch (action.type){
  case 'LOAD-TXNS':
    console.log("LOAD-TXNS DataChartReducer action payload", action.payload);
    console.log("state", state);
    let projections = {};
    // tranform transactions into a TimeSeries we can use
    // TODO: reevaluate...beginning balances?

    if (state === null){
      console.log("State is null...setting balances to 0");
      projections.initialCashBalance = 0;
      projections.initialCreditBalance = 0;
    };

    let seriesTrans = action.payload.map((t) => {  //(t)ransaction
      return [t.scheduledDate, t.accountName, t.type, t.amount]
    });
    console.log("reformatted transactions for series\n", seriesTrans)

    projections.timeSeries = new TimeSeries({
        name: "Balances",
        columns: ["index", "account", "type", "amount"],
        utc: true,
        points: seriesTrans
    });

    console.log("timeSeries: \n", projections.timeSeries);
    console.log("returning newState LOAD-TXNS:\n", projections);

    return projections;
    break;

  case 'INIT-FIN-ACCT':
  case 'ADD-ROW':
  case 'DELETE-ROW':
  case 'CELL-EDIT':
    console.log("DataChartReducer action payload", action.payload);
    console.log("state", state);
    let newBalance = state.initialCashBalance += 1;
    // return {...state, projections.initialCashBalance: newBalance};
    return state;
    break;

  default:
    return state;
  };

};
