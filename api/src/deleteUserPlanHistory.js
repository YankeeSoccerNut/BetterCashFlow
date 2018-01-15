
// Note:  this user id is the uid that uniquely identifies this user in the users table in the database

function deleteUserPlanHistory(uid, db, planArray){

  // we're returning a promise to delete the user plan history...
  console.log("deleteUserPlanHistory plan: ", planArray);

  return new Promise(function(resolve, reject) {

    let planPromises = [];

      planPromises.push(new Promise (function(resolve, reject) {
        const deleteTxnsSQL = `DELETE FROM plan_details WHERE plan_id IN (?);`;

        db.query(deleteTxnsSQL,[planArray], function (err, result) {
          if (err){
            console.log("Error deleting plan_details: ", err)
            reject(err);
          } else {
            console.log("plan_details deleted: ", result);
            resolve(true);
          };
        }); // delete query
      })); // delete promise

      planPromises.push(new Promise (function(resolve, reject) {
        const deletePlanSQL = `DELETE FROM user_plans WHERE uid = ? AND id IN (?);`;

        db.query(deletePlanSQL,[uid, planArray], function (err, result) {
          if (err){
            console.log("Error deleting user_plans: ", err);
            reject(err);
          } else {
            console.log("Plan records deleted: ", result);
            resolve(true);
          };
        });
      }));

      Promise.all(planPromises).then(() => {
        resolve(planArray);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  };

module.exports = deleteUserPlanHistory;
