const parser = require("azure-func-multipart-parser");
const basicFunctions = require("../modules/basic/basicFunctions.js")
const FormData = require("form-data");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let {files, fields} = parser.parse(req);

    let formData = new FormData();

    console.log(fields);
    for (let key in fields) {
        formData.append(key, fields[key]);
    }

    console.log(files);
    for (let key in files) {
        formData.append(
            key, 
            Buffer.from(files[key]["content"]),
            {
                filename: files[key]["filename"],
                contentType: files[key]["type"],
            }
        );
    }

    let result = await basicFunctions.postFormData(formData, "https://enve4l0vhcsxf.x.pipedream.net/")

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {files, fields}
    };
};
