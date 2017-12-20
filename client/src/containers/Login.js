import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../actions/loginAction';

class Login extends Component {

constructor(){
  super();
  this.state = {
    error: ""
  };
  this.handleSubmit = this.handleSubmit.bind(this);
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
  console.log("componentWillReceiveProps\n", newProps);
  console.log(newProps.auth.msg);
  if(newProps.auth.msg === "wrongPassword"){
    this.setState({error: "Password doesn't match"});
  } else if (newProps.auth.msg === "badUser") {
    this.setState({error: "Password doesn't match"});
  } else if (newProps.auth.msg === "loginSuccess") {
    newProps.getCart(newProps.auth.token);
    newProps.history.push('/');
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
            <Col smOffset={2} sm={5}>
              <Button bsStyle="success" bsSize="large" type="submit">
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
