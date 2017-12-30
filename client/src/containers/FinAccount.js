import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initFinAccount from '../actions/initFinAccount';

import {accountNameTypes} from '../util/data.mock';
import axios from 'axios';
import findIndex from 'lodash.findindex';
import Parser from 'html-react-parser';
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon';


class FinAccount extends Component {

  constructor(props) {
     super(props);
  }

  componentDidMount(props){
    console.log("+++++++++++++FinAccount.componentDidMount");
    let accountObject = {
      finInstitution: '',
      accounts: []
    };

    if (this.props.institution === "USBANK"){
      this.getUSBankUserInfo().then((USBankUserInfo) => {
        accountObject.finInstitution = 'USBANK';
        accountObject.type = 'CASH';
        accountObject.accounts = USBankUserInfo.AccessibleAccountDetailList.slice();
        this.props.initFinAccount(accountObject);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (this.props.institution === "VISAB2B"){
      this.getVisaVirtualAcctInfo().then((VisaB2BResponse) => {
        accountObject.finInstitution = 'VISAB2B';
        accountObject.type = 'CREDIT';
        accountObject.accounts.push(VisaB2BResponse);
        this.props.initFinAccount(accountObject);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (this.props.institution === "DEMO-CASH"){
        accountObject.finInstitution = 'DEMO-CASH';
        accountObject.type = 'CASH';
        accountObject.accounts.push({beginning: 5000.10, available: 4000.10, scheduled: [{date: '2018-01-11', amount: 1000}]});
        this.props.initFinAccount(accountObject);
    } else if (this.props.institution === "DEMO-CREDIT"){
      accountObject.finInstitution = 'DEMO-CREDIT';
      accountObject.type = 'CREDIT';
      accountObject.accounts.push({total: 25000, used: 3500, available: 19500, scheduled: [{date: '2018-01-11', amount: 2000}]});
      this.props.initFinAccount(accountObject);
    };
  };

  getUSBankUserInfo(){
    console.log("in getUSBankUserInfo");

    let getUSBankUserInfoPromise =
    new Promise(function(resolve, reject) {
      axios({
        method: "GET",
        url: `${window.apiHost}/api/getUSBankUserInfo`,
        data:[]
      }).then((userInfo) => {
        resolve(userInfo.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
    return getUSBankUserInfoPromise;
  };

  getVisaVirtualAcctInfo(){
    console.log("in getVisaVirtualAcctInfo");

    let getVisaVirtualAcctInfoPromise =
    new Promise(function(resolve, reject) {
      axios({
        method: "GET",
        url: `${window.apiHost}/api/reqVisaB2BAccount`,
        data:[]
      }).then((VisaB2BResponse) => {
        resolve(VisaB2BResponse.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
    return getVisaVirtualAcctInfoPromise;
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


  formatUSBankDisplay(accountObject){

    let USBankHTML = '<ul>';
    accountObject.accounts.map((account) => {
      USBankHTML +=
        `<li>${account.BasicAccountDetail.Codes.CategoryDescription} ${account.BasicAccountDetail.Balances.AvailableBalanceAmount}
        </li>`;
    });

    USBankHTML += '</ul>';

    return(
      USBankHTML
    );
  };

  formatVisaB2BDisplay(accountObject){

    let VisaB2BHTML = '<ul>';
    accountObject.accounts.map((account) => {
      VisaB2BHTML +=
        `<li>Acct#: ${account.accountNumber} Exp: ${account.expiryDate}</li>`;
    });

    VisaB2BHTML += '</ul>';

    return(
      VisaB2BHTML
    );
  };


  render() {
    console.log("RENDERING>>>>>>FinAccount props:")
    console.log(this.props);

    // Initial render won't have anything....
    if (this.props.accountObjects === null){
      return null;
    };

    // use lodash function to find index of each financial instititution....
    // TODO: change from hard-coding to something more dynamic...OK now for demo
    let USBANKindex = findIndex(this.props.accountObjects, { finInstitution: 'USBANK' });
    // console.log("USBANKindex: ", USBANKindex);

    let visaB2Bindex = findIndex(this.props.accountObjects, { finInstitution: 'VISAB2B' });
    // console.log("visaB2Bindex: ", visaB2Bindex);

    let demoCashIndex = findIndex(this.props.accountObjects, { finInstitution: 'DEMO-CASH' });

    let demoCreditIndex = findIndex(this.props.accountObjects, { finInstitution: 'DEMO-CREDIT' });

    console.log("Demo indices.....", demoCashIndex, demoCreditIndex);

    if (USBANKindex >=0 && this.props.institution === 'USBANK'){

      let USBankHTML = this.formatUSBankDisplay(this.props.accountObjects[USBANKindex]);

      return(
        <div id="cash-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.institution}</div>
          <div className="panel-body">{Parser(USBankHTML)}</div>
        </div>
      );
    } else if (visaB2Bindex >=0 && this.props.institution === 'VISAB2B') {

      let VisaB2BHTML = this.formatVisaB2BDisplay(this.props.accountObjects[visaB2Bindex]);

      return(
        <div id="credit-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.institution}</div>
          <div className="panel-content">{Parser(VisaB2BHTML)}</div>
        </div>
      );
    } else if (demoCashIndex >=0 && this.props.institution === 'DEMO-CASH') {

      let demoCashHTML = this.formatDemoCash(this.props.accountObjects[demoCashIndex]);

      return(
        <div id="cash-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.institution}</div>
          <div className="panel-content">{Parser(demoCashHTML)}</div>
        </div>
      );
    } else if (demoCreditIndex >=0 && this.props.institution === 'DEMO-CREDIT') {
      let demoCreditHTML = this.formatDemoCredit(this.props.accountObjects[demoCreditIndex]);

      return(
        <div id="credit-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.institution}</div>
          <div className="panel-content">{Parser(demoCreditHTML)}</div>
        </div>
      );
    } else {  // no valid props
      return null;
    };
  };
};

function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this component it is the bank account info
  // console.log("mapStateToProps....FinAccount")
  // console.log(state);
  return{
    accountObjects: state.accountObjects
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    initFinAccount: initFinAccount
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(FinAccount);
