
  // Reducers are functions that calculate the next state.  They take current state, an action, and calculate the next state (which is returned)
  // Reducers should be pure functions....return is always the next state with no side effects.  Simply returning state is effectively saying 'no change' from this Reducer's perspective.

  //Here we are dealing with changes to the balance projections
  //This reducer will look at these balances and set statuses accordingly....


  export default function(state=[], action){

    switch (action.type){
    case 'NEW-PROJECTION':
      console.log("NEW-PROJECTION in AnalyzerReducer....\n", action)

      let newState = [];
      let factors = action.payload.timeSeries;

      let timeSeriesJSON = factors.dailyBalances.toJSON();
      console.log(timeSeriesJSON);

      console.log("\nfactors.endingCash: ", factors.endingCash);
      console.log("\nfactors.endingCredit: ", factors.endingCredit);

      if (factors.endingCash > 0){
        newState.push({type: 'O', direction: 1, text: `You have a positive ending Cash Balance of $${factors.endingCash} for the period.`})
      };

      if (factors.endingCash + factors.endingCredit >= 0){
        newState.push({type: 'O', direction: 1, text: `Great job!  Your ending cash balance of $${factors.endingCash} covers your expenditures AND your current credit line for the period.`})
      } else if (factors.endingCash < 0 ) {
        newState.push({type: 'O', direction: -1, text: `You have insufficient cash to cover your expenditures for the period.`})
        newState.push({type: 'R', direction: 0, text: `Monitor your credit line and see if you can generate or accelerate more receivables.`});
      };
      console.log("+++++++++++++++++ANALYZER STATE+++++++++++");
      console.log(newState);
      return (newState);

    default:
      return state;
    };
  };
