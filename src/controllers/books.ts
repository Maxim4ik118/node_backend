import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

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

const postersPath = path.resolve("dist", "public", "posters");

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
    const { bookId } = req.params;
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
    // const user = req.user

    const newPath = path.join(postersPath, req.file!.filename);

    console.log(req.file!.path, newPath);
    await fs.rename(req.file!.path, newPath);
    const poster = path.join("public", "posters", req.file!.filename);
    const createdBook = await add({ ...req.body, poster });
    // res.status(201).json(createdBook);
    res.status(201).json(createdBook);
  }),
  updateFavoriteById: ctrlWrapper(async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const updatedBook = await updateFavorite(bookId, req.body);

    if (!updatedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.status(200).json(updatedBook);
  }),
};

export { BooksController };
