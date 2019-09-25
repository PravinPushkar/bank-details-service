const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = require('./secret.js');
const app = express();
const routes = require('./routes');

app.set('secret',secret.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/api',routes);

const doAuthentication = (request, response) => {
  console.log(`from process ${process.pid}`);
  if(request.body.username==="service"){
      if(request.body.password==="service"){
      const payload = {
        check:  true
      };
      var token = jwt.sign(payload, app.get('secret'), {
        expiresIn: '5 days'
      });
      response.json({
        message: 'authentication successful ',
        token: token
      });
      }else{
        response.json({message:"password not correct"})
      }
  }else{
      response.json({message:"User not correct"})
  }
}

app.route('/authenticate').post(doAuthentication);

app.listen(process.env.PORT||3002,() => {
  console.log(`server started, process pid ${process.pid}`);
});
