exports.echo = async function(req, res, next) {
    console.log(req.body);
    next()
}