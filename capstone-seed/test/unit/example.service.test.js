'use strict';

const {describe, it, afterEach} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const mock = require('mock-require');
const mongoose = require('mongoose');
const {Mockgoose} = require('mockgoose');
new Mockgoose(mongoose);

const pbConfig = require("playbuzz-config");
pbConfig.load('config/config.yml', process.env.NODE_ENV);

let mongoService = require('../../src/databases/mongo.db');
let exampleService = require('../../src/services/example.service');
let User = require('../../src/models/example.model');

const userId = '00000000-0000-0000-0000-000000000001';
const name = 'Noam Berg';
const user = new User(userId, name);

let sandbox = sinon.createSandbox();
describe('Testing example.service', function() {
  describe('Testing Get User', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to get "real" item - simple version (stub one func)', function () {
      // prepare
      sandbox.stub(mongoService, 'getUser').callsFake(() => { return Promise.resolve(user); });
      // call
      return exampleService.getUser(userId).then((result) => {
        // verify
        sinon.assert.calledOnce(mongoService.getUser);
        sinon.assert.calledWith(mongoService.getUser, userId);
        chai.assert.deepEqual(result, user, "Not equal");
      });
    });

    it('should succeed to get "real" item - complex version (mock object)', function () {
      // prepare
      let mongoServiceMock = sandbox.mock(mongoService);
      mongoServiceMock.expects("getUser").once().withArgs(userId).resolves(user);
      mongoServiceMock.expects("deleteUser").never();
      mongoServiceMock.expects("saveUser").never();
      mongoServiceMock.expects("findUsersByName").never();
      // call
      return exampleService.getUser(userId).then((result) => {
        // verify
        mongoServiceMock.verify();
        chai.assert.deepEqual(result, user, "Not equal");
      });
    });

    it('should return null for no item', function () {
      // prepare
      let mongoServiceMock = sandbox.mock(mongoService);
      mongoServiceMock.expects("getUser").once().withArgs(userId).resolves(null);
      mongoServiceMock.expects("deleteUser").never();
      mongoServiceMock.expects("saveUser").never();
      mongoServiceMock.expects("findUsersByName").never();
      // call
      return exampleService.getUser(userId).then((result) => {
        // verify
        mongoServiceMock.verify();
        chai.assert.deepEqual(result, null, "Not equal");
      });
    });
  });

  describe('Testing Delete User', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to delete "real" item ', function () {
    });
    
    it('Should fail to delete default ID item', function () {
    });
  });

  describe('Testing Save User', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to save "real" item (return it back)', function () {
    });

    it('Should succeed to create "real" item when no user Id supplied', function () {
    });

    it('Should succeed to create "real" item when no default user Id supplied', function () {
    });
  });

  describe('Testing Find Users', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to find ', function () {
      // prepare
      let mongoServiceMock = sandbox.mock(mongoService);
      mongoServiceMock.expects("getUser").never();
      mongoServiceMock.expects("deleteUser").never();
      mongoServiceMock.expects("saveUser").never();
      mongoServiceMock.expects("findUsersByName").once().withArgs(name).resolves([user]);
      // call
      return exampleService.findUsers(name).then((result) => {
        // verify
        mongoServiceMock.verify();
        chai.assert.deepEqual(result, [user], "Not equal");
      });
    });
  });


});

mock.stopAll();