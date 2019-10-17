var express = require('express');
var router = express.Router();
/* GET user profile. */
router.get('/', function(req, res, next) {
    res.send("some profile");
});

module.exports = router;