// An Action is a JS function that returns an object that contains at LEAST a property called "type"

import axios from 'axios';

export default function(authToken){


  console.log("linkFinAccounts is running!!");

  // console.log("authToken: ", authToken);
  //
  // axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken;
  //
  // let axiosPromise = null;
  //
  // axiosPromise = axios({
  //   url: `${window.apiHost}/api/loadUserFinAccounts`,
  //   method: "POST"
  // });


// using promise as payload will cause our middleware to kick in....
// redux-promise won't dispatch the action (inform reducers) until the promise is fulfilled

  return {
    type: "LINK-USER-FIN-ACCTS",
    payload: null
  };
};
