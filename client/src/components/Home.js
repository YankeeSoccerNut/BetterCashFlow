import React, { Component } from 'react';
import Login from '../containers/Login';
class Home extends Component{

  constructor(props){
    super(props);
  };
  
  render(){
    console.log("rendering Home component");
    return (
      <div id="homepage">
        <Login />
      </div>
    );
  };
};

export default Home;
