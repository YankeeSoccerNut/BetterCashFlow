// An Action is a JS function that returns an object that contains at LEAST a property called "type"

import axios from 'axios';

export default function(formData){


  console.log("LoginAction is running!!\n",formData);

  let axiosPromise = null;

  axiosPromise = axios({
    url: `${window.apiHost}/api/login`,
    method: "POST",
    data: formData
  });


// using promise as payload will cause our middleware to kick in....
// redux-promise won't dispatch the action (inform reducers) until the promise is fulfilled

  return {
    type: "AUTH-ACTION",
    payload: axiosPromise
  };
};
