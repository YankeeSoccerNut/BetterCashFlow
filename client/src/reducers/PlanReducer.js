// A reducer is a function that calculates and returns a piece of state

export default function (state=null, action){
  console.log("In PlanReducer....action", action);

  let newState = {};

  switch (action.type) {
    case 'SAVE-USER-PLAN':
      newState = {planId: action.payload.data.planId};
      console.log("newState from PlanReducer: ", newState);
      return newState;
    case 'GET-USER-PLAN':
      return state;
    default:
      return state;
  }
};
