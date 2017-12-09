
  // Reducers are functions that calculate the next state.  They take current state, an action, and calculate the next state (which is returned)
  // Reducers should be pure functions....return is always the next state with no side effects.  Simply returning state is effectively saying 'no change' from this Reducer's perspective.

  //Here we are dealing with changes to the Account Info which can be as a result of:
  // 1.  Initial fetch from Financial institution
  // 2.  Local changes from other components.  In this application these changes come from manipulating the DataTableView.

  export default function(state=null, action){
    // console.log("<<<<<<<<<<<<<reducer.FinAccount");
    // console.log(action);

    switch (action.type){
    case 'INIT-FIN-ACCT':
      console.log("################ new state in INIT-FIN-ACCT ################");
      console.log("action payload", action.payload);
      console.log("state", state);

      if (state === null){
        return ({accountObjects: [action.payload]});
      }
      else {
        // let newState = {...state}; //es6 spread
        // console.log("copy state to newState: ", newState);
        // newState.accountObjects.push(action.payload);
        // console.log("newState after push: ", newState);
        state.accountObjects.push(action.payload);
        console.log("state:" , state);
        return (state.accountObjects);
      }
      break;
    default:
      return state;
    };
  };
