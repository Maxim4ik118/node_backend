"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const DB_HOST = process.env.DB_HOST;
//   "engines": {
// "node": ">=14 <15"
//   },
const port = process.env.PORT || 3000;
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(DB_HOST || "")
    .then(() => {
    app_1.app.listen(port, () => console.log("Server running on port: " + port));
})
    .catch((err) => {
    const error = err;
    console.log(error.message);
    process.exit(1);
});
