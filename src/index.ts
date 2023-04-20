import express, { Request, Response } from "express";
import { add, getAll, getById } from "./books";

type InvokeBookAction = {
  action: "getAll" | "getById" | "getByAuthor" | "getByTitle" | "add";
  title?: string;
  id?: string;
  author?: string;
};

const invokeAction = async ({
  action,
  title,
  id,
  author,
}: InvokeBookAction) => {
  switch (action) {
    case "getAll": {
      // console.log( await getAll());
      const books = await getAll();
      return books;
    }
    case "getById": {
      if (!id) throw new Error("You must provide an id!");

      const book = await getById(id);

      return book;
    }

    case "add": {
      if (!title || !author)
        throw new Error("You must provide a title and an author!");

      const createdBook = await add({ title, author });

      return createdBook;
    }
  }
};

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  // res.send("welcome to backend");
  try {
    // const books = await invokeAction({ action: "getAll" });
    // res.send(books);
    res.send("welcome to backend");
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
  } catch (err) {}
});

app.post("/books/", async (req: Request, res: Response) => {
  // res.send("welcome to backend");
  // if (!req.body) return res.send("You must provide a request body");

  // const { author, title } = req.body;

  if(!req.body) {

  }

  const reqBody = req.body ?? { title: "Worm", author: "John C. McCrae" };

  try {
    const book = await invokeAction({
      action: "add",
      ...reqBody,
    });

    res.send(book);
  } catch (err) {}
});

app.listen(port, () => console.log("Server running on port: " + port));
