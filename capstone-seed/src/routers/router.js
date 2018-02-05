const express = require('express');

var router = express.Router();
var controller = require('../controllers/controllers.js');

router.get('/product/:name', controller.getProductByName);

router.post('/product', controller.saveProduct);

router.get('/product', controller.getProductByQuery);

module.exports = router;