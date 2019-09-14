var parser = require("azure-func-multipart-parser");
 

module.exports = function (context, request) {
    context.log('JavaScript HTTP trigger function processed a request.');
    // encode body to base64 string
    var parts = parser.parse(request);
    context.log(parts);
    // var boundary = multipart.getBoundary(request.headers['content-type']);
    // // parse the body
    // var parts = multipart.Parse(bodyBuffer, boundary);
    context.res = {body : parts};
    context.done();
};