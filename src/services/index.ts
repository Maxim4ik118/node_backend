// import { nanoid } from "nanoid";
// import fs from "fs/promises";
// import path from "path";
import { boolean } from "joi";
import { Book, BookType } from "../models";

// const booksPath = path.join(__dirname, "./books.json");

const getAll = async (): Promise<BookType[]> => {
  // const data = await fs.readFile(booksPath, "utf-8");
  const data = await Book.find();
  return data;
};

const getById = async (id: string): Promise<BookType | null> => {
  // const books = await getAll();
  // const book = books.find((book) => book._id === id);
  const book = await Book.findById(id);

  return book || null;
};

const add = async (bookData: BookType): Promise<BookType> => {
  // const newBook = { id: nanoid(), ...bookData };
  // const books = await getAll();
  // const updatedBooks = [...books, newBook];

  // await fs.writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));

  const newBook = await Book.create(bookData);

  return newBook;
};

const updateById = async (bookId: string, bookData: Partial<BookType>) => {
  // const books = await getAll();
  // const index = books.findIndex((book) => book.id === bookId);

  // if (index === -1) {
  //   return null;
  // }

  // books[index] = { id: bookId, ...bookData };

  // await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  // const newBookWithoutId = { ...bookData };
  const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, { new: true });

  return updatedBook;
};

const deleteById = async (bookId: string) => {
  // const books = await getAll();
  // const index = books.findIndex((book) => book.id === bookId);

  // if (index === -1) {
  //   return null;
  // }
  // const [result] = books.splice(index, 1);

  // await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  const result = await Book.findByIdAndRemove(bookId);

  return result;
};

const updateFavorite = async (
  bookId: string,
  bookData: { favourite: boolean }
) => {
  const result = await Book.findByIdAndUpdate(bookId, bookData, { new: true });

  return result;
};

export { getAll, getById, add, updateById, deleteById, updateFavorite };
