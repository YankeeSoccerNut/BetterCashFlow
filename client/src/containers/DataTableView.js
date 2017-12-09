import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// mock data
import {getTransactions, payeeTypes, getBalances, accountNameTypes, typeTypes} from '../util/data.mock.js';

import dataCellEdit from '../actions/dataCellEdit';
import dataRowAdd from '../actions/dataCellEdit';
import dataRowDelete from '../actions/dataRowDelete';
import loadTransactions from '../actions/loadTransactions';

const cellEditProp = {
    mode: 'click'
};
const selectRow = {
    mode: 'checkbox',
    cliclToSelct: true
};


class DataTableView extends Component {

  constructor(props) {
    super(props);
    this.onCellEdit = this.onCellEdit.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.state = {transactions: []};
  }

  componentDidMount(){
    console.log("++++++++++ DataTableView.componentDidMount ++++++++++")
    const transactions = getTransactions();

    this.props.loadTransactions(transactions);
  };

  onCellEdit(e){    // e is shorthand for event
    console.log("onCellEdit");
    console.log(e);
    this.props.dataCellEdit(e);
    return;
  }

  onAddRow(e){
    console.log("onAddRow");
    console.log(e);
    this.props.dataRowAdd(e);
    return;
  }

  onDeleteRow(e){
    console.log("onDeleteRow");
    console.log(e);
    this.props.dataRowDelete(e);
    return;
  }

  render() {

    // Initial render won't have anything....
    if (this.props.dataTable === null){
      return null;
    };
    console.log("DataTableView....this.props NOT NULL in render()");

    console.log(this.props.dataTable);
    console.log(this.props.dataTable.transactions);

    return(
      <div id="payables-table" className="col-sm-12">
        <BootstrapTable data={this.props.dataTable.transactions}
          selectRow={ selectRow }
                remote={ true }
                insertRow={true} deleteRow search
                cellEdit={ cellEditProp }
          options={ {
                    onCellEdit: this.onCellEdit,
                    onDeleteRow: this.onDeleteRow,
                    onAddRow: this.onAddRow
                }}>
        <TableHeaderColumn dataField='id' hidden={true} isKey={true} autoValue={true}>Transaction ID</TableHeaderColumn>
        <TableHeaderColumn dataField='type' hidden={false} editable={{
            type: 'select',
            options: {
          values: typeTypes
            }
        }}>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='dueDate' editable={{
          type: 'date'}}>Due Date</TableHeaderColumn>
        <TableHeaderColumn dataField='accountName' editable={{
            type: 'select',
            options: {
          values: accountNameTypes
            }
        }}>Source</TableHeaderColumn>
        <TableHeaderColumn dataField='payee' editable={{
            type: 'select',
            options: {
          values: payeeTypes
            }
        }}>Payee</TableHeaderColumn>
        <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>

        <TableHeaderColumn dataField='scheduledDate' editable={{
            type: 'date'
        }}>Scheduled Date</TableHeaderColumn>
        </BootstrapTable>
      </div>);
    }
};

function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this scenario it is the whole dataTable
  console.log("mapStateToProps....")
  console.log(state);
  return{
    dataTable: state.dataTable
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loadTransactions: loadTransactions,
    dataCellEdit: dataCellEdit,
    dataRowAdd: dataRowAdd,
    dataRowDelete: dataRowDelete
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(DataTableView);
