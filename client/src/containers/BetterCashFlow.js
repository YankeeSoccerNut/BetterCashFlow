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
          {/* <DataChartView seriesStruct={seriesStruct} /> */}
        </div>
        <div>
          <DataTableView dataTable={this.props.dataTable}/>
        </div>
      </div>
    );
  };
};

export default BetterCashFlow;
