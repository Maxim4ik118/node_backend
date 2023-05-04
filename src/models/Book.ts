import { model, Schema } from "mongoose";
import { handleMongooseError } from "../helpers";

import Joi from "joi";

type BookType = {
  title: string;
  author: string;
  favourite: boolean;
  genre: "fantastic" | "love" | "thriller";
  year: string;
};

enum BookGenre {
  "fantastic" = "fantastic",
  "love" = "love",
  "thriller" = "thriller",
}
// type BookGenres = "fantastic" | "love" | "thriller";

const dateRegExp = /^\d{2}-\d{2}-\d{4}$/;
const bookGenres: Array<string> = [
  BookGenre.fantastic,
  BookGenre.love,
  BookGenre.thriller,
];

const bookSchema = new Schema<BookType>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      required: true,
      enum: bookGenres,
    },
    year: {
      type: String, // 16-10-2009
      match: dateRegExp,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favourite: Joi.boolean(),
  genre: Joi.string()
    .valid(...bookGenres)
    .required(),
  year: Joi.string().pattern(dateRegExp).required(),
});

const schemas = {
  addBookSchema,
};

// solving problem mongoose error response with wrong error status
bookSchema.post("save", { errorHandler: true }, handleMongooseError);

const Book = model<BookType>("book", bookSchema);

export { Book, schemas, BookType, BookGenre };
