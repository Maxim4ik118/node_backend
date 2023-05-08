import express from "express";

import { BooksController } from "../../controllers";

import { validateBody, validateObjectId } from "../../middlewares";

import { schemas } from "../../models";

const router = express.Router();

// --------- GET all books from the list ---------
router.get("/", BooksController.getAllBooks);

// --------- GET a conctete book by id from the list ---------
router.get("/:bookId", validateObjectId, BooksController.getBookById);

// --------- EDIT book to the list ---------
router.put(
  "/:bookId",
  validateObjectId,
  validateBody(schemas.addBookSchema),
  BooksController.editBookById
);

// --------- UPDATE favourite book from the list ---------
router.patch(
  "/:bookId/favourite",
  validateObjectId,
  validateBody(schemas.updateFavoriteSchema),
  BooksController.updateFavoriteById
);

// --------- DELETE book to the list ---------
router.delete("/:bookId", validateObjectId, BooksController.deleteBookById);

// --------- ADD book to the list ---------
router.post("/", validateBody(schemas.addBookSchema), BooksController.addBook);

export default router;
