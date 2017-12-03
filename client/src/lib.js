import {connect} from 'react-redux';
import {accountNameTypes, typeTypes} from './data.mock.js';
import {TimeSeries} from "pondjs";
import _ from "lodash";

const generateReducer = (handlers, initState) => (state = initState, action)  => {
    if (!action.hasOwnProperty('type')) {
        console.log('no type in action');
        console.log(action);
        return state;
    }
    return action.type in handlers ? handlers[action.type](state, action) : state;
};
const newState = (state, change) =>  Object.assign({}, state, change);

function applyName(name, input) {
    const tmp = {};
    const keys = Object.keys(input);
    for (var j=0; j < keys.length; j++) {
        tmp[keys[j]] = input[keys[j]]+'.'+name;
    }
    return tmp;
}

const mapStateToProps = (name) => state => (newState(state[name]));

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function getDates(startDate, days) {
    var stopDate = new Date();
    stopDate.setDate(startDate.getDate() + days);
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function formatDate(date) {
    return date.getYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function getBalanceSeriesStruct(transactions, balance, currentDate) {
    balance = balance.slice();
    const points = [];
    var i = 0;
    var min = 0;
    var max = 0;
    _.forEach(getDates(currentDate, 90), function(date) {
	while(i < transactions.length && date > new Date(transactions[i].scheduledDate)) {
	    i = i + 1;
	}
	if (i < transactions.length) {
	    const tran = transactions[i];
	    if (date == new Date(tran.scheduledDate)) {
		var balanceIndex = 0;
		if (tran.accountName == accountNameTypes[1]) {
		    balanceIndex = 1;
		}
		if (tran.type == 'Expense') {
		    balance[balanceIndex] = balance[balanceIndex] - tran.amount;
		} else {
		    balance[balanceIndex] = balance[balanceIndex] + tran.amount;		
		}	    
	    }

	}
	const total = balance[0] + balance[1];
	if (total > max) {
	    max = total;
	}
	if (total < min) {
	    min = total;
	}
	points.push([formatDate(date), balance[0], balance[1]]);
    });
    return {
	series: new TimeSeries({
	    name: '90 Day Balance',
	    utc: false,
	    columns: ["index", accountNameTypes[0], accountNameTypes[1]],
	    points: points
	}),
	max: max,
	min: min
    };
}

export {generateReducer, newState, applyName, getDates, getBalanceSeriesStruct};

