
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function getPlanDetails(planId, db){

  console.log("getPlanDetails for: ", planId);
  // we're returning a promise to get the plan history...and summary plan information

  let dbPromise = new Promise(function(resolve, reject) {

    const selectPlanSQL = `SELECT * FROM plan_details WHERE plan_id = ?;`;

    let planPromise = new Promise(function(resolve, reject) {
      db.query(selectPlanSQL,[planId], function (err, results) {
        if (err){
          reject(err);
        } else {
          console.log("Plan details retrieved\n:", results);
          resolve({planId: planId,
                  planDetails: results});
        };
      });
    });

    planPromise.then((planObject) => {
        const selectPlanSQL = `SELECT * FROM user_plans WHERE id = ?;`;

        db.query(selectPlanSQL,[planObject.planId], function (err, results) {
          if (err){
            reject(err);
          } else {
            planObject.planSummary = results;
            console.log("resolve(planObject): ",planObject);
            resolve(planObject);
          };
        }); // select query
      }); // dbPromise
    });
    return(dbPromise);
  };


module.exports = getPlanDetails;
