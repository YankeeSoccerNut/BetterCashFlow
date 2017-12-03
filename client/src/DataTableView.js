import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {typeTypes, accountNameTypes, payeeTypes} from './data.mock';

var GLOBAL_DATA;
var GLOBAL_DATA_CALLBACK;

//TODO: add new payee

function onAfterInsertRow(row) {
    GLOBAL_DATA_CALLBACK(GLOBAL_DATA);
}
function onAfterDeleteRow(rowKeys) {
    GLOBAL_DATA_CALLBACK(GLOBAL_DATA);
}
function afterSaveCell(row, cellName, cellValue) {
    GLOBAL_DATA_CALLBACK(GLOBAL_DATA);
}

const options = {
    afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
    afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};

const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: afterSaveCell
};
// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
    mode: 'checkbox'
};

class DataTableView extends Component {
    constructor(props) {
	super(props);
	GLOBAL_DATA = props.transactions;
	GLOBAL_DATA_CALLBACK = props.onDataChanged;
    }

    render() {
	return (<BootstrapTable data={GLOBAL_DATA} deleteRow={true} selectRow={selectRowProp} cellEdit={cellEditProp} insertRow={true} options={options}>
		<TableHeaderColumn dataField='id' hidden={true} isKey={true}>Product ID</TableHeaderColumn>
		<TableHeaderColumn dataField='type' hidden={true} editable={{
		    type: 'select',
		    options: {
			values: typeTypes
		    }
		}}>Type</TableHeaderColumn>
		<TableHeaderColumn dataField='dueDate' editable={{
		    type: 'date'
		}}>Due Date</TableHeaderColumn>
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
		</BootstrapTable>);
    }
}

export default DataTableView;
