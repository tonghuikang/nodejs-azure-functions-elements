const axios = require("axios");

exports.sayHelloInSpanish = function(name) {
  return "Hola " + name;
};

exports.postJSON = async function(obj) {
  let result = await axios.post(process.env.REQUESTBIN_URL, obj);
  return {
    statusText: result.statusText,
    message: "Please check whether " + process.env.REQUESTBIN_URL + " received a POST request."
  };
};

exports.postFormData = async function(formData, endpoint) {
  let result = await axios.post(process.env.REQUESTBIN_URL, formData, {
    headers: {
      ...formData.getHeaders(), // https://github.com/axios/axios/issues/789
      "Content-Type": "multipart/form-data"
    }
  });
  return result;
};
