"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const models_1 = require("../../models");
const router = express_1.default.Router();
// --------- GET all books from the list ---------
router.get("/", controllers_1.BooksController.getAllBooks);
// --------- GET a conctete book by id from the list ---------
router.get("/:bookId", controllers_1.BooksController.getBookById);
// --------- EDIT book to the list ---------
router.put("/:bookId", (0, middlewares_1.validateBody)(models_1.schemas.addBookSchema), controllers_1.BooksController.editBookById);
// --------- DELETE book to the list ---------
router.delete("/:bookId", controllers_1.BooksController.deleteBookById);
// --------- ADD book to the list ---------
router.post("/", (0, middlewares_1.validateBody)(models_1.schemas.addBookSchema), controllers_1.BooksController.addBook);
exports.default = router;
