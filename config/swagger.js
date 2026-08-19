const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "DevHub API",
            version: "1.0.0",
            description: "Project management API with JWT authentication"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;