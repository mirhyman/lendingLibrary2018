'use strict';

const winston = require('winston');
const mongoose = require('mongoose');
const pbConfig = require('playbuzz-config');
const User = require("../models/example.model");

const logPrefix = "ExampleMongoDb: ";

mongoose.Promise = global.Promise;
mongoose.connect(pbConfig.get('mongo.url') + pbConfig.get('mongo.collection'), { useMongoClient: true }).catch(e => {winston.error(`${logPrefix}connection error ${e}`); process.exit(1);});

const validateGuidErrMessage = '{VALUE} is not a valid GUID!';
const validateGuidRegex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
const validateNameErrMessage = '{VALUE} is not a valid name for user must be at least 4 letters!';
function validateName(value) {
  if(!value || value.length < 4) return false; // too short
  return true;
}

let UserSchema = new mongoose.Schema({
  userId : { type: String, required: true, trim: true, index: true, unique: true, match: [validateGuidRegex, validateGuidErrMessage]},
  name : { type: String, required: true, trim: true, validate: {validator: validateName, message: validateNameErrMessage} }
}, {timestamps: true, autoIndex: false}); /* first time you run on a new DB must remove the auto index to create the index*/
let UserModel = mongoose.model('User', UserSchema);

async function getUser(userId){
  try {
    const user = await UserModel.findOne({userId});
    if (!user) {
      winston.debug(`${logPrefix}${userId} not in db`);
      return null;
    }
    winston.debug(`${logPrefix}${userId} found, returning ${JSON.stringify(user)}`);
    return User.fromDb(user);
  } catch (e) {
    winston.error(`${logPrefix}Error during find by id ${userId}: ${e}`);
    throw e;
  }
}

async function deleteUser(userId){
  try {
    if(userId === User.DefaultId()) {
      throw new Error('Not Allowed');
    }

    await UserModel.deleteOne({userId});
  } catch (e) {
    winston.error(`${logPrefix}Error during delete vwith id ${userId}: ${e}`);
    throw e;
  }
}

async function saveUser(user){
  try {
    if(user.userId === User.DefaultId()) {
      throw new Error('Not Allowed');
    }

    const savedUser = await UserModel.findOneAndUpdate({userId: user.userId}, user, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true});
    winston.debug(`${logPrefix}${savedUser.userId} saved, returning ${JSON.stringify(savedUser)}`);
    return User.fromDb(savedUser);
  } catch (e) {
    winston.error(`${logPrefix}Error during save ${user.userId}: ${e}`);
    throw e;
  }
}

async function findUsersByName(name){
  try {
    const results = await UserModel.find( { name : { "$regex": name, "$options": "i" } },);
    return results.map(res => User.fromDb(res));
  } catch (e) {
    winston.error(`${logPrefix}Error during find all matching (partial) name ${name}: ${e}`);
    throw e;
  }
}

const cleanup = () => {
  return mongoose.disconnect()
    .then(() => {winston.debug(`${logPrefix}closed`);})
    .catch(err => {winston.error(err);});
};

// handle graceful exit
process.on('SIGINT', () => { cleanup().then(() => process.exit(-1)); });

module.exports = {
  getUser,
  deleteUser,
  saveUser,
  findUsersByName,
  UserModel,
};