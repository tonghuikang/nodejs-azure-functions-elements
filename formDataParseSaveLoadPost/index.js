const parser = require("azure-func-multipart-parser");
const basicFunctions = require("../modules/basic/basicFunctions.js");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// const run = async () => {
//   await writeFileAsync("/tmp/test/data.json", Buffer.from('Hello Node.js'));
//   const res = await readFileAsync('/tmp/test/data.json');
//   console.log(res)
// }
// run()

// Saves file in local filesystem
// https://stackoverflow.com/questions/39218895/azure-functions-nodejs-what-are-restrictions-limitations-when-using-file-sys
module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let { files, fields } = parser.parse(req);

  for (let name in files) {
    let fpath = path.join("/tmp/", files[name].filename);
    files[name]["path"] = fpath;
    await writeFileAsync(fpath, Buffer.from(files[name]["content"]));
    files[name].content = "";
    // content is saved in directory rather than as a variable
    // some of your functions may need to read the directory
  }

  let formData = new FormData();

  context.log(fields);
  for (let key in fields) {
    formData.append(key, fields[key]);
  }

  console.log(files);
  for (let name in files) {
    let file_data = await readFileAsync(files[name]["path"]);
    let file_buffer = await Buffer.from(file_data);
    formData.append(name, file_buffer, {
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
