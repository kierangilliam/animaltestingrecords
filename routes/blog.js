var express = require('express');
var router = express.Router();
// TODO: Make fetching of blogPosts dynamic (or on update of blog posts) so
// newly added posts will be seen without restarting server
var blogPosts = require('../public/blog.json');

router.get('/', function(req, res, next) {
  res.render('blog', { title: '7-11 Jesus Blog', posts: blogPosts });
});

module.exports = router;
