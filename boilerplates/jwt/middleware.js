let jwt = require('jsonwebtoken')
const config = require('./config.js')

let validateToken = (req, res, next) => {
  let jwt_token = req.headers['x-access-token'] || req.headers['authorization']
  if (jwt_token.startWith('Bearer ')) {
    jwt_token = jwt_token.slice(7, jwt_token.length)
  }
  if (jwt_token) {
    jwt.verify(jwt_token, config.jws_secrets, (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is invalid"
        })
      } else {
        req.decoded = decoded;
        next();
      }

    });
  } else {

    return res.json({
      success: false,
      message: "Token is not found."
    })

  }
}
