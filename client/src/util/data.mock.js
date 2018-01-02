import {formatDate, dateToday, createDate} from './lib';
import _ from 'lodash'
const typeTypes = ['Expense', 'Income'];
const accountNameTypes = ['CASH', 'CREDIT'];
const payeeTypes = [
    'MyLandlord',
    'MyContrator',
    'MySupplier',
    'MyElectricity',
    'MyWater',
    'MyCleaning',
    'MyPayroll',
    'FirstData',
    '+NewPayee'
];

function addTransactions(quantity) {
    const transactions = [];
    const startId = transactions.length;
    for (let i = 1; i < quantity; i++) {
  const id = startId + i;
  var type = typeTypes[0];
  if (id % 2) {
      type = typeTypes[1];
  }
  var accountName = accountNameTypes[0];
  if (id % 3) {
      accountName = accountNameTypes[1];
  }
  var day = Math.floor(i) % 30;
  if (day < 10) {
      day = '0' + day;
  }
  const date = '2018-01-' + day;

  // const date = '12/' + Math.floor(i) + '/2017';
  if (createDate(date) >= dateToday()) {
      transactions.push({
    id: id,
    type: type,
    accountName: accountName,
    payee: payeeTypes[i % (payeeTypes.length - 1)],
    scheduledDate: date,
    dueDate: date,
    amount: i * 100
      });
  }
    }
    return transactions;
}

function getTransactions() {
    return addTransactions(15);
}

function getBalances() {
    return [10000, 15000];
}

function loadDemoTxns() {

  let demoTransactions = [
    {id: 1,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyLandlord',
    scheduledDate:'',
    dueDate:'',
    amount: 4000},
    {id: 2,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyContractor',
    scheduledDate:'',
    dueDate:'',
    amount: 2000},
    {id: 3,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MySupplier',
    scheduledDate:'',
    dueDate:'',
    amount: 1000},
    {id: 4,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyElectricity',
    scheduledDate:'',
    dueDate:'',
    amount: 800},
    {id: 5,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyWater',
    scheduledDate:'',
    dueDate:'',
    amount: 100},
    {id: 6,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyCleaning',
    scheduledDate:'',
    dueDate:'',
    amount: 400},
    {id: 7,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyPayroll',
    scheduledDate:'',
    dueDate:'',
    amount: 7000},
    {id: 8,
    type: 'Income',
    accountName: 'CASH',
    payee: 'FirstData',
    scheduledDate:'',
    dueDate:'',
    amount: 2000},
    {id: 9,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'CompanyCar',
    scheduledDate:'',
    dueDate:'',
    amount: 575},
    {id: 10,
    type: 'Income',
    accountName: 'CASH',
    payee: 'CustomerRcvbl',
    scheduledDate:'',
    dueDate:'',
    amount: 975},
    {id: 11,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyLandlord',
    scheduledDate:'',
    dueDate:'',
    amount: 4000},
    {id: 12,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyElectricity',
    scheduledDate:'',
    dueDate:'',
    amount: 800},
    {id: 13,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'MyWater',
    scheduledDate:'',
    dueDate:'',
    amount: 100},
    {id: 14,
    type: 'Expense',
    accountName: 'CASH',
    payee: 'CompanyCar',
    scheduledDate:'',
    dueDate:'',
    amount: 575}
  ];

  demoTransactions.map((txn) => {
    // randomly disperse schedule/due dates across 60 days....
    let numDays = Math.floor((Math.random() * 60) + 1);

    let randomDate = (dateToday()).addDays(numDays);

    txn.scheduledDate = formatDate(randomDate);
    txn.dueDate = formatDate(randomDate);

  });

  let sortedTransactions = _.sortBy(demoTransactions,['scheduledDate'])
  return(sortedTransactions);
};

export {getBalances, getTransactions, loadDemoTxns, typeTypes, accountNameTypes, payeeTypes};
