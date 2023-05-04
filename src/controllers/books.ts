import { Request, Response } from "express";

// import { BookType, InvokeActionProps } from "../models";

import {
  getAll,
  add, 
  // deleteById,
  //  getById, updateById
} from "../books";

import { ctrlWrapper } from "../helpers";

const BooksController = {
  getAllBooks: ctrlWrapper(async (req: Request, res: Response) => {
    const books = await getAll();
    res.json(books);
  }),
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
  addBook: ctrlWrapper(async (req: Request, res: Response) => {
    //{ title: "Worm", author: "John C. McCrae" };

   const createdBook = await add(req.body);
    res.status(201).json(createdBook);
  }),
};

export { BooksController };
