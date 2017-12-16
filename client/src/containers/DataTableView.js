import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


// mock data
import {getTransactions, payeeTypes, getBalances, accountNameTypes, typeTypes} from '../util/data.mock.js';

import onCellEdit from '../actions/onCellEdit';
import onAddRow from '../actions/onAddRow';
import onDeleteRow from '../actions/onDeleteRow';
import loadTransactions from '../actions/loadTransactions';



class DataTableView extends Component {

  constructor(props) {
    super(props);
    // this.onCellEdit = this.onCellEdit.bind(this);
    // this.beforeSaveCell = this.beforeSaveCell.bind(this);
    this.afterSaveCell = this.afterSaveCell.bind(this);
    this.onModalAddRow = this.onModalAddRow.bind(this);
    // this.onDeleteRow = this.onDeleteRow.bind(this);
  }

  componentDidMount(){
    const transactions = getTransactions();

    this.props.loadTransactions(transactions);
  };

  // beforeSaveCell(row, cellName, cellValue){
  //   console.log("beforeSaveCell.........");
  //   console.log(row, cellName, cellValue);
  //   // this.props.onCellEdit({
  //   //   row: row,
  //   //   cellName: cellName,
  //   //   cellValue: cellValue
  //   // });
  //
  //   return(true);
  // };

  // onCellEdit(e){    // e is shorthand for event
  //   console.log("onCellEdit");
  //   console.log(e);
  //   this.props.onCellEdit(e);
  //   return;
  // }

  afterSaveCell(row, cellName, cellValue){
    // console.log("afterSaveCell.........");
    // console.log(row, cellName, cellValue);
    this.props.onCellEdit({
      row: row,
      cellName: cellName,
      cellValue: cellValue
    });

    return(true);
  };


  onModalAddRow(e){
    // This function gets invoked after the user adds a row via the default Add Modal.  There were issues with trying to invoke our action directly from the modal callback so invoke our action here....
    this.props.onAddRow(e);
    return;
  }

  //
  // onDeleteRow(e){
  //   console.log("onDeleteRow");
  //   console.log(e);
  //   this.props.onDeleteRow(e);
  //   return;
  // }

  remote(remoteObj) {
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return(remoteObj);
  };

  render() {

    const cellEditProp = {
        mode: 'dbclick'
    };

    const selectRow = {
        mode: 'checkbox',
        bgColor: 'pink',
        clickToSelect: true
    };

    const options={
              clearSearch: true,
              onCellEdit: this.afterSaveCell,
              onDeleteRow: this.props.onDeleteRow,
              onAddRow: this.onModalAddRow,
              exportCSVText: 'my_export',
              insertText: 'my_insert',
              deleteText: 'my_delete',
              saveText: 'my_save',
              closeText: 'my_close'
          };

    // Initial render won't have anything....
    if (this.props.dataTable === null){
      return null;
    };

    return(
      <div id="payables-table" className="col-sm-12">
        <BootstrapTable data={this.props.transactions} search={ true } options={ options }
          selectRow={ selectRow }
                remote={ this.remote }
                insertRow={ true } deleteRow={ true }
                cellEdit={ cellEditProp }>
        <TableHeaderColumn dataField='id' hidden={false} isKey={true} autoValue={true}>Transaction ID</TableHeaderColumn>
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
        <TableHeaderColumn dataField='amount' editable={{
            type: 'number'
        }}>Amount</TableHeaderColumn>

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
  return{
    transactions: state.transactions
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loadTransactions: loadTransactions,
    onCellEdit: onCellEdit,
    onAddRow: onAddRow,
    onDeleteRow: onDeleteRow
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(DataTableView);
