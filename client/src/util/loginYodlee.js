// This function establishes the cobrand context with yodleee

import axios from 'axios';

import yodleeConfig from '../../config/yodleeConfig';

export default function(authToken){


  console.log("Establishing yodlee cobrand context");

  let axiosPromise = null;

  axiosPromise = axios({
    url: 'https://developer.api.yodlee.com/ysl/restserver/v1/cobrand/login',
    method: "POST"
  });


};
