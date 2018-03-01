const winston = require('winston');
const uuid = require('uuid/v4');

const User = require('../models/example.model');
const db = require('../databases/mongo.db');

const logPrefix = 'ExampleService: ';

async function getUser (userId) {
    winston.debug(`${logPrefix}Got request for ${userId}.`);
    return await db.getUser(userId);
}

async function deleteUser (userId) {
    winston.debug(`${logPrefix}Got delete request for ${userId}.`);
    await db.deleteUser(userId);
}

async function saveUser (user) {
    if(!user.userId) {
        user.userId = uuid();
    }
    winston.debug(`${logPrefix}Going to save request ${user.userId}.`);
    return await db.saveUser(user);
}

async function findUsers (name) {
    winston.debug(`${logPrefix}Find all with (partial) ${name}.`);
    return await db.findUsersByName(name);
}

module.exports = {
    getUser,
    deleteUser,
    saveUser,
    findUsers
};
