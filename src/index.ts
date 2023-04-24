import path from "path";
import fs from "fs/promises";
import express, { Request, Response } from "express";
import { format } from "date-fns";

import { add, deleteById, getAll, getById, updateById } from "./books";

import { Book, InvokeActionProps } from "./models";

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

// const actionIndex = process.argv.indexOf("--action");
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr) as { argv: InvokeActionProps };

// new Promise(async (resolve, reject) => {
//   const result = await invokeAction(argv);
//   resolve(console.log(result));
// });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  const { method, path: requestPath } = req;
  const logFilePath = path.join(__dirname, "./public/server.log");

  const requestTimeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const logString = `${method} ${requestPath} ${requestTimeStamp}`;
  await fs.appendFile(logFilePath, `${logString} \n`);

  next();
});

app.get("/books", async (req: Request, res: Response) => {
  // res.json("welcome to backend");
  try {
    const books = await invokeAction({ action: "getAll" });
    res.json(books);
    // res.json("welcome to backend");
  } catch (err) {
    res.status(403).json("Uuos, some error occurred...");
  }
});

app.get("/books/:bookId", async (req: Request, res: Response) => {
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

app.put("/books/:bookId", async (req: Request, res: Response) => {
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

app.delete("/books/:bookId", async (req: Request, res: Response) => {
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

app.post("/books/", async (req: Request, res: Response) => {
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

app.listen(port, () => console.log("Server running on port: " + port));
