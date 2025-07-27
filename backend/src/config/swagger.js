const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RoboVestX API',
      version: '1.0.0',
      description: 'API documentation for the RoboVestX platform.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/api/routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;
