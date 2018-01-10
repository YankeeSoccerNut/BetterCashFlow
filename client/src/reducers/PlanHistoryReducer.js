// A reducer is a function that calculates and returns a piece of state

export default function (state=null, action){
  console.log("In PlanHistoryReducer....action", action);

  let newState = {};

  switch (action.type) {
    case 'GET-PLAN-HISTORY':
      newState = {planHistory: action.payload.data.planHistory};
      console.log("newState from PlanHistoryReducer: ", newState);
      return newState;
    case 'IMPORT-TXNS':
      return {};
    default:
      return state;
  }
};
