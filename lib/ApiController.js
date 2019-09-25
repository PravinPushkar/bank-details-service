const {pool} = require('../config');

class ApiController {
  constructor() {}

  getBankDetails(ifscCode, limit, offset,cb) {
    pool.query('SELECT * from bank_branches where ifsc=$1 LIMIT $2 OFFSET $3',[ifscCode,limit,offset], (error,results) => {
      return cb(error, results);
    });
  }
  getBranchDetails(bankName, city, limit, offset,cb) {
    pool.query('SELECT * from bank_branches where LOWER(bank_name)=$1 and LOWER(city)=$2 LIMIT $3 OFFSET $4',[bankName,city,limit,offset], (error,results) => {
      return cb(error, results);
    });
  }
}

module.exports = ApiController;