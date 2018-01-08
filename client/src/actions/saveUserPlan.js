import axios from 'axios';

export default function saveUserPlan(props){
  console.log("saveUserPlan is running...props: ", props);


  let axiosPromise = null;

  let authToken = localStorage.getItem('bcfJWT');

  axios.defaults.headers.common['Authorization'] = authToken;

  axiosPromise = axios({
    url: `${window.apiHost}/api/saveUserPlan`,
    method: "POST",
    data: {planObject: props.planObject,
          transactions: props.transactions}
  });

  return (
    {
      type: 'SAVE-USER-PLAN',
      payload: axiosPromise
    }
  );

// using promise as payload will cause our middleware to kick in....
// redux-promise won't dispatch the action (inform reducers) until the promise is fulfilled


};