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

async function saveReview (user) {
    return await db.saveReview(user);
}

async function getProductByQuery (prod) {
    return await db.getProductByQuery(prod);
}

async function getProducts () {
    return await db.getAllProducts();
}

async function deleteProduct (name) {
    winston.debug(`${logPrefix}Got delete request for ${name}.`);
    await db.deleteProduct(name);
}

module.exports = {
    getProductByName,
    saveProduct,
    getProductByQuery,
    getProducts,
    deleteProduct,
    saveReview
};