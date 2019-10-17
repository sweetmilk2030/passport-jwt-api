import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Simple REST API',
      version: '1.0.0',
      description: 'Grokking Workshop - BE001',
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
