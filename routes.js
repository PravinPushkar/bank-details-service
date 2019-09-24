const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {pool} = require('./config');
const {checkAccessToken} = require('./authMiddleware');

const defaultLimit = {
  'limit':20
};
router.get('/bankDetails/:ifsc',checkAccessToken, (request,response) => {
  let ifscCode = request.params.ifsc;
  let combinedObj = _.assign(defaultLimit,request.query);
  let limit = combinedObj.limit;
  let offset = _.isUndefined(combinedObj.offset)?0:combinedObj.offset;
  pool.query('SELECT * from bank_branches where ifsc=$1 LIMIT $2 OFFSET $3',[ifscCode,limit,offset], (error,results) => {
    if(error) throw error;
    response.status(200).json(results.rows);
  });
});
router.get('/branchDetails', checkAccessToken, (request,response) => {
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
});

module.exports = router;