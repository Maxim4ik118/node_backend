"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const validateObjectId = (req, res, next) => {
    const { bookId } = req.params;
    const isValidId = (0, mongoose_1.isValidObjectId)(bookId);
    if (!isValidId) {
        next((0, helpers_1.HttpError)(400, `${bookId} isn't valid id!`));
    }
    next();
};
exports.validateObjectId = validateObjectId;
