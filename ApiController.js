const {pool} = require('./config');

class ApiController {
  constructor() {}

  getBankDetails(ifscCode, limit, offset,cb) {
    pool.query('SELECT * from bank_branches where ifsc=$1 LIMIT $2 OFFSET $3',[ifscCode,limit,offset], (error,results) => {
      return cb(error, results);
    });
  }
  getBranchDetails() {

  }
}

module.exports = ApiController;