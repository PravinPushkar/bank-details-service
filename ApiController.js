class ApiController {
  constructor() {}

  getBankDetails(ifscCode, limit, offset,cb) {
    pool.query('SELECT * from bank_branches where ifsc=$1 LIMIT $2 OFFSET $3',[ifscCode,limit,offset], (error,results) => {
      return cb(error, result);
    });
  }
  getBranchDetails() {

  }
}

module.exports = ApiController;