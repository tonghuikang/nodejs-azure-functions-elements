module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {ENV_VARIABLE_NAME : process.env.ENV_VARIABLE_NAME}
    };
};