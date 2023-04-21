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
exports.deleteById = exports.updateById = exports.add = exports.getById = exports.getAll = void 0;
// import { nanoid } from "nanoid";
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const { nanoid } = require("nanoid");
const booksPath = path_1.default.join(__dirname, "./books.json");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(booksPath, "utf-8");
    return JSON.parse(data);
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getAll();
    const book = books.find((book) => book.id === id);
    return book || null;
});
exports.getById = getById;
const add = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = Object.assign({ id: nanoid() }, bookData);
    const books = yield getAll();
    const updatedBooks = [...books, newBook];
    yield promises_1.default.writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));
    return newBook;
});
exports.add = add;
const updateById = (bookId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getAll();
    const index = books.findIndex((book) => book.id === bookId);
    if (index === -1) {
        return null;
    }
    books[index] = Object.assign({ id: bookId }, bookData);
    yield promises_1.default.writeFile(booksPath, JSON.stringify(books, null, 2));
    return books[index];
});
exports.updateById = updateById;
const deleteById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getAll();
    const index = books.findIndex((book) => book.id === bookId);
    if (index === -1) {
        return null;
    }
    const [result] = books.splice(index, 1);
    yield promises_1.default.writeFile(booksPath, JSON.stringify(books, null, 2));
    return result;
});
exports.deleteById = deleteById;
