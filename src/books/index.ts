// import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { Book } from "../models";
const { nanoid } = require("nanoid");

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

const add = async (bookData: Pick<Book, "author" | "title">): Promise<Book> => {
  const newBook = { id: nanoid(), ...bookData };
  const books = await getAll();
  const updatedBooks = [...books, newBook];

  await fs.writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));

  return newBook;
};

const updateById = async (
  bookId: string,
  bookData: Pick<Book, "author" | "title">
) => {
  const books = await getAll();
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return null;
  }

  books[index] = { id: bookId, ...bookData };

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return books[index];
};

const deleteById = async (bookId: string) => {
  const books = await getAll();
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return result;
};

export { getAll, getById, add, updateById, deleteById };
