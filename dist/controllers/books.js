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
exports.BooksController = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const services_1 = require("../services");
const helpers_1 = require("../helpers");
const postersPath = path_1.default.resolve("dist", "public", "posters");
const BooksController = {
    getAllBooks: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const books = yield (0, services_1.getAll)();
        res.json(books);
    })),
    getBookById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield (0, services_1.getById)(req.params.bookId);
        if (!book) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a another bookId!");
        }
        res.json(book);
    })),
    editBookById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, author, favourite, genre, year } = req.body;
        const { bookId } = req.params;
        const updatedBook = yield (0, services_1.updateById)(bookId, {
            title,
            author,
            favourite,
            genre,
            year,
        });
        if (!updatedBook) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a bookId!");
        }
        res.json(updatedBook);
    })),
    deleteBookById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const deletedBook = yield (0, services_1.deleteById)(bookId);
        if (!deletedBook) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a bookId!");
        }
        res.json(deletedBook);
    })),
    addBook: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //{ title: "Worm", author: "John C. McCrae" };
        // const user = req.user
        const newPath = path_1.default.join(postersPath, req.file.filename);
        console.log(req.file.path, newPath);
        yield promises_1.default.rename(req.file.path, newPath);
        const poster = path_1.default.join("public", "posters", req.file.filename);
        const createdBook = yield (0, services_1.add)(Object.assign(Object.assign({}, req.body), { poster }));
        // res.status(201).json(createdBook);
        res.status(201).json(createdBook);
    })),
    updateFavoriteById: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { bookId } = req.params;
        const updatedBook = yield (0, services_1.updateFavorite)(bookId, req.body);
        if (!updatedBook) {
            throw (0, helpers_1.HttpError)(404, "Not found! You must provide a bookId!");
        }
        res.status(200).json(updatedBook);
    })),
};
exports.BooksController = BooksController;
