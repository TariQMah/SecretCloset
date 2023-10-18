const auth = async (request, reply) => {
    const apiKey = request.headers['authorization'];
    const secretKey = process.env.SECRETKEY;

    if (!apiKey || !secretKey) {
        return reply.code(401).send({ error: 'Unknown user' });
    }

    const token = request.headers['authorization'];
    let decoded;

    try {
        decoded = request.jwtVerify();
        console.log('decoded: ', decoded);
    } catch (error) {
        return reply.code(401).send({ error: 'Unauthorized' });
    }
}

export default auth