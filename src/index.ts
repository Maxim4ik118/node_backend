import express from "express";
import cors from "cors";
import { format } from "date-fns";

import path from "path";
import fs from "fs/promises";

import booksRouter from "./routes/api/books";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  const { method, path: requestPath } = req;
  const logFilePath = path.join(__dirname, "./public/server.log");

  const requestTimeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const logString = `${method} ${requestPath} ${requestTimeStamp}`;
  await fs.appendFile(logFilePath, `${logString} \n`);

  next();
});

app.use("/api/books", booksRouter);
// app.get("/api/books", async (req: Request, res: Response) => {
//   // res.json("welcome to backend");
//   try {
//     const books = await invokeAction({ action: "getAll" });
//     res.json(books);
//     // res.json("welcome to backend");
//   } catch (err) {
//     res.status(403).json("Uuos, some error occurred...");
//   }
// });

// app.get("/api/books/:bookId", async (req: Request, res: Response) => {
//   // res.json("welcome to backend");
//   if (!req.params.bookId)
//     return res.status(404).json("You must provide a bookId");

//   try {
//     const book = await invokeAction({
//       action: "getById",
//       id: req.params.bookId,
//     });

//     if (!book) return res.json("You must provide a valid bookId");

//     res.json(book);
//   } catch (err) {
//     res.status(403).json("Uuos, some error occurred...");
//   }
// });

// app.put("/api/books/:bookId", async (req: Request, res: Response) => {
//   // res.json("welcome to backend");
//   if (!req.params.bookId)
//     return res.status(404).json("You must provide a bookId");
//   if (!req.body.title || !req.body.author)
//     return res.status(404).json("You must provide a new book data!");
//   try {
//     const updatedBook = await invokeAction({
//       action: "updateById",
//       id: req.params.bookId,
//       title: req.body.title,
//       author: req.body.author,
//     });

//     if (!updatedBook) return res.json("You must provide a valid bookId");

//     res.json(updatedBook);
//   } catch (err) {
//     res.status(403).json("Uuos, some error occurred...");
//   }
// });

// app.delete("/api/books/:bookId", async (req: Request, res: Response) => {
//   // res.json("welcome to backend");
//   if (!req.params.bookId)
//     return res.status(404).json("You must provide a bookId");
//   try {
//     const deletedBook = await invokeAction({
//       action: "deleteById",
//       id: req.params.bookId,
//     });

//     if (!deletedBook) return res.json("You must provide a valid bookId");

//     res.json(deletedBook);
//   } catch (err) {
//     res.status(403).json("Uuos, some error occurred...");
//   }
// });

// app.post("/api/books/", async (req: Request, res: Response) => {
//   if (!req.body.title || !req.body.author)
//     return res.status(404).json("You must provide a book object");

//   const reqBody = req.body;
//   //{ title: "Worm", author: "John C. McCrae" };

//   try {
//     const book = await invokeAction({
//       action: "add",
//       ...reqBody,
//     });
//     res.json(book);
//   } catch (err) {
//     res.status(403).json("Uuos, some error occurred...");
//   }
// });

app.use((req, res) => {
  const { method, path } = req;
  res.status(404).json({
    message: `Route with path ${path} and method ${method} wasn't found!`,
  });
});

