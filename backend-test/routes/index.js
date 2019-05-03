const express = require('express');
const router = express.Router();
const Phoneword = require('../model/PhoneWord')


router.get('/', function(req, res, next) {
  res.json({ok:'ok'})
  //res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  const { input } = req.body
  const results = Phoneword.getValues(input.split(""))
  res.json({ number: results.length, data: results })
})

module.exports = router;
