
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function saveUserPlan(uid, db, plan, txns){

  // we're returning a promise to save the user plan...
  console.log("saveUserPlan plan: ", plan);

  return new Promise(function(resolve, reject) {

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

    let planPromises = [];
    let returnPlanId = null;
    let cashUsed = 0;
    let creditUsed = 0;

    for (let i = 0; i < txns.length; i++) {
      if(txns[i].accountName === 'CASH')
        cashUsed += txns[i].amount
      else {
        creditUsed += txns[i].amount
      };
    };

    console.log("cashUsed: ", cashUsed);
    console.log("creditUsed: ", creditUsed);

    if(plan.planId === null){
      planPromises.push(new Promise (function(resolve, reject) {
        const insertPlanSQL = `INSERT into user_plans (uid, status_cd, user_plan_name, cash_available, credit_available, num_txns, cash_used, credit_used) VALUES (?,?,?,?,?,?,?,?);`;

        db.query(insertPlanSQL,[uid, 0, "test", 0,0,txns.length, cashUsed, creditUsed], function (err, result) {
          if (err){
            reject(err);
          } else {
            console.log("Plan record inserted", result.insertId);
            returnPlanId = result.insertId;
            resolve(result.insertId);
          };
        }); // insert query
      })); // planPromise
    } else {
      returnPlanId = plan.planId;
      console.log("delete txns, update plan");
      console.log("plan: ", plan);

      planPromises.push(new Promise (function(resolve, reject) {
        const deleteTxnsSQL = `DELETE FROM plan_details WHERE plan_id = ?;`;

        db.query(deleteTxnsSQL,[plan.planId], function (err) {
          if (err){
            reject(err);
          } else {
            console.log("plan_details deleted for plan_id: ", plan.planId);
            resolve(plan.planId);
          };
        }); // delete query
      })); // delete promise

      planPromises.push(new Promise (function(resolve, reject) {
        const updatePlanSQL = `UPDATE user_plans SET status_cd = ?, user_plan_name = ?, cash_available = ?, credit_available = ?, num_txns = ?, cash_used = ?, credit_used = ?  WHERE id = ? AND uid = ?;`;

        db.query(updatePlanSQL,[0, "updated name", 0,0,txns.length, cashUsed, creditUsed, plan.planId, uid], function (err, result) {
          if (err){
            reject(err);
          } else {
            console.log("Plan record updated: ", result);
            resolve(plan.planId);
          };
        }); // update query
      })); //
    };

    Promise.all(planPromises).then((planId) => {

      console.log("planPromise resolved planId: ", planId);
      let txnPromises = [];
      let txnPromise = null;

      txnPromises = txns.map((txn) => {

        let txnFloatAmount = parseFloat(txn.amount);

        txnPromise = new Promise (function(resolve, reject) {
          const insertTxnSQL = `INSERT into plan_details (plan_id, txn_type, txn_account_name, txn_payee, txn_due_date, txn_sched_date, txn_amount) VALUES (?,?,?,?,?,?,?);`;

          db.query(insertTxnSQL,[returnPlanId, txn.type, txn.accountName, txn.payee,txn.dueDate,txn.scheduledDate,txnFloatAmount], function (err) {
            if (err){
              reject(err);
            } else {
              console.log("Txn records inserted");
              resolve(planId);
            };
          }); // insert query
        }); // promise
        return txnPromise;
      });

      Promise.all(txnPromises).then((planId) => {
        console.log("All txnPromises resolved for plan: ", returnPlanId);
        resolve (returnPlanId);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    })
    .catch((err) => {
      console.log("planPromise did not resolve: ", err);
    });
  });
};

module.exports = saveUserPlan;
