
var service = require('../services/service.js');

async function getProduct(req, res) {
    let name = req.params.name;
    if(!name) {
        return res.status(400).send('Must include name');
    }
    try {
        const product = await service.getProduct(name.toLowerCase());
        if(product) {
            res.serverOk(product);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (err) {
        res.serverError(500, err);
    }
}


async function saveProduct(req, res) {
    try {
        let saved = await service.saveProduct(req.body);
        console.log(`debug: ${JSON.stringify(saved)} added to db`);
        res.json(saved).status(200);
    } catch (err) {
        res.serverError(500, err);
    }
}

module.exports = {
    saveProduct,
    getProduct
};