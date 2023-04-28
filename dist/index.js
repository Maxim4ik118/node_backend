"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { format } from "date-fns";
const morgan_1 = __importDefault(require("morgan"));
// import path from "path";
// import fs from "fs/promises";
const books_1 = __importDefault(require("./routes/api/books"));
const helpers_1 = require("./helpers");
exports.app = (0, express_1.default)();
const formatsLogger = exports.app.get("env") === "development" ? "dev" : "short";
exports.app.use((0, morgan_1.default)(formatsLogger));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// app.use(async (req, res, next) => {
//   const { method, path: requestPath } = req;
//   const logFilePath = path.join(__dirname, "./public/server.log");
//   const requestTimeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
//   const logString = `${method} ${requestPath} ${requestTimeStamp}`;
//   await fs.appendFile(logFilePath, `${logString} \n`);
//   next();
// });
exports.app.use("/api/books", books_1.default);
exports.app.use((req, res) => {
    const { method, path } = req;
    const error = (0, helpers_1.HttpError)(404, `Route with path ${path} and method ${method} wasn't found!`);
    res.status(error.status).json({
        message: error.message,
    });
});
exports.app.use((err, req, res, next) => {
    const { status = 500, message = "Oops, some 'Server error' occurred... " } = err;
    res.status(status).json({ message });
});
