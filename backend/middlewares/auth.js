import { User } from "../models/User.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Please include a valid Bearer token in the Authorization header',
            });
        }

        const token = authorizationHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};