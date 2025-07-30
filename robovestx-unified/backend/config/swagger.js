import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RoboVestX API',
      version: '1.0.0',
      description: 'API for RoboVestX Copy Trading Platform',
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:5000/api',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./backend/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
