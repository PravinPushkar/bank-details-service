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

app.route('/bankDetails/:ifsc').get(getBankDetails);

app.listen(process.env.PORT,() => {
  console.log('server started');
});