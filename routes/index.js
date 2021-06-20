var express = require('express');
var router = express.Router();

var sql = require("mssql");

/* GET home page. */
router.get('/', function (req, res, next) {
  var config = {
    user: 'sa',
    password: 'Password123',
    server: 'localhost',
    database: 'COMP8575',
    port: 1433,
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };

  // connect to your database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select location, date, new_cases from "owid-covid-data" where location is not null', function (err, data) {

      if (err) console.log(err)
      res.render('index', { title: 'Express', dataset: data.recordset });
    });
  });
});

module.exports = router;
