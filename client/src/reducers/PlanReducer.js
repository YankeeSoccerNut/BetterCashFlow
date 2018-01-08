// A reducer is a function that calculates and returns a piece of state

export default function (state=null, action){
  console.log("In PlanReducer....action", action);

  switch (action.type) {
    case 'SAVE-USER-PLAN':
      return state;
    case 'GET-USER-PLAN':
      return state;
    default:
      return state;
  }
};
