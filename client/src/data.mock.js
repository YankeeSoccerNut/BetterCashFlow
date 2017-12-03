const typeTypes = ['Expense', 'Income'];
const accountNameTypes = ['VISAB2B', 'USBANK'];
const payeeTypes = [
    'MyLandlord',
    'MyElectricity',
    'MyWater',
    'MyCleaning',
    'MyPayroll',
    '+NewPayee'
];

function addTransactions(quantity) {
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
	transactions.push({
	    id: id,
	    type: type,
	    accountName: accountName,
	    payee: payeeTypes[i % payeeTypes.length],
	    scheduledDate: date,
	    dueDate: date,
	    amount: i * 100
	});
    }
}

function getTransactions() {
    return addTransactions(30);
}

export {generateReducer, newState, applyName};
