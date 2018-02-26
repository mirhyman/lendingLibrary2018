
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

async function getReview(req, res) {
    let id = req.params.id;
    if(!id) {
        return res.status(400).send('Must include id');
    }
    try {
        const review = await service.getReview(id);
        if(review) {
            res.json(review).status(200);
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
    //console.log(req.query);
    let jsonProd = {
        hardware: req.query.hardware,
        access: req.query.access,
        platform: req.query.platform,
        languages: req.query.languages,
        maxPrice: maxPrice,
        minPrice: minPrice,
        features: req.query.features
    };
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

/*async function saveImage(req, res) {
    try {

        let saved = await service.saveImage(req);
        console.log(`debug: ${JSON.stringify(saved)} added to db`);
        res.json(saved).status(200);
    } catch (err) {
        console.log(req.body.id);
        //console.log(err);
        res.status(500).send(err);
    }
}*/


async function saveReview(req, res) {
    try {
        let saved = await service.saveReview(req.body);
        console.log(`debug: ${JSON.stringify(saved)} added to db`);
        res.json(saved).status(200);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getAllProducts(req, res) {
    try {
        res.json(await service.getProducts()).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
}


async function deleteProduct(req, res) {
    let name = req.params.name;
    if(!name) {
        res.status(400).send('Name must be valid');
        return;
    }
    try {
        await service.deleteProduct(name.toLowerCase());
        res.status(200).send('Sucessfully deleted!');
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getProductByText(req, res) {
    let query = req.query.query;
    console.log(query);
    if(!query) {
        return res.status(400).send('Must include id');
    }
    try {
        const review = await service.getProductByText(query);
        if(review) {
            res.json(review).status(200);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    saveProduct,
    getProductByName,
    getProductByQuery,
    getAllProducts,
    deleteProduct,
    saveReview,
    getReview,
    getProductByText
};