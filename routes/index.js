var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //NOTE: res.render method uses the JADE template the render index!!
  //can also be used inside server side rendering?!
  res.render('index', { title: 'Express' });
});

module.exports = router;
