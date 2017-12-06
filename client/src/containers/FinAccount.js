import React, {Component} from 'react';
import {accountNameTypes} from '../util/data.mock';
import axios from 'axios';

class FinAccount extends Component {
    constructor(props) {
	     super(props);
       this.state = {
         dataLoaded: false,
         accountInfo: []
       };
    }

    componentDidMount(props){
      if (this.props.institution === "USBANK"){
        this.getUSBankUserInfo();
      } else if (this.props.institution === "VISAB2B"){
        this.getVisaVirtualAcctInfo();
      };
    };

    getUSBankUserInfo(){
      console.log("in componentDidMount for USBank");

      axios.get("localhost:3001/getUSBankUserInfo")
      .then((USBankUserInfo)=>{
        console.log("axios.get");
        console.log(USBankUserInfo["AccessibleAccountDetailList"]);
        // Loop through the account list....
        // for (var account in body.AccessibleAccountDetailList)
        // this.setState({
        //   movie: movieData.data
        // })
      })
      .catch(function (error) {
          console.log(error);
      });
    };  // componentDidMount

    render() {
    	return (
        <div>
          <p>USBankUserInfoLoaded!</p>
        </div>
    	)
    }
}
export default FinAccount;
