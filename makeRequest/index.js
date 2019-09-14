const basicFunctions = require("../modules/basic/basicFunctions");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let query = req.query
  let body = req.body

  let result = await basicFunctions.postJSON(body);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {query, body, result}
  };
};
