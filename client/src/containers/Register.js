import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import authAction from '../actions/authAction';

class Register extends Component {

  constructor(){
    super();
    this.state = { error: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      phone: e.target[3].value,
      company: e.target[4].value,
    }

    this.props.authAction(formData);
  }

  componentWillReceiveProps(newProps){

    if(newProps.auth.msg === "registerSuccess"){
          // the user was inserted.
          // We have the token and name safely in the auth reducer.
          // Move them to the home page.
          this.props.history.push('/');
          // line above: tell teh router to move them forward to /
    } else if (newProps.auth.msg === "userExists") {
      this.setState( {error: "This email is already registered.  Please login or use different email"} );
    };
  };

  render(){

    return(
      <div className="container">
      <Form horizontal onSubmit={this.handleSubmit}>
        <h1>{this.state.error}</h1>
        <FormGroup controlId="formHorizontalName" validationState={this.state.nameError}>
            <Col componentClass={ControlLabel} sm={2}>
                Name
            </Col>
            <Col sm={5}>
                <FormControl id="name" type="text" name="fullName" placeholder="Full Name" />
            </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
            <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
            <Col sm={5}>
                <FormControl type="email" name="email" placeholder="Email" />
            </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
            <Col sm={5}>
                <FormControl type="password" name="password" placeholder="Password" />
            </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
                Phone
            </Col>
            <Col sm={5}>
                <FormControl type="text" name="phone" placeholder="Phone" />
            </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
                Company Name
            </Col>
            <Col sm={5}>
                <FormControl type="text" name="company" placeholder="Company Name" />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col sm={5} className="text-center">
                <Button bsStyle="primary" bsSize="large" type="submit">
                    Register
                </Button>
            </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch){

  return bindActionCreators({
    authAction: authAction
  }, dispatch);
};

function mapStateToProps(state){
  // state = rootReducer
  // key will become this.props.key and accessible to this component
  // value is a property of the RootReducer which is a reference to the reducer function

  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
