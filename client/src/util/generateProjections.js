import { TimeSeries } from 'pondjs';
import {accountNameTypes, typeTypes} from './data.mock.js';
import _ from "lodash";

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function dateToday() {
  // simply get today's date....
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function getDates(startDate, days) {
  // build an array of x elements based on startDate and number of days.  Date will be the key value for the array.

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
    var day = date.getDate();
    if (day < 10) {
	day = '0' + day;
    }
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day;
}

function createDate(dateString) {
    var d = new Date(dateString+'T00:00:00-0500');
    d.setHours(0, 0, 0, 0);
    return d;
}

function getBalanceSeriesStruct(transactions, balance, currentDate, numDays) {
    balance = balance.slice();
    const points = [];
    var i = 0;
    var min = 0;
    var max = 0;
    _.forEach(getDates(currentDate, numDays), function(date) {
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
	    if (date - targetDate == 0) {
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

    console.log("data points: \n", points);
    return {
	dailyBalances: new TimeSeries({
	    name: 'Balances',
	    utc: false,
	    columns: ["index", accountNameTypes[0], accountNameTypes[1]],
	    points: points
	}),
	max: max,
	min: min
    };
}

export {getBalanceSeriesStruct, formatDate, createDate, getDates, dateToday };
