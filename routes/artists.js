var express = require('express');
var router = express.Router();
var artists = require('../public/artists.json');

/* GET artists. */
router.get('/', function(req, res, next) {
    res.render('artists', { title: 'Artists | Animal Testing Records', artists: artists });
});

/* GET specific artist. */
router.get('/:artist_id', function(req, res, next) {

    var artist_id = req.params.artist_id;

    if (artist_id in artists) {
        artist = artists[artist_id]
        res.render('artist', { title: artist.name + ' | Artists', artist: artist });
    }
});

module.exports = router;
