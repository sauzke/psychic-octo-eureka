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

  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    var query = "select prname as province, sum(numtoday) as new_cases, Month(date) as month from covid19 where YEAR(date) = '2021' and prname not in ('Canada', 'Repatriated travellers') group by prname, Month(date) order by prname, month(date);"
    request.query(query, function (err, dataset) {
      if (err) console.log(err)

      var data = [];
      var records = dataset.recordsets[0];

      for( let i=1; i<=6; i++){
        data[i] = [['Province', 'New Cases']];
      }

      for( var item in records ){
        var ds = records[item];
        data[ds.month].push([ds.province, ds.new_cases]);
      }
      res.render('index', { title: 'Express', dataset: data });
    });
  });
});

module.exports = router;
