import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import logoutAction from '../actions/logoutAction';

class Logout extends Component {

componentDidMount(){
  this.props.logoutAction();
  this.props.history.push('/');
};

render(){
    return(
      <div>
        Logging out.....
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    logoutAction: logoutAction
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Logout);
