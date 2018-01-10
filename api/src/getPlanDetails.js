
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function getPlanDetails(planId, db){

  console.log("getPlanDetails for: ", planId);
  // we're returning a promise to get the plan history...

  let planDetailsPromise = new Promise(function(resolve, reject) {

    const selectPlanSQL = `SELECT * FROM plan_details WHERE plan_id = ?;`;

    db.query(selectPlanSQL,[planId], function (err, results) {
      if (err){
        reject(err);
      } else {
        console.log("Plan details retrieved\n:", results);
        resolve({planId: planId,
                planDetails: results});
      };
    }); // select query
  }); // planPromise

  return planDetailsPromise;
};

module.exports = getPlanDetails;
