import { TimeSeries } from 'pondjs';
import {accountNameTypes } from './data.mock.js';
import _ from "lodash";

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
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

  let stopDate = dateToday();
  stopDate.setDate(startDate.getDate() + days);
  let dateArray = new Array();
  let currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

function formatDate(date) {
    let day = date.getDate();
    if (day < 10) {
  day = '0' + day;
    }
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day;
}

function createDate(dateString) {
    let d = new Date(dateString+'T00:00:00-0500');
    d.setHours(0, 0, 0, 0);
    return d;
}

function getBalanceSeriesStruct(transactions, balance, currentDate, numDays) {

  //balance[0] is Cash....balance[1] is Credit
  balance = balance.slice();
  const points = [];
  let i = 0;
  let cashMin = 0;
  let cashMax = 0;
  let creditMin = 0;
  let creditMax = 0;

  _.forEach(getDates(currentDate, numDays), function(date) {
    date.setHours(0, 0, 0, 0);
    while(i < transactions.length - 1) {
      const targetDate = createDate(transactions[i].scheduledDate);
      targetDate.setHours(0, 0, 0, 0);
      if(date - targetDate > 0) {
        i++;
      } else {
        break;
      };
    };

    // calculate this transactions impact to appropriate balance (Cash or Credit)
    if (i < transactions.length) {
      const tran = transactions[i];
      const targetDate = createDate(tran.scheduledDate);
      targetDate.setHours(0, 0, 0, 0);
      if (date - targetDate === 0) { //dates match
        let balanceIndex = 0;  //assume Cash
        if (tran.accountName === accountNameTypes[1]) {  // unless Credit!
            balanceIndex = 1;
        };
        // impact is different for cash v credit
        // expenses draw down on Cash (Asset), increase Credit (Liability)...
        if (tran.type === 'Expense' && balanceIndex === 0) {
            balance[balanceIndex] = balance[balanceIndex] - tran.amount;
        } else if (tran.type === 'Income' && balanceIndex === 0){
          balance[balanceIndex] = balance[balanceIndex] + tran.amount;
        } else if (tran.type === 'Expense' && balanceIndex === 1) {
          balance[balanceIndex] = balance[balanceIndex] + tran.amount;
        } else if (tran.type === 'Income' && balanceIndex === 1){
            balance[balanceIndex] = balance[balanceIndex] - tran.amount;
        } else {
          console.log("!!!!!!!! INVALID TRANS TYPE !!!!!!!!!!!!"); // should never happen :-)
        };
      };
    };
  const total = balance[0] + balance[1];
  if (balance[0] > cashMax) {
      cashMax = balance[0];
  };
  if (balance[0] < cashMin) {
      cashMin = balance[0];
  };

  if (balance[1] > creditMax) {
      creditMax = balance[0];
  };
  if (balance[1] < creditMin) {
      creditMin = balance[1];
  };


  points.push([formatDate(date), balance[0], (balance[1]*-1)]);
  });

  console.log("data points: \n", points);
  return {
    dailyBalances: new TimeSeries({
      name: 'Balances',
      utc: false,
      columns: ["index", accountNameTypes[0], accountNameTypes[1]],
      points: points
    }),
    cashMax: cashMax,
    cashMin: cashMin,
    creditMax: creditMax,
    creditMin: creditMin,
    endingCash: points[points.length-1][1],
    endingCredit: points[points.length-1][2]
  };
};

export {getBalanceSeriesStruct, formatDate, createDate, getDates, dateToday };
