Playbuzz Node.js Seed
=============================================

Purpose
------------
This seed project is meant to serve as a starting point for creating micro-services.

It contains all the common stuff you will need in order to start building a new micro-service and deploying it.

What it contains
---------------------

* Uses [playbuzz-express](https://github.com/playbuzz/pb-express) to handle express configuration
* Uses [playbuzz-logs](https://github.com/playbuzz/pb-logs) to handle logs configuration
* Uses [playbuzz-config](https://github.com/playbuzz/pb-config) to handle configuration
* Uses [playbuzz-auth](https://github.com/playbuzz/pb-authentication) to handle authentication and authorization
* Tools for creating and running tests and coverage reports, [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [sinon](http://sinonjs.org/) and [istanbul](https://gotwarlost.github.io/istanbul/).


How to start?
----------------------------------------------------
* Create a new repository in github
* Download as a zip the seed
* Change in package.json the name to this micro-service name


Setting up a new development environment
----------------------------------------------------
Run

    npm install

* Change in WebStorm to support ES6 (settings > Language & Frameworks > Javascript > select ECMAScript 6)

Run

    npm start

Testing it works
----------------------------------------------------
In *src* folder you can see an example API, after running it you can run postman and test it.

Go to *src/routes/example.routes.js* to see possible API request.

Debugging
----------------------------------------------------
If you want to debug micro-service you can do it in two ways:
1) Configure a run/debug configuration with WebStorm, that will allow you to run a single process and debug
2) You can run npm run pm2, it will run the service with multiple process. To debug go to run/debug configuration and configure remote debugger on port 5859

Common Libraries
---------------------------
* For promise control flow use: [async](https://github.com/caolan/async)
* For javascript utility library: [lodash](https://lodash.com/)
* To issue an http / https use request-promise: [request-promise](https://github.com/request/request-promise)
    * In the future it be available in [playbuzz-express](https://github.com/playbuzz/pb-express)
* To handle time and date features use: [moment](http://momentjs.com/)
* For mssql library use: [seriate](https://github.com/LeanKit-Labs/seriate)

Tests
---------------------------------------
Example can be found in test\unit folder
Run

    npm run test

Docker
---------------------------------------
Will be explained once completed.

Swagger
---------------------------------------
[API documentation](http://localhost:8081/api-docs/)  is generated based on route annotation, see *.route.js files.

Swagger can automaticalliy validate requests if the following code is included in app.js:

    app.use(middleware.swaggerValidator());


See examples here: [Swagger and Node.js](http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.WSgCjWh96Um)

