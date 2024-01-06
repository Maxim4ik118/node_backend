import express from "express";

import { BooksController } from "../../controllers";

import {
  validateBody,
  validateObjectId,
  authenticate,
} from "../../middlewares";

import { schemas } from "../../models/Book";

const router = express.Router();

// --------- GET all books from the list ---------
router.get("/", authenticate, BooksController.getAllBooks);

// --------- GET a conctete book by id from the list ---------
router.get(
  "/:bookId",
  authenticate,
  validateObjectId,
  BooksController.getBookById
);

// --------- EDIT book to the list ---------
router.put(
  "/:bookId",
  authenticate,
  validateObjectId,
  validateBody(schemas.addBookSchema),
  BooksController.editBookById
);

// --------- UPDATE favourite book from the list ---------
router.patch(
  "/:bookId/favourite",
  authenticate,
  validateObjectId,
  validateBody(schemas.updateFavoriteSchema),
  BooksController.updateFavoriteById
);

// --------- DELETE book to the list ---------
router.delete(
  "/:bookId",
  authenticate,
  validateObjectId,
  BooksController.deleteBookById
);

// --------- ADD book to the list ---------
router.post(
  "/",
  authenticate,
  validateBody(schemas.addBookSchema),
  BooksController.addBook
);

export default router;
