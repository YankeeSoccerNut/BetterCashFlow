
  // Reducers are functions that calculate the next state.  They take current state, an action, and calculate the next state (which is returned)
  // Reducers should be pure functions....return is always the next state with no side effects.  Simply returning state is effectively saying 'no change' from this Reducer's perspective.

  //Here we are dealing with changes to the balance projections
  //This reducer will look at these balances and set statuses accordingly....


  export default function(state=null, action){

    switch (action.type){
    case 'NEW-PROJECTION':
      console.log("NEW-PROJECTION in AnalyzerReducer....\n", action)

      if (state === null){
        return (state);
      };

      let newState = {msg: "Appropriate Statuses"};

      return (newState);

    default:
      return state;
    };
  };
