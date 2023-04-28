"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const books_1 = require("../books");
const helpers_1 = require("../helpers");
const invokeAction = ({ action, title, id, author, }) => __awaiter(void 0, void 0, void 0, function* () {
    switch (action) {
        case "getAll": {
            const books = yield (0, books_1.getAll)();
            return books;
        }
        case "getById": {
            if (!id)
                throw new Error("You must provide an id!");
            const oneBook = yield (0, books_1.getById)(id);
            return oneBook;
        }
        case "add": {
            if (!title || !author)
                throw new Error("You must provide a title and an author!");
            const createdBook = yield (0, books_1.add)({ title, author });
            return createdBook;
        }
        case "updateById": {
            if (!id || !title || !author)
                throw new Error("You must provide a title and an author!");
            const updatedBook = yield (0, books_1.updateById)(id, { title, author });
            return updatedBook;
        }
        case "deleteById": {
            if (!id)
                throw new Error("You must provide a title and an author!");
            const deletedBook = yield (0, books_1.deleteById)(id);
            return deletedBook;
        }
        default:
            return null;
    }
});
exports.BooksController = {
    getAllBooks: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const books = yield invokeAction({ action: "getAll" });
        res.json(books);
    })),
    getBookById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield invokeAction({
            action: "getById",
            id: req.params.bookId,
        });
        if (!book) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a another bookId!");
        }
        res.json(book);
    })),
    editBookById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBook = yield invokeAction({
            action: "updateById",
            id: req.params.bookId,
            title: req.body.title,
            author: req.body.author,
        });
        if (!updatedBook) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a bookId!");
        }
        res.json(updatedBook);
    })),
    deleteBookById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedBook = yield invokeAction({
            action: "deleteById",
            id: req.params.bookId,
        });
        if (!deletedBook) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a bookId!");
        }
        res.json(deletedBook);
    })),
    addBook: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //{ title: "Worm", author: "John C. McCrae" };
        const book = yield invokeAction(Object.assign({ action: "add" }, req.body));
        res.status(201).json(book);
    })),
};
