import React, {Component} from 'react';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';
import FinAccount from './FinAccount';
import Analyzer from './Analyzer';
import axios from 'axios';


class BetterCashFlow extends Component{

  constructor(){
    super();
    this.testButton = this.testButton.bind(this);
  }

  testButton(){
    console.log("Test button pressed!")
    axios(`${window.apiHost}/api/protected`, {
      method: 'get',
      credentials: true
    }).then((response)=>{
      console.log(response.data);
    });
  };

  render(){
    return(
      <div className="container">
        <div className="col-sm-12">
          <Analyzer />
        </div>
        <div className="col-sm-12">
          <FinAccount institution="USBANK" />
          <FinAccount institution="VISAB2B" />
        </div>
        <div>
          <DataChartView />
        </div>
        <div>
          <button onClick={this.testButton} className="btn btn-success">TEST</button>
        </div>
        <div>
          <DataTableView />
        </div>
      </div>
    );
  };
};

export default BetterCashFlow;
