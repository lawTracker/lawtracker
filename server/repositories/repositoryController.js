var fs = require('fs');

module.exports = {
  create: function (req, res, next) {
    console.log('In create reposistory');
    var repositoryName = req.body.repository;
  }

};
