import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...
import {BootstrapTable, TableHeaderColumn, ButtonGroup, Button } from 'react-bootstrap-table';

import moment from 'moment';

// mock data
import {payeeTypes, accountNameTypes, typeTypes} from '../util/data.mock.js';

import onCellEdit from '../actions/onCellEdit';
import onAddRow from '../actions/onAddRow';
import onDeleteRow from '../actions/onDeleteRow';
import newDataTable from '../actions/newDataTable';
import saveUserPlan from '../actions/saveUserPlan';



class DataTableView extends Component {

  constructor(props) {
    super(props);
    this.beforeSaveCell = this.beforeSaveCell.bind(this);
    this.onModalAddRow = this.onModalAddRow.bind(this);
    this.clickSaveUserPlan = this.clickSaveUserPlan.bind(this);
  }

  componentWillReceiveProps(nextProps){

    nextProps.newDataTable(nextProps.transactions);

    // kluge to fix bug? in react-bootstrap-table
    // deleting rows doesn't seem to deselect them
    if(nextProps.transactions.length === 0){
      this.refs.table.setState({
        selectedRowKeys: []
      });
    };

  };

  clickSaveUserPlan(e){
    console.log("event ", e);
    console.log("user clicked save");
    // this.props.saveUserPlan(this.props);
  }

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

  createCustomButtonGroup(props){
    console.log("createCustomButtonGroup props: ", props);

    console.log ("Button ", Button);

    return (
      <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
        { props.showSelectedOnlyBtn }
        { props.exportCSVBtn }
        { props.insertBtn }
        { props.deleteBtn }
        <button type='button' id="btnsave" onClick={ saveUserPlan }
          className={ "btn btn-primary" }><span><i className="fa glyphicon glyphicon-floppy-disk fa-floppy-disk"></i></span>
          Save Plan
        </button>
      </ButtonGroup>
    );
  };


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
              // btnGroup: this.createCustomButtonGroup,
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
    };

    return(
      <div id="payables-table" className="col-sm-12">
        <BootstrapTable ref='table' data={this.props.transactions} search={ true } options={ options } exportCSV={true}  keyBoardNav={keyBoardNav}
          selectRow={ selectRow }
                remote={ this.remote }
                insertRow={ true } deleteRow={ true }
                cellEdit={ cellEditProp }>
        <TableHeaderColumn dataField='id' hidden={true} isKey={true} autoValue={true}>ID</TableHeaderColumn>
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

        <TableHeaderColumn dataField='scheduledDate' dataFormat={schedDateFormatter} editable={{
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
    onCellEdit: onCellEdit,
    onAddRow: onAddRow,
    onDeleteRow: onDeleteRow,
    newDataTable: newDataTable,
    saveUserPlan: saveUserPlan
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

function schedDateFormatter(cell, row) {

  let gregToday = moment().format("YYYY-MM-DD");

  if(cell < gregToday){
    return (
      <span className='bcf-date-error'>{cell}</span>
    );
  } else {
    return (
      <span>{cell}</span>
    );
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(DataTableView);
