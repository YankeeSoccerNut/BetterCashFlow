import React, {Component} from 'react';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';
import FinAccount from './FinAccount';

class BetterCashFlow extends Component{

  render(){
    return(
      <div className="container">
        <div className="col-sm-12">
          <FinAccount institution="USBANK" />
          <FinAccount institution="VISAB2B" />
        </div>
        <div>
          <DataChartView />
        </div>
        <div>
          <DataTableView />
        </div>
      </div>
    );
  };
};

export default BetterCashFlow;
