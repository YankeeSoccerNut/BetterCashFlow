import {dateToday, createDate} from './lib'
const typeTypes = ['Expense', 'Income'];
const accountNameTypes = ['USBANK', 'VISAB2B'];
const payeeTypes = [
    'MyLandlord',
    'MyContrator',
    'MySupplier',
    'MyElectricity',
    'MyWater',
    'MyCleaning',
    'MyPayroll',
    'Elavon',
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
	const date = '2017-12-' + day;

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
    return addTransactions(20);
}

function getBalances() {
    return [10000, 8000];
}

export {getBalances, getTransactions, typeTypes, accountNameTypes, payeeTypes};