testButton(){
  console.log("Test button pressed! state.auth: \n", this.props.auth);


  // let authToken = 'JWT ' + this.props.auth.token;

  let authToken = localStorage.getItem('bcfJWT');

  console.log("authToken: ", authToken);

  axios.defaults.headers.common['Authorization'] = authToken;

  axios(`${window.apiHost}/api/protected`, {
    method: 'post',
  }).then((response)=>{
    console.log(response.data);
  });
};
