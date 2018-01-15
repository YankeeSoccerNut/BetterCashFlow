// A reducer is a function that calculates and returns a piece of state

export default function (state=null, action){
  console.log("In PlanHistoryReducer....action", action);

  let newState = {};
  let remaining = [];

  switch (action.type) {
    case 'GET-PLAN-HISTORY':
      newState = {planHistory: action.payload.data.planHistory};
      console.log("newState from PlanHistoryReducer: ", newState);
      return newState;

    case 'DELETE-PLAN-HISTORY':

      // build a new array of items that have NOT been deleted...e.g. are not in the payload
      remaining = state.planHistory.filter((plan) => {
        if(action.payload.data.deletedPlans.includes(plan.id)){
          console.log("planId deleted: ", plan.id);
          return(false);
        } else {
          return (true);
        }
      });

      newState = {planHistory: remaining}
      return(newState);

    default:
      return state;
  }
};
