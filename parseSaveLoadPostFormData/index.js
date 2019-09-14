var parser = require("azure-func-multipart-parser");
var basicFunctions = require("../modules/basicFunctions.js")
const FormData = require("form-data");
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

// const run = async () => {
//   await writeFileAsync("/tmp/test/data.json", Buffer.from('Hello Node.js'));
//   const res = await readFileAsync('/tmp/test/data.json');
//   console.log(res)
// }
// run()

// Saves file in local filesystem
// https://stackoverflow.com/questions/39218895/azure-functions-nodejs-what-are-restrictions-limitations-when-using-file-sys
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var {files, fields} = parser.parse(req);

    let fileObj = {};

    for (let count in files){
      let file = files[count];
      let fpath = path.join("/tmp/", file.name);
      fileObj[`fileName${count}`] = file.name;
      fileObj[`filePath${count}`] = fpath;
      files[count]["path"] = fpath;
      await writeFileAsync(fpath, Buffer.from(files[count]["content"]));
    }

    let formData = new FormData();

    context.log(fields);
    for (var key in fields) {
        formData.append(key, fields[key]);
    }

    console.log(files);
    for (var key in files) {
        let file_data = readFileAsync(files[key]["path"])
        formData.append(
            key, 
            Buffer.from(file_data),
            {
                filename: files[key]["filename"],
                contentType: files[key]["type"],
            }
        );
    }

    let result = basicFunctions.postFormData(formData, "https://enve4l0vhcsxf.x.pipedream.net/")

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: fields
    };
};