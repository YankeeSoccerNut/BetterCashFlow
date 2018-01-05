import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, Checkbox } from 'react-bootstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../actions/loginAction';
import axios from 'axios';

import ImportCSV from './ImportCSV';

class Login extends Component {

constructor(){
  super();
  this.state = {
    error: ""
  };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.testButton = this.testButton.bind(this)
};

testButton(){
  console.log("Test button pressed! state.auth: \n", this.props.auth);
  let authToken = 'JWT ' + this.props.auth.token;
  console.log("authToken: ", authToken);

  axios.defaults.headers.common['Authorization'] = authToken;

  axios(`${window.apiHost}/api/protected`, {
    method: 'post',
  }).then((response)=>{
    console.log(response.data);
  });
};

handleSubmit(e){
  e.preventDefault();
  console.log("handleSubmit running");
  console.dir(e.target);

  const formData = {
    email: e.target[0].value,
    password: e.target[1].value
  };

  // validations....done via type and required in html5

  this.props.loginAction(formData);
};

componentWillReceiveProps(newProps){
  console.log("componentWillReceiveProps Login.js\n", newProps);

  if(newProps.auth.token === ''){
    this.setState({error: newProps.auth.status});
  } else {
    console.log(newProps.auth.status);
    newProps.history.push('/better-cash-flow');
  };
};

render(){
    return(
      <div className="container mylogin">
        <h1 className="text-danger">{this.state.registerMessage}</h1>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalEmail" validationState={this.state.nameError}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={5}>
              <FormControl type="email" name="email" placeholder="Email" required="true"/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" validationState={this.state.emailError}>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={5}>
              <FormControl type="password" name="password" required="true" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={5}>
              <Button bsStyle="primary" type="submit">
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <div>
          <button onClick={this.testButton} className="btn btn-primary">AUTH TEST</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loginAction: loginAction
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
