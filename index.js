const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const {pool} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
const defaultLimit = {
  'limit':20
};
const getBankDetails = (request,response) => {
  let ifscCode = request.params.ifsc;
  let combinedObj = _.assign(defaultLimit,request.query);
  let limit = combinedObj.limit;
  let offset = _.isUndefined(combinedObj.offset)?0:combinedObj.offset;
  pool.query('SELECT * from bank_branches where ifsc=$1 LIMIT $2 OFFSET $3',[ifscCode,limit,offset], (error,results) => {
    if(error) throw error;
    response.status(200).json(results.rows);
  });
}

const getBranchDetails = (request,response) => {
  let bankName = request.query.bankName;
  bankName=bankName.toLowerCase();
  let city = request.query.city;
  city=city.toLowerCase();
  let combinedObj = _.assign(defaultLimit,request.query);
  let limit = combinedObj.limit;
  let offset = _.isUndefined(combinedObj.offset)?0:combinedObj.offset;
  pool.query('SELECT * from bank_branches where LOWER(bank_name)=$1 and LOWER(city)=$2 LIMIT $3 OFFSET $4',[bankName,city,limit,offset], (error,results) => {
    if(error) throw error;
    response.status(200).json(results.rows);
  });
}

app.route('/bankDetails/:ifsc').get(getBankDetails);
app.route('/branchDetails').get(getBranchDetails);

app.listen(process.env.PORT,() => {
  console.log('server started');
});