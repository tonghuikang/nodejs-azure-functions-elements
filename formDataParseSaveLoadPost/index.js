const parser = require("azure-func-multipart-parser");
const FormData = require("form-data");

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const basicFunctions = require("../modules/basic/basicFunctions.js");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // using the obscure package to parse multipart/form-data
  let { files, fields } = parser.parse(req);

  // Here we save the file content in the directory rather than as a variable
  // This is to prepare because some of your functions only reads a directory for input
  // Regarding the use of the filesystem in Azure Functions
  // https://stackoverflow.com/questions/39218895
  // Please do compare this file with ../formDataParsePost/index.js

  for (let name in files) {
    let fpath = path.join("/tmp/", files[name].filename);
    files[name]["path"] = fpath;
    await writeFileAsync(fpath, Buffer.from(files[name]["content"]));
    files[name].content = "";
    // now you see that the content of the file is empty
  }

  let formData = new FormData();

  for (let key in fields) {
    formData.append(key, fields[key]);
  }

  for (let name in files) {
    // load files from the directory back into the variable
    let file_data = await readFileAsync(files[name]["path"]);

    files[name].content = await Buffer.from(file_data);
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
