import axios from 'axios';

export default function planSelected(planId){
  console.log("planSelected is running...planKey: ", planId);


  let axiosPromise = null;

  let authToken = localStorage.getItem('bcfJWT');

  axios.defaults.headers.common['Authorization'] = authToken;

  axiosPromise = axios({
    url: `${window.apiHost}/api/getPlanDetails`,
    method: "POST",
    data: {planId: planId}
  });

  return (
    {
      type: 'GET-PLAN-DETAILS',
      payload: axiosPromise
    }
  );

// using promise as payload will cause our middleware to kick in....
// redux-promise won't dispatch the action (inform reducers) until the promise is fulfilled


};
