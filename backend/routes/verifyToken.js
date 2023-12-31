const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    let sToken = req.header('auth-token');
    const token = sToken.replace(/"/g, '');

    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}