import { JWT_SECRET } from "./config.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const authMiddleware = (req,res,next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        res.status(403).json({
            msg: "Invalid Token"
        })
    }

    const token = authToken.split(' ')[1];

    try {
        const decode = verify(token, JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch (err) {

        return res.status(403).json({
            msg: "Some error occured in backend"
        })
    }
}
