import React, {Component} from 'react';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';
import FinAccount from './FinAccount';
import Analyzer from './Analyzer';
import BCFnavBar from './BCFnavBar';
import BCFsideNav from './BCFsideNav';

class BetterCashFlow extends Component{

  render(){
    return(
    <div>
      <BCFnavBar />
      {/* <BCFsideNav /> */}
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
          <DataTableView />
        </div>
      </div>
    </div>
    );
  };
};

export default BetterCashFlow;
