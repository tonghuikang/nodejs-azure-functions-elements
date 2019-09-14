const parser = require("azure-func-multipart-parser");
const FormData = require("form-data");

const basicFunctions = require("../modules/basic/basicFunctions.js");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // using the obscure package to parse multipart/form-data
  let { files, fields } = parser.parse(req);

  let formData = new FormData();

  console.log(fields);
  for (let key in fields) {
    formData.append(key, fields[key]);
  }

  console.log(files);
  for (let name in files) {
    formData.append(name, files[name].content, {
      filename: files[name].filename,
      contentType: files[name].type
    });
  }

  let result = basicFunctions.postFormData(
    formData,
    process.env.REQUESTBIN_URL
  );

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { fields, files }
  };
};
