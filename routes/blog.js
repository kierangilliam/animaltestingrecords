var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog', { title: '7-11 Jesus' });
});

module.exports = router;
