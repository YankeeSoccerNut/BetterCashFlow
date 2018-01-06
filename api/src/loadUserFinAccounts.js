// in the future, this function is intended to leverage yodlee to retrieve user financial account information.  For now, we're going to simply return 2 different sets of account information based on the user id that is passed in.
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function loadUserFinAccounts(uid){

  let accountObject = {};
  accountObject.accounts = [];

  let accountObjects = [];

  if(uid === 2){  // our test account...

    accountObject.finInstitution = 'DEMO-CASH';
    accountObject.type = 'CASH';
    accountObject.accounts.push({beginning: 5000.10, available: 4000.10, scheduled: [{date: '2018-01-11', amount: 1000}]});

    accountObjects.push(accountObject);

    accountObject = {};
    accountObject.accounts = [];

    accountObject.finInstitution = 'DEMO-CREDIT';
    accountObject.type = 'CREDIT';
    accountObject.accounts.push({total: 25000, used: 3500, available: 19500, scheduled: [{date: '2018-01-11', amount: 2000}]});

    accountObjects.push(accountObject);

    return accountObjects;
  } else {
    accountObject.finInstitution = 'OTHER-CASH';
    accountObject.type = 'CASH';
    accountObject.accounts.push({beginning: 50.10, available: 40.10, scheduled: [{date: '2018-01-11', amount: 10}]});

    accountObjects.push(accountObject);

    accountObject = {};
    accountObject.accounts = [];

    accountObject.finInstitution = 'OTHER-CREDIT';
    accountObject.type = 'CREDIT';
    accountObject.accounts.push({total: 250, used: 35, available: 215, scheduled: [{date: '2018-01-11', amount: 20}]});

    accountObjects.push(accountObject);

    return accountObjects;
  }
};

module.exports = loadUserFinAccounts
