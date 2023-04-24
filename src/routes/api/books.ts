import express, { Request, Response } from "express";
import { add, deleteById, getAll, getById, updateById } from "../../books";

import { Book, InvokeActionProps } from "../../models";

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

router.get("/", async (req: Request, res: Response) => {
  // res.json("welcome to backend");
  try {
    const books = await invokeAction({ action: "getAll" });
    res.json(books);
    // res.json("welcome to backend");
  } catch (err) {
    res.status(403).json("Uuos, some error occurred...");
  }
});

router.get("/:bookId", async (req: Request, res: Response) => {
  // res.json("welcome to backend");
  if (!req.params.bookId)
    return res.status(404).json("You must provide a bookId");

  try {
    const book = await invokeAction({
      action: "getById",
      id: req.params.bookId,
    });

    if (!book) return res.json("You must provide a valid bookId");

    res.json(book);
  } catch (err) {
    res.status(403).json("Uuos, some error occurred...");
  }
});

router.put("/:bookId", async (req: Request, res: Response) => {
  // res.json("welcome to backend");
  if (!req.params.bookId)
    return res.status(404).json("You must provide a bookId");
  if (!req.body.title || !req.body.author)
    return res.status(404).json("You must provide a new book data!");
  try {
    const updatedBook = await invokeAction({
      action: "updateById",
      id: req.params.bookId,
      title: req.body.title,
      author: req.body.author,
    });

    if (!updatedBook) return res.json("You must provide a valid bookId");

    res.json(updatedBook);
  } catch (err) {
    res.status(403).json("Uuos, some error occurred...");
  }
});

router.delete("/:bookId", async (req: Request, res: Response) => {
  // res.json("welcome to backend");
  if (!req.params.bookId)
    return res.status(404).json("You must provide a bookId");
  try {
    const deletedBook = await invokeAction({
      action: "deleteById",
      id: req.params.bookId,
    });

    if (!deletedBook) return res.json("You must provide a valid bookId");

    res.json(deletedBook);
  } catch (err) {
    res.status(403).json("Uuos, some error occurred...");
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.author)
    return res.status(404).json("You must provide a book object");

  const reqBody = req.body;
  //{ title: "Worm", author: "John C. McCrae" };

  try {
    const book = await invokeAction({
      action: "add",
      ...reqBody,
    });
    res.json(book);
  } catch (err) {
    res.status(403).json("Uuos, some error occurred...");
  }
});


export default router;