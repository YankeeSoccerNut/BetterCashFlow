import axios from 'axios';

export default function saveUserPlan(props){
  console.log("planSelected is running...props: ", props);


  let axiosPromise = null;

  let authToken = localStorage.getItem('bcfJWT');

  axios.defaults.headers.common['Authorization'] = authToken;

  axiosPromise = axios({
    url: `${window.apiHost}/api/getPlanDetails`,
    method: "POST",
    data: {planObject: props.planObject}
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
