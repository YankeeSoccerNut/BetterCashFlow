import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const transactions = [];

const typeTypes = [ 'Expense', 'Income' ];
const accountNameTypes = ['VISAB2B', 'USBANK'];
function addTransactions(quantity) {
  const startId = transactions.length;
  for (let i = 1; i < quantity; i++) {
    const id = startId + i;
    var type = typeTypes[0];
    if(id % 2) {
      type = typeTypes[1];
    }
    var accountName = accountNameTypes[0];
    if (id % 3) {
      accountName = accountNameTypes[1]
    }
    const date = '2017' + '-12-' + Math.floor(i);
    transactions.push({
      id: id,
      type: type,
      accountName: accountName,
      scheduledDate: date,
      dueDate: date,
      amount: i * 100
    });
  }
}

addTransactions(50);

const options = {};

const cellEditProp = {
  mode: 'dbclick'
};
// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class DataTable extends Component {
  render() {
    return (<BootstrapTable data={transactions} deleteRow={true} selectRow={selectRowProp} cellEdit={cellEditProp} insertRow={true} options={options}>
      <TableHeaderColumn dataField='id' hidden={true} isKey={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
      <TableHeaderColumn dataField='accountName'>Account Name</TableHeaderColumn>
      <TableHeaderColumn dataField='scheduledDate'>Scheduled Date</TableHeaderColumn>
      <TableHeaderColumn dataField='dueDate'>Due Date</TableHeaderColumn>
      <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
    </BootstrapTable>);
  }
}

export default DataTable;
