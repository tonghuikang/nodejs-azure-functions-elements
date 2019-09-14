const basicFunctions = require("../modules/basic/basicFunctions")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    content = {
        "params" : req.query,
        "body" : req.body
    }

    let result = await basicFunctions.postJSON(content);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: content
    };
};