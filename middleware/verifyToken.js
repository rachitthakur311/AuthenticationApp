var jwt = require ('jsonwebtoken');

function verifyToken(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token)
    return res.status(403).send({auth: false, message: 'no token provided'});

    jwt.verify(token, 'verySecretValue', function(eroor, decoded){
        if(err)
        return res.status(500).send({auth: false, message: 'failed to authenticate token.'})
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyToken;