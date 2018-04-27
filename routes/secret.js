var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var secret_codes = [];

// Read the treasure directory and get the files
const treasure_imgs = fs.readdirSync('../public/treasure/images').map(file => {
    return path.join('../public/treasure/images', file);
});

var debug_expiration = new Date();
debug_expiration.setMinutes(debug_expiration.getMinutes() + 60);
var debugging_code = {code: 'debug', expiration: debug_expiration};
secret_codes.push(debugging_code);

/* POST /secret/code Returns a code that is stored locally and used for the GET page */
router.post('/code', function(req, res, next) {
    
    // Remove old secret codes
    remove_old_codes();

    var new_code = gen_new_code();

    if (new_code == null) {
        res.status(500).jsonp({ error: 'Could not generate secret code.' });
        return;
    }

    secret_codes.push(new_code);

    res.json({ code: new_code.code });
});

/* POST secret puzzle answer. */
router.post('/:code/puzzle/:number', function(req, res, next) {
    
    var code = req.params.code;
    var number = req.params.number;
    var body = req.body;

    if (code_is_valid(code) == false) {
        res.json({success: false, message: "You took to long to figure out the puzzle and are not worthy of continuing."});
        return;
    }

    if (number == 1) {
        if (body.a1 === "7" && body.a2 === "SCHLOT" && body.a3 === "BK" && body.a4 === "S") {
            console.log("test");
            add_treasure(code);
            res.json({success: true});
        } else {
            res.json({success: false, message: "Incorrect answers"});
        }

        return;
    }

    res.json({success: false, message: "Invalid data"});
});

/* GET secret page. 
   code's are generated from the POST request and only valid for a short amount of time
*/
router.get('/:code', function(req, res, next) {

    var code = req.params.code;

    if (code_is_valid(code) == false) {
        res.send("Your secret code has expired!");
        return;
    }
    
    res.render('secret', { title: 'The Treasure of 7-11 Jesus', code: code });
});

/* POST returns treasure. If the provided code isnt granted treasure, no treasure is given. */
router.get('/:code/treasure', function(req, res, next) {

    var code = req.params.code;

    if (code_is_valid(code) == false) {
        res.json({messsage: "Your time on this page is over!", success: false});
        return;
    }

    console.log("test")
    var treasure = get_code(code).treasure;
    console.log("test")
    if (treasure == null) {
        console.log("test")
        res.json({success: false, message: "You have not won any treasure!"});    
        return;
    }
    
    res.json({success: true, message: "Here's your treasure!", treasure: treasure});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CODE OBJECT ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Creates a code object
   Code objects comprise of a code and expiration date
   and their treasure */
function code_obj (code) {

    var expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 5);
    
    var new_obj = {code: code, expiration: expiration, treasure: null};
    return new_obj;
}

/* Generates a new code that isn't present in secret_codes */
function gen_new_code () {

    var code_possibilities = "abcdefghijklmnopqrstuvwxyz"
    var code = choice(code_possibilities) + choice(code_possibilities) + choice(code_possibilities);
    var timeout = 0;

    while (secret_codes.find(o => o.code === code) != undefined) {
        code = code + choice(code_possibilities);
        timeout++;
        if (timeout == 10) return null;
    }

    return code_obj(code);
}

/* Checks if a code is valid (expired or in secret_code list) */
function code_is_valid (code) {
    
    var found_secret = secret_codes.find(o => o.code === code);

    if (found_secret == undefined) {
        console.log("Secret does not exist");
        return false;
    }

    if (found_secret.expiration < Date.now()) {
        console.log(Date.now() + " > " + found_secret.expiration);
        return false;
    }

    console.log(found_secret);    

    return true;
}

/* Returns code */
function get_code (code) {
    return secret_codes.find(o => o.code === code);
}

/* Removes old codes in secret_codes list */
function remove_old_codes() {

    for (var c in secret_codes) {
        if(secret_codes[c].expiration < Date.now()) {
            delete secret_codes[c];
        }
    }
}

/* Adds treasure to a secret code and more expiration time */
function add_treasure (code) {

    var found_secret = secret_codes.find(o => o.code === code);
    found_secret.treasure = gen_treasure();
    found_secret.expiration.setMinutes(found_secret.expiration.getMinutes() + 15);
}

/* Generates a treasure object with a picture and  */
function gen_treasure () {
    
    var names = ['auggie doggie', 'august', 'emma', 'creamus', 'kieran', 'lizard man'];
    var prizes = ['foot massage', 'custom made funeral dirge', 'self portrait'];
    var treasure = {};

    var image_path = choice(treasure_imgs);
    
    // remove /public/ from path
    treasure.image = image_path.substr(image_path.indexOf('/treasure/'));
    treasure.message = "You won a " + choice(prizes) + " from " + choice(names) + ", and this dope pic :)";
    
    return treasure;
}

/* Returns random element from list */
function choice (list) {
    var c = Math.floor(Math.random() * list.length);
    return list[c];
}

/* Misc tests */
function tests () {
    var new_code = gen_new_code();
    secret_codes.push(new_code);
    remove_old_codes();
}


module.exports = router;
