// A reducer is a function that calculates and returns a piece of state

export default function (state=null, action){
  console.log("In PlanReducer....action", action);

  let newState = {};

  switch (action.type) {
    case 'SAVE-USER-PLAN':
      newState = {planId: action.payload.data.planId.planId,
      planSummary: {
        user_plan_name: action.payload.data.planId.planName,
        comments:  action.payload.data.planId.planName
        }
      };
      console.log("newState from PlanReducer: ", newState);
      return newState;
    case 'GET-USER-PLAN':
      return state;
    case 'GET-PLAN-DETAILS':
      newState = {planId: action.payload.data.planDetails.planId,
      planSummary: action.payload.data.planDetails.planSummary[0]}
      console.log("newState GET-PLAN-DETAILS: ", newState);
      return newState;
    default:
      return state;
  }
};
