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
exports.add = exports.getAll = void 0;
const path_1 = __importDefault(require("path"));
const models_1 = require("../models");
const booksPath = path_1.default.join(__dirname, "./books.json");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // const data = await fs.readFile(booksPath, "utf-8");
    const data = yield models_1.Book.find();
    return data;
});
exports.getAll = getAll;
// const getById = async (id: string): Promise<BookType | null> => {
//   const books = await getAll();
//   const book = books.find((book) => book.id === id);
//   return book || null;
// };
const add = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    // const newBook = { id: nanoid(), ...bookData };
    // const books = await getAll();
    // const updatedBooks = [...books, newBook];
    // await fs.writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));
    const newBook = models_1.Book.create(bookData);
    return newBook;
});
exports.add = add;
