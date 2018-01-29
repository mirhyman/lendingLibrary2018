const db = require('../databases/mongo.db');
const winston = require('winston');

async function getProduct (name) {
    winston.debug(`${logPrefix}Got request for ${name}.`);
    return await db.getProduct(name);
}

async function saveProduct (user) {
    return await db.saveProduct(user);
}

module.exports = {getProduct, saveProduct};