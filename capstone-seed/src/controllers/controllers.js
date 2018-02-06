
var service = require('../services/service.js');

async function getProductByName(req, res) {
    let name = req.params.name;
    if(!name) {
        return res.status(400).send('Must include name');
    }
    try {
        const product = await service.getProductByName(name.toLowerCase());
        if(product) {
            res.json(product).status(200);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getProductByQuery(req, res) {
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    if (!minPrice) {
        maxPrice = 0;
        minPrice = 0;
    } else if (!maxPrice) {
        maxPrice = 0;
    }
    minPrice = parseInt(minPrice);
    maxPrice = parseInt(maxPrice);
    console.log(req.query);
    let jsonProd = {
        hardware: req.query.hardware,
        access: req.query.access,
        platform: req.query.platform,
        languages: req.query.languages,
        maxPrice: maxPrice,
        minPrice: minPrice,
        features: req.query.features
    };
    console.log(jsonProd);
    try {
        const product = await service.getProductByQuery(jsonProd);
        if(product) {
            res.json(product).status(200);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

async function saveProduct(req, res) {
    try {
        let saved = await service.saveProduct(req.body);
        console.log(`debug: ${JSON.stringify(saved)} added to db`);
        res.json(saved).status(200);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}



module.exports = {
    saveProduct,
    getProductByName,
    getProductByQuery
};