'use strict';

const {describe, it, afterEach} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');
const {Mockgoose} = require('mockgoose');
const mockgoose = new Mockgoose(mongoose);
const {createMockExpress} = require('../support/fakeExpress');

const pbConfig = require("playbuzz-config");
pbConfig.load('config/config.yml', process.env.NODE_ENV);

let exampleService = require('../../src/services/example.service');
let exampleController = require('../../src/controllers/example.controller');
// Test the example service level
let User = require('../../src/models/example.model');

const userId = '00000000-0000-0000-0000-000000000001';
const name = 'Noam Berg';
const user = new User(userId, name);

let sandbox = sinon.createSandbox();
describe('Testing example.controller', function() {

  describe('Testing - GET:/users/{userId} - Get User by ID', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with normal item', async function () {
      // prepare
      let exampleServiceMock = sandbox.mock(exampleService);
      exampleServiceMock.expects("getUser").once().withArgs(userId).resolves(user);
      exampleServiceMock.expects("deleteUser").never();
      exampleServiceMock.expects("saveUser").never();
      exampleServiceMock.expects("findUsers").never();
      const request = {
        params: {
          userId: userId
        }
      };
      const fakeExpress = createMockExpress(request);
      // call
      await exampleController.getUser(fakeExpress.request, fakeExpress.response);
      // verify
      exampleServiceMock.verify(); 
      chai.assert(fakeExpress.response.status.calledWith(200));
      chai.assert(fakeExpress.response.json.calledWith(user));
    });


    it('should return 200 with upper case item', async function () {
    });

    it('should return 404 when item not found', async function () {
      // prepare
      let exampleServiceMock = sandbox.mock(exampleService);
      exampleServiceMock.expects("getUser").once().withArgs(userId).resolves(undefined);
      exampleServiceMock.expects("deleteUser").never();
      exampleServiceMock.expects("saveUser").never();
      exampleServiceMock.expects("findUsers").never();
      const request = {
        params: {
          userId: userId
        }
      };
      const fakeExpress = createMockExpress(request);
      // call
      await exampleController.getUser(fakeExpress.request, fakeExpress.response);
      // verify
      exampleServiceMock.verify();
      chai.assert(fakeExpress.response.status.calledWith(404));
    });

    it('should return 400 when user id not guid', async function () {
      // prepare
      let exampleServiceMock = sandbox.mock(exampleService);
      exampleServiceMock.expects("getUser").never();
      exampleServiceMock.expects("deleteUser").never();
      exampleServiceMock.expects("saveUser").never();
      exampleServiceMock.expects("findUsers").never();
      const request = {
        params: {
          userId: 'stam'
        }
      };
      const fakeExpress = createMockExpress(request);
      // call
      await exampleController.getUser(fakeExpress.request, fakeExpress.response);
      // verify
      exampleServiceMock.verify();
      chai.assert(fakeExpress.response.status.calledWith(400));
    });

    it('should return 500 when internal fails', async function () {
      // prepare
      let exampleServiceMock = sandbox.mock(exampleService);
      exampleServiceMock.expects("getUser").once().withArgs(userId).rejects();
      exampleServiceMock.expects("deleteUser").never();
      exampleServiceMock.expects("saveUser").never();
      exampleServiceMock.expects("findUsers").never();
      const request = {
        params: {
          userId: userId
        }
      };
      const fakeExpress = createMockExpress(request);
      // call
      await exampleController.getUser(fakeExpress.request, fakeExpress.response);
      // verify
      exampleServiceMock.verify();
      chai.assert(fakeExpress.response.status.calledWith(500));

    });
  });

  describe('Testing - DELETE:/users/{userId} - Delete User by ID', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with normal item', async function () {
    });

    it('should return 200 with uppercase item', async function () {
    });

    it('should return 400 with bad guid item', async function () {
    });

    it('should return 500 with internal error', async function () {
    });
  });

  describe('Testing - POST:/users - Save User', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with normal item', async function () {
    });

    it('should return 200 with uppercase item', async function () {
    });

    it('should return 500 with internal error', async function () {
    });
  });

  describe('Testing - GET:/users?name={name} - Find ALL users matching partial name', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with regular name', async function () {
    });
    
    it('should return 200 with upper case name', async function () {
    });

    it('should return 400 when name too short', async function () {
    });

    it('should return 400 when name not found', async function () {
    });

    it('should return 500 when internal fails', async function () {
    });
  });
  
});
