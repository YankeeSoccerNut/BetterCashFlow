import {accountNameTypes } from './data.mock.js';
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function dateToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

function getDates(startDate, days) {
    var stopDate = dateToday();
    stopDate.setDate(startDate.getDate() + days);
    var dateArray = new Array();
    var currentDate = startDate;
    currentDate.setHours(0, 0, 0, 0);
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth()+1;

    if (day < 10) {
      day = '0' + day;
    };

    if (month < 10) {
      month = '0' + month;
    };

    return date.getFullYear() + '-' + month + '-' + day;
}

function createDate(dateString) {
    var d = new Date(dateString+'T00:00:00-0500');
    d.setHours(0, 0, 0, 0);
    return d;
}

function getBalanceSeriesStruct(transactions, balance, currentDate) {
    balance = balance.slice();
    const points = [];
    var i = 0;
    var min = 0;
    var max = 0;
    _.forEach(getDates(currentDate, 90), function(date) {
	date.setHours(0, 0, 0, 0);
	while(i < transactions.length - 1) {
	    const targetDate = createDate(transactions[i].scheduledDate);
	    targetDate.setHours(0, 0, 0, 0);
	    if(date - targetDate > 0) {
		i = i + 1;
	    } else {
		break;
	    }
	}
	if (i < transactions.length) {
	    const tran = transactions[i];
	    const targetDate = createDate(tran.scheduledDate);
	    targetDate.setHours(0, 0, 0, 0);
	    if (date - targetDate === 0) {
		var balanceIndex = 0;
		if (tran.accountName === accountNameTypes[1]) {
		    balanceIndex = 1;
		}
		if (tran.type === 'Expense') {
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

export {generateReducer, newState, applyName, getBalanceSeriesStruct, formatDate, createDate, dateToday};
