"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookGenre = exports.schemas = exports.Book = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const joi_1 = __importDefault(require("joi"));
var BookGenre;
(function (BookGenre) {
    BookGenre["fantastic"] = "fantastic";
    BookGenre["love"] = "love";
    BookGenre["thriller"] = "thriller";
})(BookGenre || (BookGenre = {}));
exports.BookGenre = BookGenre;
// type BookGenres = "fantastic" | "love" | "thriller";
const dateRegExp = /^\d{2}-\d{2}-\d{4}$/;
const bookGenres = [
    BookGenre.fantastic,
    BookGenre.love,
    BookGenre.thriller,
];
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favourite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        required: true,
        enum: bookGenres,
    },
    year: {
        type: String,
        match: dateRegExp,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
const addBookSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    favourite: joi_1.default.boolean(),
    genre: joi_1.default.string()
        .valid(...bookGenres)
        .required(),
    year: joi_1.default.string().pattern(dateRegExp).required(),
});
const schemas = {
    addBookSchema,
};
exports.schemas = schemas;
// solving problem mongoose error response with wrong error status
bookSchema.post("save", { errorHandler: true }, helpers_1.handleMongooseError);
const Book = (0, mongoose_1.model)("book", bookSchema);
exports.Book = Book;
