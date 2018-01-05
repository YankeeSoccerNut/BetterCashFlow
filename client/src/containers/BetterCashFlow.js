import React, {Component} from 'react';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';
import FinAccount from './FinAccount';
import Analyzer from './Analyzer';
import BCFnavBar from './BCFnavBar';
import ImportCSV from './ImportCSV';
import {connect} from 'react-redux';

class BetterCashFlow extends Component{

  constructor(props) {
    super(props);
  };

  render(){

    // how come this doesn't work?
    // if ((typeof(this.props.auth.token) === undefined)){

    if (this.props.auth.token === undefined){
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
          <FinAccount institution="DEMO-CASH" />
          <FinAccount institution="DEMO-CREDIT" />
        </div>
        <div>
          <DataChartView />
        </div>
        <ImportCSV />
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
