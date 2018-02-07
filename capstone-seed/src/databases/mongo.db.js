'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const Product = require('../modules/model');
const Review = require('../modules/reviews-model');

const logPrefix = 'MongoDB: ';

mongoose.connect('mongodb://localhost/Products', { useMongoClient: true }).catch(e => {winston.error(`${logPrefix}connection error ${e}`); process.exit(1);});

function validateName(value) {
    if (!value || value.length < 4) return false; // too short
    return true;
}

    let ReviewSchema = new mongoose.Schema({
        id: {type: Number, required: true},
        title: {type: String, required: true},
        tags: {type: Array, required: false},
        body: {type: String, required: true},
        context: {type: String, required: false},
        author: {type: String, required: false}
    });

    let ReviewModel = mongoose.model('Review', ReviewSchema);

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
        platform: {type: Array, required: false},
        languages: {type: Array, required: false},
        brand: {type: String, required: false},
        price: {type: Number, required: false},
        features: {type: Array, required: false},
        id: {type: Number, required: true},
        img: {type: String, required: false}
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

async function saveReview(rev) {
    try {
        const savedRev = await ReviewModel.findOneAndUpdate({id: rev.id},
            rev,
            {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true});
        winston.debug(`${logPrefix}${savedRev.title} saved, returning ${JSON.stringify(savedRev)}`);
        return Product.fromDb(savedRev);
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

                let langProds = await ProductModel.find({languages: currLang});
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

        var result = [];
        // calculate scores
        console.log(productMap);
        for (var curProd of productMap.values()) {
            var curScore = 0;
            // hardware
            if (hardware !== null && prod.hardware === curProd.hardware) {
                curScore += 3;
            }
            // acccess
            //console.log(curProd.access);
            if (prod.access) {
                //console.log('got into access');
                for (var curAccess of curProd.access) {
                    if (prod.access.includes(curAccess)) {
                        curScore += 5;
                    }
                }
            }
            // platform
            //console.log(curProd.platform);
            if (prod.platform) {
                //console.log('got into platform');
                for (var curPlat of curProd.platform) {
                    if (prod.platform.includes(curPlat)) {
                        curScore += 1;
                    }
                }
            }
            // language
            if (prod.languages) {
                for (var curLang of curProd.languages) {
                    if (prod.languages.includes(curLang)) {
                        curScore += 1;
                    }
                }
            }
            // price
            if (prod.minPrice <= curProd.price && prod.maxPrice > curProd.price) {
                curScore += 2;
            }
            if (prod.features) {
                for (var curFeat of curProd.features) {
                    if (prod.features.includes(curFeat)) {
                        curScore += 1;
                    }
                }
            }
            result.push({product: curProd, score: curScore});
        }
        // order resulting array by descending score
        result.sort(function(a, b) {
            return b.score - a.score;
        });

        var results = [];
        for (let i = 0; i< result.length; i++) {
            results.push(result[i].product);
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
        deleteProduct,
        saveReview
    };