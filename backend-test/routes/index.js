var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ok:'ok'})
  //res.render('index', { title: 'Express' });
});

module.exports = router;
