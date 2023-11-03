




const postSchema = {
    consumes: ['application/x-www-form-urlencoded', 'multipart/form-data'],

    body: {

        properties: {
            title: { type: "string" },
            date: { type: "string" },
            category: { type: "string" },
            eventName: { type: "string" },
            details: { type: "string" },
            image: { type: "object" },
            order: { type: "number" },
            isHome: { type: "string" },
            isFeature: { type: "string" },
        },
        required: ['title', "eventName", "image"]
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                error: { type: "string" },
            }
        },

    },
}
const spottedController = (fastify, options, done) => {


    fastify.get("/", { onRequest: [fastify.authenticate] }, async (req, reply) => {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * perPage;

        let query = "SELECT * FROM spoted_main WHERE stat = 'Y'";
        let countQuery = "SELECT COUNT(*) AS total_count FROM spoted_main WHERE stat = 'Y'";

        // if (req.query.search) {
        //     query += ` AND title LIKE ?`;
        //     countQuery += ` AND title LIKE ?`
        // }

        if (req.query.sort) {
            const sortParams = JSON.parse(req.query.sort);

            if (sortParams.field && sortParams.sort) {
                query += ` ORDER BY ${sortParams.field} ${sortParams.sort}`;
                console.log('query:2222 ', query);
                countQuery += ` ORDER BY ${sortParams.field} ${sortParams.sort}`;
            }
        }

        query += " LIMIT ? OFFSET ?";

        console.log('query: ', query);
        console.log('query: ', query);
        const [spotted] = await fastify.mysql.execute(query, [perPage, offset]);

        const [totalCountResult] = await fastify.mysql.execute(countQuery);
        const total_count = totalCountResult[0].total_count;

        return { spotted, total: total_count };
    })



    fastify.get("/getCategories", { onRequest: [fastify.authenticate] }, async (req, reply) => {

        let query = "SELECT * FROM spoted_categories WHERE stat = 'Y'";
        const [categories] = await fastify.mysql.execute(query);
        return { categories };
    })

    // fastify.post("/create", { onRequest: [fastify.authenticate], schema: postSchema, }, async (req, reply) => {
    //     console.log('req: ', req);

    //     const { title, date, category, eventName, details, image, order, isHome, isFeature } = req.body;
    //     const parts = req.files()
    //     console.log('parts: ', parts);

    //     const uploaded = fastify.uploadFileDecorator(parts);



    //     const insertQuery = `
    //     INSERT INTO spoted_main (title, date, category, event_name, details, image, ord, home, featured, stat)
    //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Y')
    // `;


    //     let newDate = date || new Date();
    //     const formattedDate = fastify.formatDateToYYYYMMDD(newDate);

    //     try {
    //         await fastify.mysql.execute(insertQuery, [title, formattedDate, category, eventName, details, image, order, isHome, isFeature]);
    //         return { success: true, message: "Record inserted successfully" };
    //     } catch (error) {

    //         return { success: false, error: error.message };
    //     }
    // })



    fastify.post("/create", { onRequest: [fastify.authenticate], schema: postSchema, }, async (req, reply) => {

        console.log('req.body: ', req.body);
        const { title, date, category, eventName, details, order, image, isHome, isFeature } = req.body;
        const parts = req.files();
        console.log('parts: ', parts);

        // Assuming that 'cover' is the name of the file input in your form
        const cover = parts.cover;

        //const uploaded = fastify.uploadFilesTodirectory(parts);

        // need to setup file upload functionality ---  image,

        const insertQuery = `
        INSERT INTO spoted_main (title, date, category, event_name, details, ord, home, featured, stat,image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;

        let newDate = date || new Date();
        const formattedDate = fastify.formatDateToYYYYMMDD(newDate);
        console.log('[title, formattedDate, `${category}`, eventName, details, order, isHome, isFeature, isFeature, image.name]: ', [title, formattedDate, `${category}`, eventName, details, order, isHome, isFeature, isFeature, image.name]);
        try {
            // Use 'cover' to access the uploaded file
            await fastify.mysql.execute(insertQuery, [title, formattedDate, `${category}`, eventName, details, order, isHome, isFeature, isFeature, image.name]);
            return { success: true, message: "Record inserted successfully" };
        } catch (error) {
            console.log('error: ', error);
            return { success: false, error: error.message };
        }
    })


    done();
}





export default spottedController