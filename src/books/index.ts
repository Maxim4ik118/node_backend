// import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
const {nanoid} = require("nanoid");

type Book = {
  id: string;
  title: string;
  author: string;
};

const booksPath = path.join(__dirname, "./books.json");

const getAll = async (): Promise<Book[]> => {
  const data = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(data);
};

const getById = async (id: string): Promise<Book | null> => {
  const books = await getAll();
  const book = books.find((book) => book.id === id);

  return book || null;
};

const add = async (
  bookData: Pick<Book, "author" | "title">
): Promise<Book> => {
  const newBook = { id: nanoid(), ...bookData };
  const books = await getAll();
  const updatedBooks = [...books, newBook];

  await fs.writeFile(booksPath, JSON.stringify(updatedBooks));

  return newBook;
};

export { getAll, getById, add };
