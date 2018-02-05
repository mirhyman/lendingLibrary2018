
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
    let minPrice = req.params.minPrice;
    let maxPrice = req.params.maxPrice;
    if (!minPrice) {
        maxPrice = 0;
        minPrice = 0;
    }
    console.log(req.params.query);
    let jsonProd = {
        hardware: req.params.hardware,
        access: req.params.access,
        platform: req.params.platform,
        languages: req.params.languages,
        maxPrice: maxPrice,
        minPrice: minPrice,
        features: req.params.features
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