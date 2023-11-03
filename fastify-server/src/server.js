import Fastify from 'fastify'
import fastifyMysql from "@fastify/mysql"
import multipart from '@fastify/multipart'

import fastifyJwt from "@fastify/jwt";
import fastifySwagger from '@fastify/swagger'
import fastifyPlugins from './utils/plugin.js'
import spottedController from './controllers/spotted.js'
import dotenv from "dotenv";
import cors from '@fastify/cors'





import { swaggerObject } from './utils/swagger.js';

import authController from './controllers/auth.js'
import designerController from './controllers/designer.js';

dotenv.config();
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "src/config.env" });
}





const fastify = Fastify({
    logger: true
})
fastify.register(fastifyJwt, {
    secret: process.env.SECRETKEY,
})

fastify.register(multipart)
fastify.register(fastifySwagger, swaggerObject)


await fastify.register(cors, {
    origin: "*",
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
})


fastify.register(fastifyPlugins)

fastify.decorate("authenticate", async (req, reply) => {
    try {
        await req.jwtVerify()
    } catch (error) {
        reply.send({ message: error })
    }
})

fastify.register(fastifyMysql, {
    host: 'localhost',
    user: "root",
    password: "",
    database: "secretcloset_db",
    promise: true
})
fastify.register(authController, { prefix: "api/v1/auth" })
fastify.register(spottedController, { prefix: "api/v1/spotted" })
fastify.register(designerController, { prefix: "api/v1/designer" })


// Run the server!
try {
    await fastify.listen({ port: 3005 })

    fastify.fastifySwagger
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

