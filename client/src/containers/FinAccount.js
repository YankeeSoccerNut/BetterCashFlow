import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import initFinAccount from '../actions/initFinAccount';

import loadUserFinAccounts from '../actions/loadUserFinAccounts';

import {accountNameTypes} from '../util/data.mock';

import findIndex from 'lodash.findindex';
import Parser from 'html-react-parser';
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon';


class FinAccount extends Component {

  constructor(props) {
     super(props);
  }

  componentWillMount(){
    console.log("componentWillMount FinAccount auth: ", this.props.auth);

    // load up the user's financial accounts if there is a token which indicates that use has logged in....
    if (this.props.auth.token !== ''){
      this.props.loadUserFinAccounts(this.props.auth.token);
    };

  };

  formatDemoCash(accountObject){

    let a = accountObject.accounts[0]; //shorthand

    let demoCashHTML = `<div><div className='col-sm-6'>Current Balance: <span className='curr-cash-bal'>$${a.beginning.toFixed(2)}</span></div><div className='col-sm-6'>Available Balance: <span className='avail-cash-bal'>$${a.available.toFixed(2)}</span></div><div><Icon size={16} icon={info}></Icon></div></div>`;

    return(
      demoCashHTML
    );
  };

  formatDemoCredit(accountObject){

    let a = accountObject.accounts[0]; //shorthand

    let demoCreditHTML = `<div><div className='col-sm-6'>Total Credit Line(s): <span className='curr-cash-bal'>$${a.total.toFixed(2)}</span></div><div className='col-sm-6'>Available Balance: <span className='avail-cash-bal'>$${a.available.toFixed(2)}</span></div><div><Icon size={16} icon={info}/></div></div>`;

    return(
      demoCreditHTML
    );
  };


  render() {
    console.log("RENDERING>>>>>>FinAccount props:")
    console.log(this.props);

    // Initial render won't have anything....
    if (this.props.accountObjects === null || this.props.accountObjects.length === 0){
      return null;
    };

    if (this.props.category === "CASH") {
      let cashIndex = findIndex(this.props.accountObjects, { type: 'CASH' });

      console.log("cash index: ", cashIndex);
      console.log("accountObject[] ", this.props.accountObjects[cashIndex]);

      let demoCashHTML = this.formatDemoCash(this.props.accountObjects[cashIndex]);

      return(
        <div id="cash-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.category}</div>
          <div className="panel-content">{Parser(demoCashHTML)}</div>
        </div>
      );
    } else if (this.props.category === "CREDIT") {

      let creditIndex = findIndex(this.props.accountObjects, { type: 'CREDIT' });

      console.log("credit index: ", creditIndex);
      console.log("accountObject[] ", this.props.accountObjects[creditIndex]);

      let demoCreditHTML = this.formatDemoCredit(this.props.accountObjects[creditIndex]);

      return(
        <div id="credit-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.category}</div>
          <div className="panel-content">{Parser(demoCreditHTML)}</div>
        </div>
      );
    } else {  // no valid props
      return null;
    }
  };
};

function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this component it is the bank account info
  // console.log("mapStateToProps....FinAccount")
  // console.log(state);
  return{
    accountObjects: state.accountObjects,
    auth: state.auth
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    initFinAccount: initFinAccount,
    loadUserFinAccounts: loadUserFinAccounts
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(FinAccount);
