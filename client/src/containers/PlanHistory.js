import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import moment from 'moment';

import getUserPlanHistory from '../actions/getUserPlanHistory';
import planSelected from '../actions/planSelected';
import deletePlanHistory from '../actions/deletePlanHistory';

class PlanHistory extends Component {

  constructor(props) {
     super(props);
     this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
  }

  onRowDoubleClick(row) {
    console.log("user doubleclicked row: ", row);

    this.props.planSelected(row.id);
    this.props.history.push("/better-cash-flow");
  };

  componentWillMount(){
    console.log("componentWillMount PlanHistory auth: ", this.props.auth);

    // Don't do anything if the user is not logged in...
    if (!this.props.auth.userLoggedIn){
      return(null);
    };

    //otherwise, we can get the user_plans (Plan History)...
    this.props.getUserPlanHistory();
  };


  componentWillReceiveProps(nextProps){

    console.log("PlanHistory componentWillReceiveProps", nextProps);

  };


  remote(remoteObj) {
    remoteObj.cellEdit = false;
    remoteObj.insertRow = false;
    remoteObj.dropRow = true;
    return(remoteObj);
  };

  render() {
    console.log("RENDERING>>>>>>Plan History this.props: ", this.props)

    // Don't render if no token....
    if (!this.props.auth.userLoggedIn){
      console.log("no render...not logged in")
      this.props.history.push("/");
      return null;
    };

    if (this.props.planHistory === null){
      return null;
    }

    const selectRow = {
      mode: 'checkbox',
      bgColor: function(row, isSelect) {
        return 'pink'
      },
      clickToSelect: false
    };

    const options={
      onRowDoubleClick: this.onRowDoubleClick,
      onDeleteRow: this.props.deletePlanHistory,
      clearSearch: true,
      deleteText: 'Delete Selected',
      saveText: 'my_save',
      closeText: 'my_close'
  };

    return(
      <div className="container">
        <div className="col-sm-12">
        <h1>Plan History</h1>
        <div id="plan-history-table" className="col-sm-12">
          <BootstrapTable data={this.props.planHistory.planHistory} search={ true } options={ options }
            selectRow={ selectRow }
                  remote={ this.remote }
                  insertRow={ false } deleteRow={ true }>
          <TableHeaderColumn dataField='id' hidden={true} isKey={true} autoValue={false}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='user_plan_name'>Plan Name</TableHeaderColumn>
          <TableHeaderColumn dataField='num_txns' >Txn Count</TableHeaderColumn>
          <TableHeaderColumn className='bcf-cash' dataField='cash_used' dataFormat={cashFormatter}>Cash Used</TableHeaderColumn>
          <TableHeaderColumn className = 'bcf-credit' dataField='credit_used' dataFormat={creditFormatter}>Credit Used</TableHeaderColumn>
          <TableHeaderColumn dataField='updated' className="text-right" dataFormat={dateFormatter}>Last Update</TableHeaderColumn>
          <TableHeaderColumn dataField='created' dataFormat={dateFormatter} hidden={true}>Created</TableHeaderColumn>
          </BootstrapTable>
        </div>
        </div>
      </div>
    );
  };

};

function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this component it is the bank account info
  // console.log("mapStateToProps....FinAccount")
  // console.log(state);
  return{
    auth: state.auth,
    planHistory: state.planHistory
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getUserPlanHistory: getUserPlanHistory,
    planSelected: planSelected,
    deletePlanHistory: deletePlanHistory
  }, dispatch);
};

function cashFormatter(cell) {

    return (
      <span className='bcf-cash'>{cell}</span>
    );
}

function creditFormatter(cell) {

    return (
      <span className='bcf-credit'>{cell}</span>
    );
}


function dateFormatter(cell) {

  if (cell === null){
    return (
      <span></span>
    )
  };

  let formattedDate = moment(cell).format("YYYY-MM-DD hh:mm:ss");

  return (
    <span>{formattedDate}</span>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(PlanHistory);
