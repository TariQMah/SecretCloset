import { formatDateToYYYYMMDD } from "../utils/helpers.js";
import bcrypt from "bcrypt"

import { format, compareAsc } from 'date-fns'

const postLogin = {
    body: {
        properties: {
            user: { type: "string" },
            password: { type: "string" },
        },
        required: ['user', "password"]
    },
    response: {
        200: {
            success: { type: 'boolean' },
            message: { type: "string" },
            error: { type: 'string' },
            token: { type: 'string' }
        },
        400: {
            success: { type: 'boolean' },
            error: { type: 'string' }
        },
    }
}

const postRegister = {
    body: {
        properties: {
            user: { type: "string" },
            password: { type: "string" },
            full_name: { type: "string" }
        },
        required: ['user', 'password'],
    },
    response: {
        201: {
            success: { type: 'boolean' },
            message: { type: 'string' },

        },
        400: {
            success: { type: 'boolean' },
            message: { type: 'string' },
        },
    },
};


const authController = (fastify, options, done) => {
    fastify.post("/login", { schema: postLogin }, async (req, reply) => {
        const { user, password } = req.body;

        const query = "SELECT * FROM cmsadmin WHERE user = ?";
        const [isUser] = await fastify.mysql.execute(query, [user]);

        if (isUser.length > 0) {
            const passwordHash = isUser[0].pass;
            const isPasswordMatch = await bcrypt.compare(password, passwordHash);

            if (isPasswordMatch) {

                const token = fastify.jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '2h' });
                const query = "update cmsadmin SET ses = ?, dtime = ? WHERE id = ?";
                const lastLogin = format(new Date(), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'UTC' })
                await fastify.mysql.execute(query, [token, lastLogin, isUser[0]?.id]);
                return { success: true, message: "Login successful", token };
            } else {
                return { success: false, message: "Incorrect password" };
            }
        } else {
            return { success: false, message: "User not found" };
        }
    });


    fastify.post("/register", { schema: postRegister }, async (req, reply) => {
        const { user, password, full_name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = "INSERT INTO cmsadmin (user, pass,full_name) VALUES (?, ?, ?)";
        try {
            await fastify.mysql.execute(insertQuery, [user, hashedPassword, full_name]);

            return { success: true, message: "User registered successfully" };
        } catch (error) {
            return { success: false, message: "Registration failed", error: error.message };
        }
    });


    done();
};




export default authController