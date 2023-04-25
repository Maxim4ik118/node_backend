import express, { Request, Response } from "express";
import { add, deleteById, getAll, getById, updateById } from "../../books";

import { Book, InvokeActionProps, ServerError } from "../../models";
import { HttpError } from "../../helpers";

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

const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const books = await invokeAction({ action: "getAll" });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/:bookId", async (req: Request, res: Response, next) => {
  try {
    if (!req.params.bookId) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    const book = await invokeAction({
      action: "getById",
      id: req.params.bookId,
    });

    if (!book) {
      throw HttpError(404, "Not found! You must provide a another bookId!");
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

router.put("/:bookId", async (req: Request, res: Response, next) => {
  try {
    if (!req.params.bookId) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }
    if (!req.body.title || !req.body.author) {
      throw HttpError(404, "You must provide a request body!");
    }
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
  } catch (err) {
    next(err);
  }
});

router.delete("/:bookId", async (req: Request, res: Response, next) => {
  try {
    if (!req.params.bookId) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }
    const deletedBook = await invokeAction({
      action: "deleteById",
      id: req.params.bookId,
    });

    if (!deletedBook) {
      throw HttpError(404, "Not found! You must provide a bookId!");
    }

    res.json(deletedBook);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next) => {
  if (!req.body.title || !req.body.author) {
    throw HttpError(404, "You must provide a request body!");
  }

  const reqBody = req.body;
  //{ title: "Worm", author: "John C. McCrae" };

  try {
    const book = await invokeAction({
      action: "add",
      ...reqBody,
    });
    res.json(book);
  } catch (err) {
    next(err);
  }
});

export default router;
