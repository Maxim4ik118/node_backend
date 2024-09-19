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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UKR_NET_EMAIL = process.env.UKR_NET_EMAIL;
const UKR_NET_PASSWORD = process.env.UKR_NET_PASSWORD;
const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    },
};
const transport = nodemailer_1.default.createTransport(nodemailerConfig);
// const email = {
//   from: UKR_NET_EMAIL,
//   to: "silatop692@pursip.com",
//   subject: "Test email NODEMAILER",
//   html: "<strong>Test email NODEMAILER</strong>",
// };
// transport
//   .sendMail(email)
//   .then(() => console.log("Email sent successfully"))
//   .catch((err) => console.log(err));
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const email = Object.assign(Object.assign({}, data), { from: UKR_NET_EMAIL });
    return transport
        .sendMail(email)
        .then(() => console.log("Email sent successfully"))
        .catch((err) => console.log(err));
});
exports.sendEmail = sendEmail;
