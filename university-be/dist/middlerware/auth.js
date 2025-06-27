"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log("token:", token);
    //Check if token is received or not
    if (!token) {
        res.status(401).json({ message: 'Unauthorized! Access denied' });
        return;
    }
    try {
        //verified token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send({ message: 'Invalid token' });
        return;
    }
};
exports.authenticateJWT = authenticateJWT;
