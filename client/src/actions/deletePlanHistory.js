import axios from 'axios';

export default function deletePlanHistory(planIdArray){
  console.log("deletePlanHistory action is running...");
  console.log(planIdArray);

  let axiosPromise = null;

  let authToken = localStorage.getItem('bcfJWT');

  axios.defaults.headers.common['Authorization'] = authToken;

  axiosPromise = axios({
    url: `${window.apiHost}/api/deletePlanHistory`,
    method: "POST",
    data: {plans: planIdArray}
  });

  return (
    {
      type: 'DELETE-PLAN-HISTORY',
      payload: axiosPromise
    }
  );
};
