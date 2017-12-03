import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {typeTypes, accountNameTypes, payeeTypes} from './data.mock';

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
    }

    remote(remoteObj) {
	// Only cell editing, insert and delete row will be handled by remote store
	remoteObj.cellEdit = true;
	remoteObj.insertRow = true;
	remoteObj.dropRow = true;
	return remoteObj;
    }
    
    render() {
	return (
		<BootstrapTable data={this.props.transactions}
	    selectRow={ selectRow }
            remote={ this.remote }
            insertRow deleteRow search pagination
            cellEdit={ cellEditProp }
	    options={ {
                onCellEdit: this.props.onCellEdit,
                onDeleteRow: this.props.onDeleteRow,
                onAddRow: this.props.onAddRow
            }}>
		<TableHeaderColumn dataField='id' hidden={true} isKey={true}>Transaction ID</TableHeaderColumn>
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
