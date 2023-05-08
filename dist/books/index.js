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
exports.deleteById = exports.updateById = exports.add = exports.getById = exports.getAll = void 0;
// import { nanoid } from "nanoid";
// import fs from "fs/promises";
// import path from "path";
const models_1 = require("../models");
// const booksPath = path.join(__dirname, "./books.json");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // const data = await fs.readFile(booksPath, "utf-8");
    const data = yield models_1.Book.find();
    return data;
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const books = await getAll();
    // const book = books.find((book) => book._id === id);
    const book = models_1.Book.findById(id);
    return book || null;
});
exports.getById = getById;
const add = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    // const newBook = { id: nanoid(), ...bookData };
    // const books = await getAll();
    // const updatedBooks = [...books, newBook];
    // await fs.writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));
    const newBook = models_1.Book.create(bookData);
    return newBook;
});
exports.add = add;
const updateById = (bookId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    // const books = await getAll();
    // const index = books.findIndex((book) => book.id === bookId);
    // if (index === -1) {
    //   return null;
    // }
    // books[index] = { id: bookId, ...bookData };
    // await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    // const newBookWithoutId = { ...bookData };
    const updatedBook = models_1.Book.updateOne({ _id: bookId }, bookData);
    return updatedBook;
});
exports.updateById = updateById;
const deleteById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // const books = await getAll();
    // const index = books.findIndex((book) => book.id === bookId);
    // if (index === -1) {
    //   return null;
    // }
    // const [result] = books.splice(index, 1);
    // await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    const result = models_1.Book.deleteOne({ _id: bookId });
    return result;
});
exports.deleteById = deleteById;
