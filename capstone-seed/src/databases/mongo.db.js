'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const Product = require('../modules/model');

const logPrefix = 'MongoDB: ';

mongoose.connect('mongodb://localhost/Products', { useMongoClient: true }).catch(e => {winston.error(`${logPrefix}connection error ${e}`); process.exit(1);});

function validateName(value) {
    if (!value || value.length < 4) return false; // too short
    return true;
}

    let ProductSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        hardware: {type: Boolean, required: false},
        access: {type: Array, required: false},
        platform: {type: String, required: false},
        languages: {type: Array, required: false},
        brand: {type: String, required: false},
        price: {type: Number, required: false},
        features: {type: Array, required: false},
        id: {type: Number, required: true}
    }, {timestamps: true, autoIndex: false});
    /* first time you run on a new DB must remove the auto index to create the index*/

    let ProductModel = mongoose.model('Product', ProductSchema);

    async function getProductByName(name) {
        try {
            const product = await ProductModel.findOne({name});
            if (!product) {
                winston.debug(`${logPrefix}${name} not in db`);
                return null;
            }
            winston.debug(`${logPrefix}${name} found, returning ${JSON.stringify(product)}`);
            return Product.fromDb(product);
        } catch (e) {
            winston.error(`${logPrefix}Error during find by id ${name}: ${e}`);
            throw e;
        }
    }


async function getAllProducts() {
    try {
        let results =  await ProductModel.find({});
        return results.map(res => Product.fromDb(res));
    } catch(e) {
        throw e;
    }
}

async function saveProduct(prod) {
    try {
        const savedProd = await ProductModel.findOneAndUpdate({name: prod.name},
            prod,
            {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true});
        winston.debug(`${logPrefix}${savedProd.name} saved, returning ${JSON.stringify(savedProd)}`);
        return Product.fromDb(savedProd);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

// takes in a product json, if a certan field
// did not have a search requirement then we will
// just not include it.
async function getProductByQuery(prod) {
    try {
        var productMap = new Map();

        const hardware = prod.hardware;
        // if no hardware preference
        if (hardware !== null) {
            let hardwareProds = await ProductModel.find({hardware: {$eq: hardware}});
            // probably make this a helper method.. find out how to
            // do this, does async not make it work?
            let i;
            for (i = 0; i < hardwareProds.length; i++) {
                let currProd = hardwareProds[i];
                if (!productMap.has(currProd.id)) {
                    productMap.set(currProd.id, currProd);
                }
            }
        }
        const accessList = prod.access;
        if (accessList) {
            let i;
            for (i = 0; i < accessList.length; i++) {
                let field = accessList[i];
                let fieldProds = await ProductModel.find({access: field});
                let j;
                for (j = 0; j < fieldProds.length; j++) {
                    let currProd = fieldProds[j];
                    if (!productMap.has(currProd.id)) {
                        productMap.set(currProd.id, currProd);
                    }
                }
            }
        }
        const platformList = prod.platform;
        if (platformList) {
            let i;
            for (i = 0; i < platformList.length; i++) {
                let currPlat = platformList[i];
                let platProds = await ProductModel.find({platform: currPlat});
                let j;
                for (j = 0; j < platProds.length; j++) {
                    let currProd = platProds[j];
                    if (!productMap.has(currProd.id)) {
                        productMap.set(currProd.id, currProd);
                    }
                }
            }
        }
        const languageList = prod.languages;
        if (languageList) {
            let i;
            for (i = 0; i < languageList.length; i++) {
                let currLang = languageList[i];
                let langProds = await ProductModel.find({language: currLang});
                let j;
                for (j = 0; j < langProds.length; j++) {
                    let currProd = langProds[j];
                    if (!productMap.has(currProd.id)) {
                        productMap.set(currProd.id, currProd);
                    }
                }
            }
        }
        const minPrice = prod.minPrice;
        const maxPrice = prod.maxPrice;
        if (maxPrice !== 0) {
            let priceProds = await
                ProductModel.find({price: {$lt: maxPrice, $gte: minPrice}});
            console.log(priceProds);
            let i;
            for (i = 0; i < priceProds.length; i++) {
                let currProd = priceProds[i];
                if (!productMap.has(currProd.id)) {
                    productMap.set(currProd.id, currProd);
                }
            }
        }
        const featuresList = prod.features;
        if (featuresList) {
            let i;
            for (i = 0; i < featuresList.length; i++) {
                let currFeat = featuresList[i];
                let featProds = await ProductModel.find({features: currFeat});
                let j;
                for (j = 0; j < featProds.length; j++) {
                    let currProd = featProds[j];
                    if (!productMap.has(currProd.id)) {
                        productMap.set(currProd.id, currProd);
                    }
                }
            }
        }

        let results = [];
        //console.log(productMap);
        for (var [key, value] of productMap) {
            results.push(value);
        }
        //console.log(results);
        return results.map(res => Product.fromDb(res));
        // now to loop through and find matches
    } catch(e) {
        console.log(e);
        throw(e);
    }
}

async function deleteProduct(name){
    try {
        await ProductModel.deleteOne({name});
        console.log('deleted');
    } catch (e) {
        winston.error(`${logPrefix}Error during delete with name ${name}: ${e}`);
        throw e;
    }
}

    module.exports = {
        getProductByName,
        saveProduct,
        getProductByQuery,
        getAllProducts,
        deleteProduct
    };
