axios = require("axios")

exports.sayHelloInEnglish = function() {
    return "HELLO ";
};

exports.postJSON = async function(obj) {
    let result = await axios.post(
        "https://enve4l0vhcsxf.x.pipedream.net/",
        obj
    );
    return {
        "statusText" : result.statusText,
        "message" : "Please check whether the endpoint received a POST request"
    };
};

exports.postFormData = async function(formData, endpoint){

    let result = await axios.post(
        "https://enve4l0vhcsxf.x.pipedream.net/",
        formData,
        {
        headers: {
            ...formData.getHeaders(), // https://github.com/axios/axios/issues/789
            "Content-Type": "multipart/form-data"
            }
        }
    )
    return result
};
