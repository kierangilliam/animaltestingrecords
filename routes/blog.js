var express = require('express');
var router = express.Router();
var blogPosts = require('../public/blog.json');

router.get('/', function(req, res, next) {
  res.render('blog', { title: 'Blog', posts: blogPosts });
});

module.exports = router;
