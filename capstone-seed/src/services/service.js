const db = require('../databases/mongo.db');
const winston = require('winston');

const logPrefix = 'Service: ';

async function getProductByName (name) {
    winston.debug(`${logPrefix}Got request for ${name}.`);
    return await db.getProductByName(name);
}

async function saveProduct (user) {
    return await db.saveProduct(user);
}

async function getProductByQuery (prod) {
    return await db.getProductByQuery(prod);
}

module.exports = {getProductByName, saveProduct, getProductByQuery};