import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import linkFinAccounts from '../actions/linkFinAccounts';


import findIndex from 'lodash.findindex';
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon';


class LinkFinAccounts extends Component {

  constructor(props) {
     super(props);
  }

  componentWillMount(){
    console.log("componentWillMount linkFinAccounts auth: ", this.props.auth);

    // load up the user's financial accounts if there is a token which indicates that use has logged in....
    if (this.props.auth.token !== ''){
      this.props.linkFinAccounts(this.props.auth.token);
    };

  };



  render() {
    console.log("RENDERING>>>>>>linkFinAccounts props:")
    console.log(this.props);

    // Don't render if no token....
    if (this.props.auth.token === null){
      return null;
    };

    let authMsg = 'Not Authorized';
    if(this.props.auth.userLoggedIn){
      authMsg = 'Authorized'
    };

    return(
      <div>
        <h1>Link User Accounts</h1>
        <p>{authMsg}</p>
      </div>
    );
  };

};

function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this component it is the bank account info
  // console.log("mapStateToProps....FinAccount")
  // console.log(state);
  return{
    auth: state.auth
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    linkFinAccounts: linkFinAccounts
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(LinkFinAccounts);
