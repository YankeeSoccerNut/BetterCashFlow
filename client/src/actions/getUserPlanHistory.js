import axios from 'axios';

export default function getUserPlanHistory(){

  // don't need props because uid is encrypted in the authToken...

  let axiosPromise = null;

  let authToken = localStorage.getItem('bcfJWT');

  axios.defaults.headers.common['Authorization'] = authToken;

  axiosPromise = axios({
    url: `${window.apiHost}/api/getUserPlanHistory`,
    method: "POST",
    data: {limit: 25}
  });

  return (
    {
      type: 'GET-PLAN-HISTORY',
      payload: axiosPromise
    }
  );

// using promise as payload will cause our middleware to kick in....
// redux-promise won't dispatch the action (inform reducers) until the promise is fulfilled

};
