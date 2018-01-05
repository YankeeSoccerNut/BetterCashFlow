import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, HelpBlock } from 'react-bootstrap';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import authAction from '../actions/authAction';

class Register extends Component {

  constructor(){
    super();
    this.state = { password: '',
                   confirm: '',
                   error: '',
                  btnDisabled: true};



    this.handleChange = this.handleChange.bind(this);
    this.confirmMatch = this.confirmMatch.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    console.log("handling change......e.target: ", e.target);

    if (e.target.id === 'password'){
      this.setState({ password: e.target.value });
    } else if (e.target.id === 'confirm') {
      this.setState({ confirm: e.target.value });
    };

  };

  confirmMatch(){
    console.log("Confirming match......")

    if (this.state.password === this.state.confirm) {
      return true;
    }
    else return false;

  };

  handleSubmit(e){
    e.preventDefault();
    let formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      confirm: e.target[3].value,
      phone: e.target[4].value,
      company: e.target[5].value,
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

  componentDidUpdate(){

    let pwdMatch = this.confirmMatch();

    if(pwdMatch && this.state.btnDisabled){
      this.setState({btnDisabled: false});
    } else if (!pwdMatch && !this.state.btnDisabled){
      this.setState({btnDisabled: true});
    };

  };

  render(){

    console.log("state.......", this.state);

    return(
      <div className="container">
      <Form horizontal onSubmit={this.handleSubmit}>
        <h1>{this.state.error}</h1>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Name
            </Col>
            <Col sm={5}>
                <FormControl id="name" type="text" name="fullName" required="true" placeholder="Full Name" />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
            <Col sm={5}>
                <FormControl id="email" type="email" name="email" required="true" placeholder="Email" />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
            <Col sm={5}>
                <FormControl type="password" id="password" name="password" required="true" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Password" onChange={this.handleChange}/>
                <FormControl.Feedback />
                <HelpBlock>Use at least one number and one uppercase and lowercase letter, and at least 8 or more characters</HelpBlock>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Confirm Password
            </Col>
            <Col sm={5}>
                <FormControl type="password" id="confirm" name="confirm" required="true" placeholder="Confirm Password" onChange={this.handleChange}/>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Phone
            </Col>
            <Col sm={5}>
                <FormControl type="text" id="phone" name="phone" placeholder="Phone" />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Company Name
            </Col>
            <Col sm={5}>
                <FormControl type="text" id="company" name="company" placeholder="Company Name" />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col sm={5} className="text-center">
                <Button bsStyle="success" type="submit" block disabled={this.state.btnDisabled}>
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
