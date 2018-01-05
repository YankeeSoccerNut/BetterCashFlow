// A reducer is a function that calculates and returns a piece of state

export default function (state={}, action){

  switch (action.type) {
    case 'AUTH-ACTION':
      let newState = action.payload.data;
      return newState;
    case 'LOGOUT':
      return {};
    default:
      return state
  }
};
