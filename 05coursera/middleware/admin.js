const jwt = require('jsonwebtoken')
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD

function adminMiddleware(req, res, next){
    const token = req.headers.token;
      if (!token) {
        return res.status(403).json({
            message: "Token missing"
        });
    }
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message: 'you are not signed In'
        })
    }
}
    module.exports = {
    adminMiddleware : adminMiddleware
    }