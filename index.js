const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//const _ = require('lodash');
//const {pool} = require('./config');
const secret = require('./secret.js');
// const ProtectedRoutes = express.Router();
//const {checkAccessToken} = require('./authMiddleware');
const app = express();
const routes = require('./routes');

app.set('secret',secret.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/api',routes);

// app.use('/api',ProtectedRoutes);
// ProtectedRoutes.use(checkAccessToken);

// const defaultLimit = {
//   'limit':20
// };

// ProtectedRoutes.get('/getAllProducts',(req,res)=>{
//   let products = [
//       {
//           id: 1,
//           name:"cheese"
//       },
//       {
//          id: 2,
//          name:"carottes"
//      }
//   ]
//   res.json(products)
 
//  })
// const getBankDetails = (request,response) => {
//   let ifscCode = request.params.ifsc;
//   let combinedObj = _.assign(defaultLimit,request.query);
//   let limit = combinedObj.limit;
//   let offset = _.isUndefined(combinedObj.offset)?0:combinedObj.offset;
//   pool.query('SELECT * from bank_branches where ifsc=$1 LIMIT $2 OFFSET $3',[ifscCode,limit,offset], (error,results) => {
//     if(error) throw error;
//     response.status(200).json(results.rows);
//   });
// }

// const getBranchDetails = (request,response) => {
//   let bankName = request.query.bankName;
//   bankName=bankName.toLowerCase();
//   let city = request.query.city;
//   city=city.toLowerCase();
//   let combinedObj = _.assign(defaultLimit,request.query);
//   let limit = combinedObj.limit;
//   let offset = _.isUndefined(combinedObj.offset)?0:combinedObj.offset;
//   pool.query('SELECT * from bank_branches where LOWER(bank_name)=$1 and LOWER(city)=$2 LIMIT $3 OFFSET $4',[bankName,city,limit,offset], (error,results) => {
//     if(error) throw error;
//     response.status(200).json(results.rows);
//   });
// }

const doAuthentication = (request, response) => {
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

// app.route('/bankDetails/:ifsc').get(getBankDetails);
// app.route('/branchDetails').get(getBranchDetails);
app.route('/authenticate').post(doAuthentication);

app.listen(process.env.PORT||3002,() => {
  console.log('server started');
});
