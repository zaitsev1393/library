// generate-openapi.js
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('js-yaml');

const spec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'Books API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./apps/api/src/main.ts'],
});

fs.writeFileSync('schemas/openapi.yaml', YAML.dump(spec));
