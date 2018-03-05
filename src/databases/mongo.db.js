'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const Product = require('../modules/model');
const Review = require('../modules/reviews-model');
const Image = require('../modules/image');
const fs = require('fs');


const logPrefix = 'MongoDB: ';

var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/Products';

mongoose.connect(mongoDB, { useMongoClient: true }).catch(e => {winston.error(`${logPrefix}connection error ${e}`); process.exit(1);});

function validateName(value) {
    if (!value || value.length < 4) return false; // too short
    return true;
}

    let ReviewSchema = new mongoose.Schema({
        id: {type: Number, required: true},
        reviews: {type: Array, required: true}
    });

let PicSchema = new mongoose.Schema(
    {image:
        {data: Buffer, contentType: String},
    id: {type: Number, required: false}}
);

let PicModel = mongoose.model('Image', PicSchema);

    ReviewSchema.set('autoIndex', false);
    ReviewSchema.index({"$**": "text"}, {"background": false});
    let ReviewModel = mongoose.model('Review', ReviewSchema);
    ReviewModel.ensureIndexes(function (err) {
        if (err) return handleError(err);
    });

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
        img: {type: String, required: false},
        professional: {type: Boolean, required: true},
        badges: {type: Array, required: true},
        spec: {type: Array, requried: true},
        description: {type: String, required: true},
        longDescription: {type: Array, required: true},
        other: {type: Array, required: false},
        purchase: {type: Array, required: false},
        support: {type:Array, required: false},
        contactPhone: {type: Array, required: false},
        //setup: {type:Array, required: false},
        //use: {type:Array, required: false},
        training: {type: Array, required: false},
        contactEmail: {type:Array, required:false},
        contactLink: {type: Array, required:false},
        trainContext: {type:String, required:false}

    }, {timestamps: true, autoIndex: false});
    /* first time you run on a new DB must remove the auto index to create the index*/
    ProductSchema.set('autoIndex', false);
    ProductSchema.index({"$**": "text"}, {"background": false});
    let ProductModel = mongoose.model('Product', ProductSchema);
    ProductModel.ensureIndexes(function (err) {
        if (err) return handleError(err);
    });


    async function getProductByName(name) {
        try {
            //prod.name = prod.name.toLowerCase();
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
            let results = await ProductModel.find({});
            return results.map(res => Product.fromDb(res));
        } catch (e) {
            throw e;
        }
    }

    async function saveProduct(prod) {
        try {
            let prodName = prod.name.toLowerCase();
            const savedProd = await ProductModel.findOneAndUpdate({name: prodName},
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
                {$push: {reviews: {rev}}},
                {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true});
            winston.debug(`${logPrefix}${savedRev.title} saved, returning ${JSON.stringify(savedRev)}`);
            return Review.fromDb(savedRev);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

async function saveImage(img) {
    try {
        let newPic = new PicModel();
        newPic.image.data = fs.readFileSync(img.files.userPhoto.path);
        newPic.image.contentType = 'image/png';
        const savedImg = await PicModel.findOneAndUpdate({id: rev.id},
            newPic);
        //winston.debug(`${logPrefix}${savedRev.title} saved, returning ${JSON.stringify(savedRev)}`);
        return Image.fromDb(savedImg);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

    async function getReviewById(id) {
        try {
            const review = await ReviewModel.findOne({id});
            if (!review) {
                winston.debug(`${logPrefix}${id} not in db`);
                return null;
            }
            winston.debug(`${logPrefix}${id} found, returning ${JSON.stringify(review)}`);
            return Review.fromDb(review);
        } catch (e) {
            winston.error(`${logPrefix}Error during find by id ${id}: ${e}`);
            throw e;
        }
    }

// takes in a product json, if a certan field
// did not have a search requirement then we will
// just not include it.
    async function getProductByAccess(access) {
    try {
        let fieldProds = await ProductModel.find({access: access});
        return fieldProds.map(res => Product.fromDb(res));

    } catch (e) {
        console.log(e);
        throw(e);
    }
}

async function getProductByQuery(prod) {
    try {
        var productMap = new Map();
        //prod.name = prod.name.toLowerCase();
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
        result.sort(function (a, b) {
            return b.score - a.score;
        });

        var results = [];
        for (let i = 0; i < result.length; i++) {
            results.push(result[i].product);
        }

        //console.log(results);
        return results.map(res => Product.fromDb(res));

    } catch (e) {
        console.log(e);
        throw(e);
    }
}

    async function getProductByText(searchString) {
        try {
            let results = [];
            // check for text matches on product entries

            let prodMatches = await ProductModel.find(
                {$text: {$search: searchString}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}});
            for (let i = 0; i < prodMatches.length; i++) {
                let curProd = prodMatches[i];
                results.push(curProd);
            }
            let reviewMatches = await ReviewModel.find(
                {$text: {$search: searchString}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}});
            for (let i = 0; i < reviewMatches.length; i++) {
                // get product associated with review
                let curReview = reviewMatches[i];
                let curProd = await ProductModel.findOne({id: curReview.id});
                results.push(curProd);
            }
            // results now has products sorted by best match with matches by product description above matches by reviews
            // need to remove duplicates still
            let duplicates = new Map();
            let toRemove = [];
            for (let i = 0; i < results.length; i++) {
                if (duplicates.has(results[i].id)) {
                    toRemove.push(i);
                } else {
                    duplicates.set(results[i].id, results[i]);
                }
            }

            for (let i = 0; i < toRemove.length; i++) {
                let removeIndex = toRemove[i] - i;
                results.splice(removeIndex, removeIndex + 1);
            }
            return results.map(res => Product.fromDb(res));
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }


    async function deleteProduct(name) {
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
        saveReview,
        getReviewById,
        getProductByText,
        saveImage,
        getProductByAccess
    };

