
  // Reducers are functions that calculate the next state.  They take current state, an action, and calculate the next state (which is returned)
  // Reducers should be pure functions....return is always the next state with no side effects.  Simply returning state is effectively saying 'no change' from this Reducer's perspective.

  //Here we are dealing with changes to the balance projections
  //This reducer will look at these balances and set statuses accordingly....


  export default function(state=[], action){

    switch (action.type){
    case 'NEW-PROJECTION':

      console.log("NEW-PROJECTION in AnalyzerReducer....\n", action)

      if(action.payload.timeSeries === undefined){
        console.log("action.payload.timeSeries === undefined so returning state...no analysis")
        return(state);
      };

      let newState = [];
      let factors = action.payload.timeSeries;

      let timeSeriesJSON = factors.dailyBalances.toJSON();
      console.log(timeSeriesJSON);

      if (factors.endingCash > 0){
        newState.push({type: 'O', direction: 1, text: `You have a positive ending Cash Balance of $${factors.endingCash.toFixed(2)} for the period.`})
      };

      if (factors.endingCash - factors.netCreditUsed > 0){
        newState.push({type: 'O', direction: 1, text: `Great job!  Your ending cash balance of $${factors.endingCash.toFixed(2)} covers your expenditures AND your current credit line for the period.`})
        newState.push({type: 'R', direction: 0, text: `Start making plans for how you can use 'extra' cash.`})
      };

      if (factors.endingCash < 0 && factors.endingCredit > 0) {
        newState.push({type: 'O', direction: -1, text: `You have insufficient cash to cover your expenditures for the period.`});
        newState.push({type: 'R', direction: 0, text: `See if you can generate or accelerate more receivables.`});
        newState.push({type: 'R', direction: 0, text: `Consider using your available credit instead of cash.`});
      };

      if (factors.endingCash < 0 && factors.endingCredit <= 0) {
        newState.push({type: 'O', direction: -1, text: `You are in a tough spot.`});
        newState.push({type: 'O', direction: -1, text: `You have insufficient cash to cover your expenditures for the period.`});
        newState.push({type: 'O', direction: -1, text: `You no available credit.`});

        newState.push({type: 'R', direction: 0, text: `See if you can generate or accelerate more receivables.`});
        newState.push({type: 'R', direction: 0, text: `Consider addtional credit lines through alternative financing.`});
      };

      if (factors.endingCash === 0 && factors.endingCredit > 0) {
        newState.push({type: 'O', direction: -1, text: `Your cash balance should be higher.`});

        newState.push({type: 'R', direction: 0, text: `See if you can generate or accelerate more receivables.`});
        newState.push({type: 'R', direction: 0, text: `Push out some cash payments to later dates if possible.`});
        newState.push({type: 'R', direction: 0, text: `Consider using your available credit line instead of cash for some expenses.`});
      };

      console.log("+++++++++++++++++ANALYZER STATE+++++++++++");
      console.log(newState);
      return (newState);

    default:
      return state;
    };
  };
