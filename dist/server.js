"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const port = process.env.PORT || 3000;
const DB_HOST = "mongodb+srv://Maxi:Maxim4ik118@cluster0.mvxsjks.mongodb.net/books_reader?retryWrites=true&w=majority";
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(DB_HOST)
    .then(() => {
    app_1.app.listen(port, () => console.log("Server running on port: " + port));
})
    .catch((err) => {
    const error = err;
    console.log(error.message);
    process.exit(1);
});
