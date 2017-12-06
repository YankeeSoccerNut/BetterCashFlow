import React, {Component} from 'react';
import DataTableView from './DataTableView';
import DataChartView from './DataChartView';
import FinAccount from './FinAccount';

//mock transactions for now...
import {addTransactions, getTransactions} from '../util/data.mock.js';
const TRANSACTIONS = getTransactions();

class BetterCashFlow extends Component{

  constructor(){
    super();
  };

  onCellEdit(){
    console.log("onCellEdit");
    return;
  }

  onAddRow(){
    console.log("onAddRow");
    return;
  }

  onDeleteRow(){
    console.log("onDeleteRow");
    return;
  }

  render(){
    return(
      <div>
        <div>
          <FinAccount institution="USBANK" />
          {/* <DataChartView seriesStruct={seriesStruct} /> */}
        </div>
        <div>
          <DataTableView transactions={TRANSACTIONS} onCellEdit={this.onCellEdit} onDeleteRow={this.onDeleteRow} onAddRow={this.onAddRow} />
        </div>
      </div>
    );
  };
};

export default BetterCashFlow;
