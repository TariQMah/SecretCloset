import Fastify from 'fastify'
import fastifyMysql from "@fastify/mysql"
import fastifyJwt from "@fastify/jwt";
import spottedController from './controllers/spotted.js'
import dotenv from "dotenv";


import auth from "./middleware/auth.js"
import authController from './controllers/auth.js'

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

// fastify.addHook("preHandler", auth)
fastify.register(authController, { prefix: "/auth" })

fastify.register(spottedController, { prefix: "/spotted" })


// Run the server!
try {
    await fastify.listen({ port: 3005 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

