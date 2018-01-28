/**
 * Created by Noamb on 25-May-17.
 */
const swaggerJSDoc = require('swagger-jsdoc');
swagger = require('swagger-tools');

module.exports = function (app, callback) {
  // def
  if (process.env.NODE_ENV !== 'production') {
    let serviceName = require(__dirname + '/../package.json').name;
    let serviceVersion = require(__dirname + '/../package.json').version;

    // define
    let swaggerDefinition = {
      info: {
        title: serviceName,
        version: serviceVersion,
        description: `Package Name : ${serviceName}</br>Description`,
      },
      basePath: '/',
    };

    // initialize 
    let swaggerSpec = swaggerJSDoc({
      swaggerDefinition: swaggerDefinition,
      apis: ['./src/routers/*.js'],
    });

    const swaggerDoc = swaggerSpec;

    // route to serve swagger
    app.get('/swagger.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    swagger.initializeMiddleware(swaggerDoc, function (middleware) {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain		 +require('./config/swagger')(app);
      app.use(middleware.swaggerMetadata());
      // Validate Swagger requests		
      app.use(middleware.swaggerValidator());
      
      callback();
    })
  } else {
    callback();
  }
};