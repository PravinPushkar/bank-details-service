const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {pool} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const test = (request,response) => {
  pool.query('SELECT name from banks where id=1', (error,result) => {
    if(error) throw error;
    response.status(200).json({"status":JSON.stringify(result)});
  });
}

app.route('/test').get(test);

app.listen(process.env.PORT,() => {
  console.log('server started');
});