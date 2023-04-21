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
const books_1 = require("./books");
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
        default:
            return null;
    }
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("welcome to backend");
    try {
        const books = yield invokeAction({ action: "getAll" });
        res.send(books);
        // res.send("welcome to backend");
    }
    catch (err) {
        res.send("Uuos, some error occurred...");
    }
}));
app.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("welcome to backend");
    if (!req.params.bookId)
        return res.send("You must provide a bookId");
    try {
        const book = yield invokeAction({
            action: "getById",
            id: req.params.bookId,
        });
        if (!book)
            return res.send("You must provide a valid bookId");
        res.send(book);
    }
    catch (err) {
        res.send("Uuos, some error occurred...");
    }
}));
app.post("/books/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.author)
        return res.send("You must provide a book object");
    const reqBody = req.body;
    //{ title: "Worm", author: "John C. McCrae" };
    try {
        const book = yield invokeAction(Object.assign({ action: "add" }, reqBody));
        res.send(book);
    }
    catch (err) {
        res.send("Uuos, some error occurred...");
    }
}));
app.listen(port, () => console.log("Server running on port: " + port));
