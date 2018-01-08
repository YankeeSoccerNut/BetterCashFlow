
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function saveUserPlan(uid, db, plan, txns){

  console.log("params.....", uid, db, plan, txns);

  // if no plan, then we have to create one and use its id to insert the transaction details
  // if there is a plan then we'll be updating it
  // I'm thinking it will be easier and cleaner to delete all transactions for an existing plan

  // consider summing cash and credit used....
  // let planPromise = null;
  // let cashUsed = txns.reduce((p, c) => {
  //
  // }, initial);
  //
  // array.reduce(function(total, currentValue, currentIndex, arr), initialValue);

  let planPromise = null;

  if(plan === null){
    planPromise = new Promise (function(resolve, reject) {
      const insertPlanSQL = `INSERT into user_plans (uid, status_cd, user_plan_name, cash_available, credit_available, num_txns, cash_used, credit_used) VALUES (?,?,?,?,?,?,?,?);`;

      db.query(insertPlanSQL,[uid, 0, "test", 0,0,txns.length, 0, 0], function (err, result) {
        if (err){
          reject(err);
        } else {
          console.log("Plan record inserted");
          resolve(result);
        };
      }); // insert query
    }); // promise
  } else {
    planPromise = new Promise (function(resolve, reject) {
      const updatePlanSQL = `UPDATE user_plans SET status_cd = ?, user_plan_name = ?, cash_available = ?, credit_available = ? WHERE id = ? AND uid = ?;`;

      db.query(updatePlanSQL, function (err, result) {
        if (err){
          reject(err);
        } else {
          console.log("Plan record inserted");
          resolve(result);
        };
      }); // update query
    }); // promise
  }

  planPromise.then((result) => {
    console.log("planPromise resolved: ", result);

    let txnPromises = [];
    let txnPromise = null;

    txnPromises = txns.map((txn) => {

      let txnFloatAmount = parseFloat(txn.amount);

      txnPromise = new Promise (function(resolve, reject) {
        const insertTxnSQL = `INSERT into plan_details (plan_id, txn_type, txn_account_name, txn_payee, txn_due_date, txn_sched_date, txn_amount) VALUES (?,?,?,?,?,?,?);`;

        db.query(insertTxnSQL,[result.insertId, txn.type, txn.accountName, txn.payee,txn.dueDate,txn.scheduledDate,txnFloatAmount], function (err, result) {
          if (err){
            reject(err);
          } else {
            console.log("Txn record inserted");
            resolve(result);
          };
        }); // insert query
      }); // promise
      return txnPromise;
    });
    Promise.all(txnPromises).then((results) => {
      console.log("All txnPromises resolved....", results);
      return true;
    });
  });

  console.log("Did something go wrong???");

};

module.exports = saveUserPlan;
