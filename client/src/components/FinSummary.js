import React, { Component } from 'react';

import Icon from 'react-icons-kit';
import { coinDollar, creditCard } from 'react-icons-kit/icomoon';

class FinSummary extends Component{

  constructor(props){
    super(props);
  }
  render(){

    if (this.props === null){
      return(null);
    };

    console.log("rendering FinSummary component");
    console.log(this.props)

    return (
      <span>
        <Icon id="coin-dollar" size={20} icon={coinDollar} />
        <span>{this.props.endCash}</span>
        <Icon id="credit-card" size={20} icon={creditCard} />
        <span>  {this.props.endCredit}</span>
      </span>
    );
  };
};

export default FinSummary;
