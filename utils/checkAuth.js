import { check } from 'express-validator';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: "No Dostup",
            });
        }

    } else {
        return res.status(404).json({
            message: "Not available",
        });
    }

}