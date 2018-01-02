import { TimeSeries } from 'pondjs';
import _ from 'lodash';

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

  // don't assume the transactions are sorted...
  let sortedTransactions = _.sortBy(transactions,['scheduledDate']);

  console.log("sorted Transactions: ", sortedTransactions);

  balance = balance.slice();

  const points = [];
  let i = 0;
  let dateMatchCount = 0;
  let cashMin = 0;
  let cashMax = 0;
  let netCashUsed = 0;
  let netCreditUsed = 0;
  let creditMin = 0;
  let creditMax = 0;
  let cashIndex = 0;
  let creditIndex = 1;

  //going to create a data point in the series for each day
  _.forEach(getDates(currentDate, numDays), function(seriesDate) {

    // seriesDate.setHours(0, 0, 0, 0);
    console.log("seriesDate: ", seriesDate);

    //Series date is a javascript date...put it into same format as txnSchedDate for comparison....
    let gregSeriesDate = formatDate(seriesDate);
    console.log("gregSeriesDate: ", gregSeriesDate);

    //loop through the transactions...only transactions that match the current data point date have an impact to the balance for that point

    while (i < sortedTransactions.length) {
      let currTxn = sortedTransactions.slice(i,i+1);
      console.log("currTxn: ", currTxn[0]);
      const txnSchedDate = (currTxn[0].scheduledDate);

      // on matching dates keep going and update that series data point's balance....otherwise, break out and move on

      if (txnSchedDate === gregSeriesDate) {
        dateMatchCount++  //for testing...
        console.log("+++++Transaction Match with Series Date+++++++");
        console.log("txnSchedDate: ", txnSchedDate);
        console.log("seriesDate: ", seriesDate);

        if (currTxn[0].type === 'Expense' && currTxn[0].accountName === 'CASH') {
            balance[cashIndex] = balance[cashIndex] - Number(currTxn[0].amount);
            netCashUsed += Number(currTxn[0].amount);
        } else if (currTxn[0].type === 'Income' && currTxn[0].accountName === 'CASH'){
          balance[cashIndex] = balance[cashIndex] + Number(currTxn[0].amount);
          netCashUsed -= Number(currTxn[0].amount);
        } else if (currTxn[0].type === 'Expense' && currTxn[0].accountName === 'CREDIT') {
          balance[creditIndex] = balance[creditIndex] - Number(currTxn[0].amount);
          netCreditUsed += Number(currTxn[0].amount);
        } else if (currTxn[0].type === 'Income' && currTxn[0].accountName === 'CREDIT'){
            balance[creditIndex] = balance[creditIndex] + Number(currTxn[0].amount);
            netCreditUsed -= Number(currTxn[0].amount);
        } else {
          console.log("!!!!!!!! INVALID TRANS TYPE !!!!!!!!!!!!"); // should never happen :-)
        };

        if (balance[cashIndex] > cashMax) {
            cashMax = balance[cashIndex];
        };
        if (balance[cashIndex] < cashMin) {
            cashMin = balance[cashIndex];
        };
        if (balance[creditIndex] > creditMax) {
            creditMax = balance[creditIndex];
        };
        if (balance[creditIndex] < creditMin) {
            creditMin = balance[creditIndex];
        };

      } else {
        break;
      };
      i++
    };

    //after while loop for sortedTransactions....
    points.push([formatDate(seriesDate), balance[cashIndex], balance[creditIndex]])
    console.log("On to next seriesDate")
    console.log("Number of txn matches for this series: ", dateMatchCount);
    // dateMatchCount = 0;
  }); // forEach

  console.log("number of data points: \n", points.length);
  return {
    dailyBalances: new TimeSeries({
      name: 'Balances',
      utc: false,
      columns: ["index", "CASH", "CREDIT"],
      points: points
    }),
    cashMax: cashMax,
    cashMin: cashMin,
    creditMax: creditMax,
    creditMin: creditMin,
    endingCash: points[points.length-1][1],
    endingCredit: points[points.length-1][2],
    netCashUsed: netCashUsed,
    netCreditUsed: netCreditUsed
  };
};

export {getBalanceSeriesStruct, formatDate, createDate, getDates, dateToday };
