
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function getUserPlans(uid, db){

  // we're returning a promise to get the plan history...

  let planHistoryPromise = new Promise(function(resolve, reject) {

    const selectPlanSQL = `SELECT * FROM user_plans WHERE uid = ?;`;

    db.query(selectPlanSQL,[uid], function (err, results) {
      if (err){
        reject(err);
      } else {
        console.log("Plan history retrieved\n:", results);
        resolve(results);
      };
    }); // select query
  }); // planPromise

  return planHistoryPromise;
};

module.exports = getUserPlans;
