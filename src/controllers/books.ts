import { Request, Response } from "express";

import {
  getAll,
  add,
  getById,
  deleteById,
  updateById,
  updateFavorite,
} from "../services";

import { HttpError, ctrlWrapper } from "../helpers";
import { BookType } from "../models";

const BooksController = {
  getAllBooks: ctrlWrapper(async (req: Request, res: Response) => {
    const books = await getAll();
    res.json(books);
  }),
  getBookById: ctrlWrapper(async (req: Request, res: Response) => {
    const book = await getById(req.params.bookId);

    if (!book) {
      throw HttpError(404, "Not found! You must provide a another bookId!");
    }

    res.json(book);
  }),
  editBookById: ctrlWrapper(async (req: Request, res: Response) => {
    const { title, author, favourite, genre, year } = req.body as Omit<
      BookType,
      "_id"
    >;
    const bookId = req.params.bookId;
    const updatedBook = await updateById(bookId, {
      title,
      author,
      favourite,
      genre,
      year,
    });

    if (!updatedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.json(updatedBook);
  }),
  deleteBookById: ctrlWrapper(async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const deletedBook = await deleteById(bookId);
    if (!deletedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.json(deletedBook);
  }),
  addBook: ctrlWrapper(async (req: Request, res: Response) => {
    //{ title: "Worm", author: "John C. McCrae" };

    const createdBook = await add(req.body);
    res.status(201).json(createdBook);
  }),
  updateFavoriteById: ctrlWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedBook = await updateFavorite(id, req.body);

    if (!updatedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.status(200).json(updatedBook);
  }),
};

export { BooksController };
