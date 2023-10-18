import { formatDateToYYYYMMDD } from "../utils/helpers.js";

const postSchema = {
    body: {
        properties: {
            title: { type: "string" },
            date: { type: "string" },
            category: { type: "string" },
            eventName: { type: "string" },
            details: { type: "string" },
            image: { type: "string" },
            order: { type: "number" },
            isHome: { type: "string" },
            isFeature: { type: "string" },
        },
        required: ['title', "eventName", "image"]
    },
    response: {
        200: {
            success: { type: 'boolean' },
            message: { type: "string" },
            error: { type: 'string' }
        },
        400: {
            success: { type: 'boolean' },
            error: { type: 'string' }
        },
    }
}
const spottedController = (fastify, options, done) => {
    fastify.get("/", { onRequest: [fastify.authenticate] }, async (req, reply) => {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * perPage;
        const query = "SELECT * FROM spoted_main WHERE stat = 'Y' ORDER BY sno desc LIMIT ? OFFSET ?";
        const [spotted] = await fastify.mysql.execute(query, [perPage, offset]);
        const countQuery = "SELECT COUNT(*) AS total_count FROM spoted_main WHERE stat = 'Y'";
        const [totalCountResult] = await fastify.mysql.execute(countQuery);
        const total_count = totalCountResult[0].total_count;
        return { spotted: spotted, total: total_count }
    })

    fastify.post("/create", { onRequest: [fastify.authenticate], schema: postSchema }, async (req, reply) => {

        const { title, date, category, eventName, details, image, order, isHome, isFeature } = req.body;
        const insertQuery = `
        INSERT INTO spoted_main (title, date, category, event_name, details, image, ord, home, featured, stat)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Y')
    `;
        let newDate = date || new Date();
        const formattedDate = formatDateToYYYYMMDD(newDate);

        try {
            await fastify.mysql.execute(insertQuery, [title, formattedDate, category, eventName, details, image, order, isHome, isFeature]);
            return { success: true, message: "Record inserted successfully" };
        } catch (error) {

            return { success: false, error: error.message };
        }
    })
    done();
}





export default spottedController