'use strict';
const {mockReq, mockRes} = require('sinon-express-mock');

function createMockExpress(req) {
  let fakeExpress = {
    response : mockRes(),
    request : mockReq(req)
  };
  require('playbuzz-express/enhance')(fakeExpress); // generate the serverOk and serverError function for response that are used in controllers
  return fakeExpress;
}

module.exports = {
  createMockExpress
};
