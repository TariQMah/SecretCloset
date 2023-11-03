
const postSchema = {
    body: {
        type: "object",
        properties: {
            logo: { type: "string" },
            profileImage: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            phone: { type: "string" },
            email: { type: "string" },
            address: { type: "string" },
            facebook: { type: "string" },
            instagram: { type: "string" },
            website: { type: "string" },
            categories: { type: "string" },
            feature: { type: "string" },
            twitter: { type: "string" },
            stat: { type: "string" },
            latest: { type: "string" },

        },
        required: ["title", "logo", "description", "latest", "stat", "feature", "profileImage"],
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
};
const designerController = (fastify, options, done) => {
    fastify.get(
        "/",
        { onRequest: [fastify.authenticate] },
        async (req, reply) => {
            const perPage = req.query.perPage || 10;
            const page = req.query.page || 1;
            const offset = (page - 1) * perPage;

            let query = `SELECT designer.*, GROUP_CONCAT(categories.category) AS category_names FROM designer LEFT JOIN categories ON FIND_IN_SET(categories.sno, designer.category) > 0 WHERE designer.stat ='Y' GROUP BY designer.sno`;
            let countQuery =
                "SELECT COUNT(*) AS total_count FROM designer WHERE stat = 'Y'";

            // if (req.query.search) {
            //     query += ` AND title LIKE ?`;
            //     countQuery += ` AND title LIKE ?`
            // }

            if (req.query.sort) {
                const sortParams = JSON.parse(req.query.sort);

                if (sortParams.field && sortParams.sort) {
                    query += ` ORDER BY ${sortParams.field} ${sortParams.sort}`;
                    countQuery += ` ORDER BY ${sortParams.field} ${sortParams.sort}`;
                }
            }




            query += " LIMIT ? OFFSET ?";

            const [designer] = await fastify.mysql.execute(query, [perPage, offset]);

            const [totalCountResult] = await fastify.mysql.execute(countQuery);
            const total_count = totalCountResult[0].total_count;

            return { designer, total: total_count };
        }
    );

    fastify.post(
        "/create",
        { onRequest: [fastify.authenticate], schema: postSchema },
        async (req, reply) => {
            const {
                logo,
                profileImage,
                title,
                description,
                phone,
                email,
                address,
                facebook,
                instagram,
                feature,
                categories,
                latest,
                stat,
                date,
                twitter
            } = req.body;
            //need to implement thumb thumb
            const insertQuery = `
            INSERT INTO designer
            (image, logo, f_image, full_name, contents, summary, category, featured, latest, email, fb, twitter, phone, address, stat, date, facebook, insta)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            let newDate = date || new Date();
            const formattedDate = fastify.formatDateToYYYYMMDD(newDate);

            try {
                await fastify.mysql.execute(insertQuery, [
                    profileImage || "",
                    logo || "",
                    0,
                    title || "",
                    description || "",
                    description || "",
                    categories || "",
                    feature || "",
                    latest || "",
                    email || "",
                    facebook || "",
                    twitter || "",
                    phone || "",
                    address || "",
                    stat || "",
                    formattedDate || "",
                    facebook || "",
                    instagram || "",
                ]);

                reply.send({ success: true, message: "Record inserted successfully" });

                //return { success: true, message: "Record inserted successfully" };
            } catch (error) {
                console.log('error: ', error);
                return { success: false, error: error.message };
            }
        }
    );
    done();
};

export default designerController;
