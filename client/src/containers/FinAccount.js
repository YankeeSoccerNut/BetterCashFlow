import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initFinAccount from '../actions/initFinAccount';

import {accountNameTypes} from '../util/data.mock';
import axios from 'axios';
import findIndex from 'lodash.findindex';
import Parser from 'html-react-parser';

class FinAccount extends Component {

// Intending accountObjects to be an array of objects -- 1 enter per financial institution (finInstitution)
// each finInstitution will have an array of accounts at that finInstitution
  constructor(props) {
     super(props);
     // this.state = {
     //   accountObjects: []
     // };
  }

  componentDidMount(props){
    // console.log("+++++++++++++FinAccount.componentDidMount");
    let accountObject = {
      finInstitution: '',
      accounts: []
    }
    if (this.props.institution === "USBANK"){
      this.getUSBankUserInfo().then((USBankUserInfo) => {
        accountObject.finInstitution = 'USBANK';
        accountObject.accounts = USBankUserInfo.AccessibleAccountDetailList.slice();
        this.props.initFinAccount(accountObject);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (this.props.institution === "VISAB2B"){
      this.getVisaVirtualAcctInfo().then((VisaB2BResponse) => {
        accountObject.finInstitution = 'VISAB2B';
        accountObject.accounts.push(VisaB2BResponse);
        this.props.initFinAccount(accountObject);
      })
      .catch((err) => {
        console.log(err);
      });
    };
  };

  getUSBankUserInfo(){
    // console.log("in getUSBankUserInfo");

    let getUSBankUserInfoPromise =
    new Promise(function(resolve, reject) {
      axios({
        method: "GET",
        url: "http://localhost:3001/api/getUSBankUserInfo",
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
    // console.log("in getUSBankUserInfo");

    let getVisaVirtualAcctInfoPromise =
    new Promise(function(resolve, reject) {
      axios({
        method: "GET",
        url: "http://localhost:3001/api/reqVisaB2BAccount",
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
    // console.log("RENDERING>>>>>>FinAccount props:")
    // console.log(this.props);

    // Initial render won't have anything....
    if (this.props.accountObjects === null){
      return null;
    };

    // use lodash function to find index of each financial instititution....
    let USBANKindex = findIndex(this.props.accountObjects, { finInstitution: 'USBANK' });
    // console.log("USBANKindex: ", USBANKindex);

    let visaB2Bindex = findIndex(this.props.accountObjects, { finInstitution: 'VISAB2B' });
    // console.log("visaB2Bindex: ", visaB2Bindex);

    if (USBANKindex >=0 && this.props.institution === 'USBANK'){

      let USBankHTML = this.formatUSBankDisplay(this.props.accountObjects[USBANKindex]);

      return(
        <div id="usbank-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.institution}</div>
          <div className="panel-body">{Parser(USBankHTML)}</div>
        </div>
      );
    } else if (visaB2Bindex >=0 && this.props.institution === 'VISAB2B') {

      let VisaB2BHTML = this.formatVisaB2BDisplay(this.props.accountObjects[visaB2Bindex]);

      return(
        <div id="visab2b-summary" className="panel panel-info col-sm-6">
          <div className="panel-heading">{this.props.institution}</div>
          <div className="panel-content">{Parser(VisaB2BHTML)}</div>
        </div>
      );
    } else {
      // console.log("returning NULLLLLLLL from Render FinAccount-------");
      // console.log(this.props);
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
