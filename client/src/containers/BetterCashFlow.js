import React, {Component} from 'react';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';
import FinAccount from './FinAccount';
import Analyzer from './Analyzer';
import BCFnavBar from './BCFnavBar';
import ImportCSV from './ImportCSV';
import SaveUserPlan from './SaveUserPlan';

import {connect} from 'react-redux';

class BetterCashFlow extends Component{

  constructor(props) {
    super(props);
  };

  render(){

    if (!this.props.auth.userLoggedIn){
      console.log("no auth no render in BetterCashFlow");
      this.props.history.push('/home');
      return(null);
    };

    return(
    <div>
      <div className="container">
        <div className="col-sm-12">
          <Analyzer />
        </div>
        <div className="col-sm-12">
          <FinAccount category="CASH" />
          <FinAccount category="CREDIT" />
        </div>
        <div>
          <DataChartView />
        </div>
        <div className="row">
          <ImportCSV />
          <SaveUserPlan />
        </div>
        <div>
          <DataTableView />
        </div>
      </div>
    </div>
    );
  };
};

function mapStateToProps(state){
  return{
    auth: state.auth
  };
};

export default connect(mapStateToProps)(BetterCashFlow);
