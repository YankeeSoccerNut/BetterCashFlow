import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


// mock data
import {loadDemoTxns, payeeTypes, accountNameTypes, typeTypes} from '../util/data.mock.js';

import onCellEdit from '../actions/onCellEdit';
import onAddRow from '../actions/onAddRow';
import onDeleteRow from '../actions/onDeleteRow';
import loadTransactions from '../actions/loadTransactions';
import newDataTable from '../actions/newDataTable';


class DataTableView extends Component {

  constructor(props) {
    super(props);
    this.beforeSaveCell = this.beforeSaveCell.bind(this);
    this.onModalAddRow = this.onModalAddRow.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("DataTableView nextProps\n", nextProps);

    nextProps.newDataTable(nextProps.transactions);

    // kluge to fix bug? in react-bootstrap-table
    // deleting rows doesn't seem to deselect them
    if(nextProps.transactions.length === 0){
      this.refs.table.setState({
        selectedRowKeys: []
      });
    };

  };


  componentDidMount(){

    if (this.props == null) {
      return null;
    };

    console.log("loadDemoTxns: ################");
    let demoTxns = loadDemoTxns();
    console.log(demoTxns);

    // const transactions = getTransactions();

    // this.props.loadTransactions(demoTxns);
  };

  beforeSaveCell(row, cellName, cellValue){
    // react-bootstrap-table provides an opportunity to edit a change before the cell is saved to the table....
    // use it here to prevent negative values in the amount field

    if (cellName === 'amount' && (Number(cellValue) < 0)){
      console.log("User tried to enter negative amount...");
      return(false);  // reject the change
    };

    this.props.onCellEdit({
      row: row,
      cellName: cellName,
      cellValue: cellValue
    });

    return(true);  // accept the change
  };


  onModalAddRow(e){
    // This function gets invoked after the user adds a row via the default Add Modal.  There were issues with trying to invoke our action directly from the modal callback so invoke our action here....
    this.props.onAddRow(e);
    return;
  }


  remote(remoteObj) {
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return(remoteObj);
  };

  render() {

    const cellEditProp = {
        mode: 'click'
    };

    const selectRow = {
        mode: 'checkbox',
        bgColor: function(row, isSelect) {
          return 'pink'
           // if (isSelect) {
           //   const { id } = row;
           //   if (id < 2) return 'blue';
           //   else if (id < 4) return 'red';
           //   else return 'yellow';
           // }
           // return null;
        },
        clickToSelect: true
    };

    const options={
              clearSearch: true,
              onCellEdit: this.beforeSaveCell,
              onDeleteRow: this.props.onDeleteRow,
              onAddRow: this.onModalAddRow,
              exportCSVText: 'Export',
              insertText: 'Insert Row',
              deleteText: 'Delete Selected',
              saveText: 'my_save',
              closeText: 'my_close'
          };

    const keyBoardNav = {
      enterToEdit: true
    };

    // Initial render won't have anything....
    if (this.props.dataTable === null){
      this.props.dataTable = [];
      // console.log("this.props.dataTable === null NO RENDER in DataTableView");
      // return null;
    };

    return(
      <div id="payables-table" className="col-sm-12">
        <BootstrapTable ref='table' data={this.props.transactions} search={ true } options={ options } exportCSV={true} keyBoardNav={keyBoardNav}
          selectRow={ selectRow }
                remote={ this.remote }
                insertRow={ true } deleteRow={ true }
                cellEdit={ cellEditProp }>
        <TableHeaderColumn dataField='id' hidden={false} isKey={true} autoValue={true}>ID</TableHeaderColumn>
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
        <TableHeaderColumn dataField='amount'
          tdStyle={{ textAlign: 'right' }}
          dataFormat={amountFormatter}
          editable={{
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
    onDeleteRow: onDeleteRow,
    newDataTable: newDataTable
  }, dispatch);
};


function amountFormatter(cell, row) {
  console.log ("\namountFormatter row: ", row);

  let amountColorClass = 'bcf-cash';

  if (row.accountName === 'CREDIT') {
    amountColorClass = 'bcf-credit';
  }
  return (
    <span className={amountColorClass}>{cell}</span>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(DataTableView);
