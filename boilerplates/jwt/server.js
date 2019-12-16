const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

class HTTPHandler {
  auth(req, res) {
    let username = req.body.username
    let password = req.body.password

    let staicUsername = "sivak"
    let staticPassword = "MyTestPassword"

    if (username && password) {
      if (username === staicUsername && password === staticPassword) {
        let jwt_token = jwt.sign({
          username,
          password
        }, config.jws_secrets, {
          expiresIn: '24h'
        });
        res.json({
          success: true,
          message: 'successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Failed, Please check username and password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Username or password missing'
      });

    }
  }
  test(req, res) {
    res.json({
      success: true,
      message: 'Test Page'
    });
  }

}

// Starting point of the server
function main() {
  let app = express();
  let handlers = new HTTPHandler();
  const port = process.env.PORT || 12345;
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.post('/auth', handlers.auth);
  app.get('/test', middleware.checkToken, handlers.test);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
