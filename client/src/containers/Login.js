import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, Checkbox, InputGroup } from 'react-bootstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../actions/loginAction';

import ImportCSV from './ImportCSV';

class Login extends Component {

constructor(){
  super();
  this.state = {
    error: ""
  };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.clickRememberMe = this.clickRememberMe.bind(this);

};

clickRememberMe(e){
  console.log("clickRememberMe hit.....");
  console.dir(e.target);

  if(!e.target.checked){
    console.log("Remember Me is FALSE");
    localStorage.setItem('bcfEmail', '');
    e.target.value = 'off';
  } else {
    console.log("Remember Me is TRUE");
    e.target.value = 'on';
  }

  //rewrite of email if checked is done in handleSubmit
};

handleSubmit(e){
  e.preventDefault();
  console.log("handleSubmit running");
  console.dir(e.target);

  const formData = {
    email: e.target[0].value,
    password: e.target[1].value
  };

  if(e.target[2].checked){
    console.log("Remember Me is TRUE");
    localStorage.setItem('bcfEmail', formData.email);
  };
  // validations....done via type and required in html5

  this.props.loginAction(formData);
};

componentWillReceiveProps(newProps){
  console.log("componentWillReceiveProps Login.js\n", newProps);

  if(newProps.auth.token === ''){
    this.setState({error: newProps.auth.status});
  } else {
    let bcfJWT = 'JWT ' + newProps.auth.token;

    localStorage.setItem('bcfJWT', bcfJWT);
    console.log(newProps.auth);

    newProps.history.push('/better-cash-flow');
  };
};

render(){

    console.log("RENDERING LOGIN......");

    let initialEmail = localStorage.getItem('bcfEmail');

    let rememberMe = false;

    if (initialEmail !== ''){
      rememberMe = true;
    };

    return(
      <div className="container mylogin">
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalEmail" validationState={this.state.nameError}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={5}>
              <FormControl type="email" name="email" placeholder="Email"
              defaultValue={initialEmail} required="true"/>
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
              <Checkbox defaultChecked={rememberMe} onClick={this.clickRememberMe}>Remember me</Checkbox>
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
