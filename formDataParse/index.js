const parser = require("azure-func-multipart-parser");

module.exports = function(context, request) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let parts = parser.parse(request);
  context.res = { body: parts };
  context.done();
};
