import React, { Component } from 'react';

import {Icon, withBaseIcon} from 'react-icons-kit';
import { coinDollar, creditCard } from 'react-icons-kit/icomoon';

const IconCrimson = withBaseIcon({style: {color: '#db1b32'}});

const IconSeaGreen = withBaseIcon({style: {color: '#489c48'}});

const IconRed = withBaseIcon({style: {color: 'red'}});

const IconBlue = withBaseIcon({style: {color: 'blue'}});

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
        <IconBlue id="coin-dollar" size={20} icon={coinDollar} />
        <span>{this.props.endCash}</span>
        <IconRed id="credit-card" size={20} icon={creditCard} />
        <span>  {this.props.endCredit}</span>
      </span>
    );
  };
};

export default FinSummary;
