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
// import { BookType, InvokeActionProps } from "../models";
const books_1 = require("../books");
const helpers_1 = require("../helpers");
const BooksController = {
    getAllBooks: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const books = yield (0, books_1.getAll)();
        res.json(books);
    })),
    // getBookById: ctrlWrapper(async (req: Request, res: Response) => {
    // const book = await getById(req.params.bookId);
    //   if (!book) {
    //     throw HttpError(404, "Not found! You must provide a another bookId!");
    //   }
    //   res.json(book);
    // }),
    // editBookById: ctrlWrapper(async (req: Request, res: Response) => {
    // const {title, author} = req.body;
    // const bookId = req.params.bookId;
    // const updatedBook = await updateById(bookId, { title, author });
    //   if (!updatedBook) {
    //     throw HttpError(404, "Not found! You must provide a bookId!");
    //   }
    //   res.json(updatedBook);
    // }),
    // deleteBookById: ctrlWrapper(async (req: Request, res: Response) => {
    // const bookId = req.params.bookId;
    // const deletedBook = await deleteById(bookId);
    //   if (!deletedBook) {
    //     throw HttpError(404, "Not found! You must provide a bookId!");
    //   }
    //   res.json(deletedBook);
    // }),
    addBook: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //{ title: "Worm", author: "John C. McCrae" };
        const createdBook = yield (0, books_1.add)(req.body);
        res.status(201).json(createdBook);
    })),
};
exports.BooksController = BooksController;
