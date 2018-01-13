import axios from 'axios';

export default function saveUserPlan(props, formData){
  console.log("saveUserPlan is running...props: ", props);

  console.log("formData: ", formData);

  let axiosPromise = null;
  let planObject = {planId: null,
                    planName:  formData.planName,
                    planComments: formData.planComments,
                    planUpdateExisting:  formData.planUpdateExisting};

  let authToken = localStorage.getItem('bcfJWT');

// TODO: replace this workaround to bug on 1st save click after initial page load....
  if (props.planObject !== null) {
    planObject.planId = props.planObject.planId;
  };

  axios.defaults.headers.common['Authorization'] = authToken;

  axiosPromise = axios({
    url: `${window.apiHost}/api/saveUserPlan`,
    method: "POST",
    data: {planObject: planObject,
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
