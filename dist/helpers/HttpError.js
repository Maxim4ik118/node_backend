"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.HttpError = HttpError;
