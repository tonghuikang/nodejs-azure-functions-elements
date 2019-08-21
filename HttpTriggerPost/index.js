var localImports = require("../modules/local-imports.js")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    content = {
        "params" : req.query, 
        "body" : req.body
    }

    let result = await localImports.postJSON(content);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: content
    };
};