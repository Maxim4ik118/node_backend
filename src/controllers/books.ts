import { Request, Response } from "express";
// import Joi from "joi";

import { Book, InvokeActionProps } from "../models";

import { add, deleteById, getAll, getById, updateById } from "../books";

import { HttpError, ctrlWrapper } from "../helpers";

const invokeAction = async ({
  action,
  title,
  id,
  author,
}: InvokeActionProps): Promise<Book[] | Book | null> => {
  switch (action) {
    case "getAll": {
      const books = await getAll();

      return books;
    }
    case "getById": {
      if (!id) throw new Error("You must provide an id!");

      const oneBook = await getById(id);

      return oneBook;
    }

    case "add": {
      if (!title || !author)
        throw new Error("You must provide a title and an author!");

      const createdBook = await add({ title, author });

      return createdBook;
    }

    case "updateById": {
      if (!id || !title || !author)
        throw new Error("You must provide a title and an author!");

      const updatedBook = await updateById(id, { title, author });

      return updatedBook;
    }
    case "deleteById": {
      if (!id) throw new Error("You must provide a title and an author!");

      const deletedBook = await deleteById(id);

      return deletedBook;
    }
    default:
      return null;
  }
};

export const BooksController = {
  getAllBooks: ctrlWrapper(async (req: Request, res: Response) => {
    const books = await invokeAction({ action: "getAll" });
    res.json(books);
  }),
  getBookById: ctrlWrapper(async (req: Request, res: Response) => {
    const book = await invokeAction({
      action: "getById",
      id: req.params.bookId,
    });

    if (!book) {
      throw HttpError(404, "Not found! You must provide a another bookId!");
    }

    res.json(book);
  }),
  editBookById: ctrlWrapper(async (req: Request, res: Response) => {
    const updatedBook = await invokeAction({
      action: "updateById",
      id: req.params.bookId,
      title: req.body.title,
      author: req.body.author,
    });

    if (!updatedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.json(updatedBook);
  }),
  deleteBookById: ctrlWrapper(async (req: Request, res: Response) => {
    const deletedBook = await invokeAction({
      action: "deleteById",
      id: req.params.bookId,
    });

    if (!deletedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.json(deletedBook);
  }),
  addBook: ctrlWrapper(async (req: Request, res: Response) => {
    //{ title: "Worm", author: "John C. McCrae" };

    const book = await invokeAction({
      action: "add",
      ...req.body,
    });
    res.status(201).json(book);
  }),
};
