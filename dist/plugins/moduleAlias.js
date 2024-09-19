"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const module_alias_1 = __importDefault(require("module-alias"));
const alias = (path) => (0, path_1.join)(process.cwd(), `./dist${path}`);
module_alias_1.default.addAliases({
    "@": alias(""),
});
(0, module_alias_1.default)();
