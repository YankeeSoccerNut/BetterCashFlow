// An Action is a JS function that returns an object that contains at LEAST a property called "type"

import axios from 'axios';

export default function(formData){

  console.log("authAction is running!!\n",formData);
  let axiosPromise = axios({
    url: `${window.apiHost}/api/register`,
    method: "POST",
    data: formData
  });

// using promise as payload will cause our middleware to kick in....
// redux-promise won't dispatch the action until the promise is fulfilled (either )
  return {
    type: "AUTH-ACTION",
    payload: axiosPromise
  };
};
