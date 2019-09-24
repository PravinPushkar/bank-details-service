const jwt = require('jsonwebtoken');

const authenticator = {
  checkAccessToken : (req,res,next) => {
    var token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, req.app.get('secret'), (err, decoded) =>{      
        if (err) {
          return res.json({ message: 'invalid token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } 
    else {
      res.send({
        message: 'No token provided.' 
      });
    }
  }
};

module.exports = authenticator;
