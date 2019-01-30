var express = require('express');
var router = express.Router();
var merch = require('../public/merch.json');
var artists = require('../public/artists.json');

router.get('/', function(req, res, next) {
    merch['latest'] = sort_latest(merch);
    console.log(merch);
    res.render('merch', { title: 'Merch | Animal Testing Records', merch: merch, artists: artists });
});

// Returns a array of products with an added field to
// each item of 'brand'
function get_product_arr(merch) {

    var products = [];

    for (var artist of Object.keys(merch['artists'])) {
        for (var product of Object.values(merch['artists'][artist])) {
            product['brand'] = artists[artist]['name'];
            products.push(product);
        }
    }

    for (var product of Object.values(merch['animal_testing_records'])) {
        product['brand'] = 'Animal Testing Records';
        products.push(product);
    }

    return products;
}

// Returns array of merch sorted from most recent to least recent date_added
function sort_latest(merch) {

    var latest = get_product_arr(merch);

    latest.sort(function(a,b) {
        return new Date(b['date_added']) - new Date(a['date_added']);
    });

    return latest;
}

module.exports = router;
