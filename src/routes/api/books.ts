import express from "express";

import { BooksController } from "../../controllers";

import { validateBody } from "../../middlewares";

import { addSchema } from "../../schemas/books";

const router = express.Router();

// --------- GET all books from the list ---------
router.get("/", BooksController.getAllBooks);

// --------- GET a conctete book by id from the list ---------
router.get("/:bookId", BooksController.getBookById);

// --------- EDIT book to the list ---------
router.put("/:bookId", validateBody(addSchema), BooksController.editBookById);

// --------- DELETE book to the list ---------
router.delete("/:bookId", BooksController.deleteBookById);

// --------- ADD book to the list ---------
router.post("/", validateBody(addSchema), BooksController.addBook);

export default router;
