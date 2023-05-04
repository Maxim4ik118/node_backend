import express from "express";

import { BooksController } from "../../controllers";

import { validateBody } from "../../middlewares";

import { schemas } from "../../models";

const router = express.Router();

// --------- GET all books from the list ---------
router.get("/", BooksController.getAllBooks);

// // --------- GET a conctete book by id from the list ---------
// router.get("/:bookId", BooksController.getBookById);

// // --------- EDIT book to the list ---------
// router.put("/:bookId", validateBody(addBookSchema), BooksController.editBookById);

// // --------- DELETE book to the list ---------
// router.delete("/:bookId", BooksController.deleteBookById);

// --------- ADD book to the list ---------
router.post("/", validateBody(schemas.addBookSchema), BooksController.addBook);

export default router;
