var express = require('express');
var router = express.Router();
var artists = require('../public/artists.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Animal Testing Records', artists: artists });
});

module.exports = router;
