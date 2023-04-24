"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const date_fns_1 = require("date-fns");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const books_1 = __importDefault(require("./routes/api/books"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { method, path: requestPath } = req;
    const logFilePath = path_1.default.join(__dirname, "./public/server.log");
    const requestTimeStamp = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd HH:mm:ss");
    const logString = `${method} ${requestPath} ${requestTimeStamp}`;
    yield promises_1.default.appendFile(logFilePath, `${logString} \n`);
    next();
}));
exports.app.use("/api/books", books_1.default);
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
exports.app.use((req, res) => {
    const { method, path } = req;
    res.status(404).json({
        message: `Route with path ${path} and method ${method} wasn't found!`,
    });
});
