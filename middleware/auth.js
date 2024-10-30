const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Token not provided');
    }

    token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnauthenticatedError(error);
    }
}



module.exports = authenticationMiddleware;