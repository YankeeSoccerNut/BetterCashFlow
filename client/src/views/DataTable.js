import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const transactions = [];

const typeTypes = ['Expense', 'Income'];
const accountNameTypes = ['VISAB2B', 'USBANK'];
function addTransactions(quantity) {
  const startId = transactions.length;
  for (let i = 1; i < quantity; i++) {
    const id = startId + i;
    var type = typeTypes[0];
    if (id % 2) {
      type = typeTypes[1];
    }
    var accountName = accountNameTypes[0];
    if (id % 3) {
      accountName = accountNameTypes[1]
    }
    var day = Math.floor(i) % 30;
    if (day < 10) {
      day = '0' + day;
    }
    const date = '2017-12-' + day;

    // const date = '12/' + Math.floor(i) + '/2017';
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

addTransactions(30);

const options = {};

const cellEditProp = {
  mode: 'click',
  blurToSave: true

};
// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }
  formatType(cell) {
    return `TYPE_${cell}`;
  }

  render() {
    return (<BootstrapTable data={transactions} deleteRow={true} selectRow={selectRowProp} cellEdit={cellEditProp} insertRow={true} options={options}>
      <TableHeaderColumn dataField='id' hidden={true} isKey={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='type' editable={{
          type: 'select',
          options: {
            values: typeTypes
          }
        }}>Type</TableHeaderColumn>
      <TableHeaderColumn dataField='accountName' editable={{
          type: 'select',
          options: {
            values: accountNameTypes
          }
        }}>Account Name</TableHeaderColumn>
      <TableHeaderColumn dataField='scheduledDate' editable={{
          type: 'date'
        }}>Scheduled Date</TableHeaderColumn>
      <TableHeaderColumn dataField='dueDate' editable={{
          type: 'date'
        }}>Due Date</TableHeaderColumn>
      <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
    </BootstrapTable>);
  }
}

export default DataTable;
