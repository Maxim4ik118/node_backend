import express, { Request, Response } from "express";

import { add, getAll, getById } from "./books";

import { Book, InvokeBookAction } from "./models";

const invokeAction = async ({
  action,
  title,
  id,
  author,
}: InvokeBookAction): Promise<Book[] | Book | null> => {
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
    default:
      return null;
  }
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  // res.send("welcome to backend");
  try {
    const books = await invokeAction({ action: "getAll" });
    res.send(books);
    // res.send("welcome to backend");
  } catch (err) {
    res.send("Uuos, some error occurred...");
  }
});

app.get("/books/:bookId", async (req: Request, res: Response) => {
  // res.send("welcome to backend");
  if (!req.params.bookId) return res.send("You must provide a bookId");

  try {
    const book = await invokeAction({
      action: "getById",
      id: req.params.bookId,
    });

    if (!book) return res.send("You must provide a valid bookId");

    res.send(book);
  } catch (err) {
    res.send("Uuos, some error occurred...");
  }
});

app.post("/books/", async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.author)
    return res.send("You must provide a book object");

  const reqBody = req.body;
  //{ title: "Worm", author: "John C. McCrae" };

  try {
    const book = await invokeAction({
      action: "add",
      ...reqBody,
    });
    res.send(book);
  } catch (err) {
    res.send("Uuos, some error occurred...");
  }
});

app.listen(port, () => console.log("Server running on port: " + port));
