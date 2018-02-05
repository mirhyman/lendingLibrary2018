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
        features: {type: Array, required: false}
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


async function saveProduct(prod) {
    try {
        const savedProd = await ProductModel.findOneAndUpdate({name: prod.name}, prod, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true});
        winston.debug(`${logPrefix}${savedProd.name} saved, returning ${JSON.stringify(savedProd)}`);
        return Product.fromDb(savedProd);
    } catch (e) {
        console.log(e);
        throw e;
    }
}
    module.exports = {getProductByName, saveProduct};
