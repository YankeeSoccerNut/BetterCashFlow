import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Login from '../containers/Login';
import Register from '../containers/Register';

class Home extends Component{

  constructor(props){
    super(props);
    this.registerClick = this.registerClick.bind(this)
  };

  registerClick(){
    console.log("Register button pressed!");
    this.props.history.push('/register');
  };

  render(){
    console.log("rendering Home component");
    
    return (
      <div id="homepage">
        <div id="login-section">
          <Login history={this.props.history}/>
        </div>
        <hr></hr>
        <div className="col-sm-offset-4">
          <Button onClick={this.registerClick} bsStyle="success">Register for New Account</Button>
        </div>
      </div>
    );
  };
};

export default Home;
