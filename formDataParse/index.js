var parser = require("azure-func-multipart-parser");


module.exports = function (context, request) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var parts = parser.parse(request);
    context.log(parts);
    context.res = { body: parts };
    context.done();
};