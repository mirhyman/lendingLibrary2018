const express = require('express');

var router = express.Router();
var controller = require('../controllers/controllers.js');

router.get('/product/:name', controller.getProductByName);

router.post('/product', controller.saveProduct);

router.post('/product/review', controller.saveReview);

router.get('/product/review/:id', controller.getReview);

router.get('/product', controller.getProductByQuery);

router.get('/products', controller.getAllProducts);

router.delete('/product/:name', controller.deleteProduct);

router.get('/textSearch', controller.getProductByText);

router.post('/productImage', controller.saveImage);

router.get('/productAccess', controller.getProductsByAccess);

module.exports = router;
