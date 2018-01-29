const express = require('express');

var router = express.Router();
var controller = require('../controllers/controllers.js');

router.get('/product/:name', controller.getProduct);

router.post('/product', controller.saveProduct);

module.exports = router;