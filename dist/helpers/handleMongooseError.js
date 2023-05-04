"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseError = void 0;
const handleMongooseError = (error, data, next) => {
    const err = error;
    err.status = 400;
    next();
};
exports.handleMongooseError = handleMongooseError;
