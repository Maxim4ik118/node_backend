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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("../../books");
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
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json("welcome to backend");
    try {
        const books = yield invokeAction({ action: "getAll" });
        res.json(books);
        // res.json("welcome to backend");
    }
    catch (err) {
        res.status(403).json("Uuos, some error occurred...");
    }
}));
router.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json("welcome to backend");
    if (!req.params.bookId)
        return res.status(404).json("You must provide a bookId");
    try {
        const book = yield invokeAction({
            action: "getById",
            id: req.params.bookId,
        });
        if (!book)
            return res.json("You must provide a valid bookId");
        res.json(book);
    }
    catch (err) {
        res.status(403).json("Uuos, some error occurred...");
    }
}));
router.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json("welcome to backend");
    if (!req.params.bookId)
        return res.status(404).json("You must provide a bookId");
    if (!req.body.title || !req.body.author)
        return res.status(404).json("You must provide a new book data!");
    try {
        const updatedBook = yield invokeAction({
            action: "updateById",
            id: req.params.bookId,
            title: req.body.title,
            author: req.body.author,
        });
        if (!updatedBook)
            return res.json("You must provide a valid bookId");
        res.json(updatedBook);
    }
    catch (err) {
        res.status(403).json("Uuos, some error occurred...");
    }
}));
router.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json("welcome to backend");
    if (!req.params.bookId)
        return res.status(404).json("You must provide a bookId");
    try {
        const deletedBook = yield invokeAction({
            action: "deleteById",
            id: req.params.bookId,
        });
        if (!deletedBook)
            return res.json("You must provide a valid bookId");
        res.json(deletedBook);
    }
    catch (err) {
        res.status(403).json("Uuos, some error occurred...");
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.author)
        return res.status(404).json("You must provide a book object");
    const reqBody = req.body;
    //{ title: "Worm", author: "John C. McCrae" };
    try {
        const book = yield invokeAction(Object.assign({ action: "add" }, reqBody));
        res.json(book);
    }
    catch (err) {
        res.status(403).json("Uuos, some error occurred...");
    }
}));
exports.default = router;
