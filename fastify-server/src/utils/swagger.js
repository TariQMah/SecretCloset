export const swaggerObject = {
    routePrefix: "/documentations",
    exposeRoute: true,
    swagger: {
        info: {
            title: 'SecretCloset API',
            description: 'SecretCloset the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: '127.0.0.1:3005/',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        // tags: [
        //     { name: 'user', description: 'User related end-points' },
        //     { name: 'code', description: 'Code related end-points' }
        // ],
        definitions: {
            // User: {
            //     type: 'object',
            //     required: ['id', 'email'],
            //     properties: {
            //         id: { type: 'string', format: 'uuid' },
            //         firstName: { type: 'string' },
            //         lastName: { type: 'string' },
            //         email: { type: 'string', format: 'email' }
            //     }
            // }
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },


        }
    }
}


