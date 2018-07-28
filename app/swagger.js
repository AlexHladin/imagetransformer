const swaggerJSDoc = require('swagger-jsdoc');

module.exports = app => {
  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'Image transformer API',
      version: '1.0.0',
      description: 'Image transformer API'
    },
    host: 'localhost:3000',
    basePath: '/'
  };

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: [ './**/routes/*.js', 'index.js' ]
  };

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
