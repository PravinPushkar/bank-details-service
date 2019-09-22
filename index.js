const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {pool} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const getBankDetails = (request,response) => {
  let ifscCode = request.params.ifsc;
  pool.query('SELECT * from bank_branches where ifsc=$1',[ifscCode], (error,results) => {
    if(error) throw error;
    response.status(200).json(results.rows);
  });
}

const getBranchDetails = (request,response) => {
  let bankName = request.query.ifsc.toLowerCase();
  let city = request.query.city.toLowerCase();\
  console.log("===============");
  console.log(bankName + ":::" + city);
  console.log("===============");
  if(bankName.length!=0 && city.length!=0) {
    pool.query('SELECT * from bank_branches where LOWER(bank_name)=$1 and LOWER(city)=$2',[bankName,city], (error,results) => {
      if(error) throw error;
      response.status(200).json(results.rows);
    });
  }
  else{
    throw new Error("Please provice Bank Name and city name");
  }
  
}

app.route('/bankDetails/:ifsc').get(getBankDetails);
app.route('/branchDetails').get(getBranchDetails);

app.listen(process.env.PORT,() => {
  console.log('server started');
});