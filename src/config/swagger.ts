import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import packageJson from '../../package.json' assert { type: 'json' };
import logger from '@config/logger.js';
import config from '@config/config.js';

const swaggerJsdocOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: `${config.appName} docs`,
            version: packageJson.version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['src/api/routes/**/*.ts', 'src/validations/**/*.ts', 'src/repositories/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerJsdocOptions);

function swaggerDocs(app: Express, port: number) {
    // swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // docs in json format
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
