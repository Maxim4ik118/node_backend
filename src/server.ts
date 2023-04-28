import mongoose from "mongoose";

import { app } from "./app";
import { ServerError } from "./models";

const port = process.env.PORT || 3000;

const DB_HOST =
  "mongodb+srv://Maxi:Maxim4ik118@cluster0.mvxsjks.mongodb.net/books_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(port, () => console.log("Server running on port: " + port));
  })
  .catch((err) => {
    const error = err as ServerError;
    console.log(error.message);
    process.exit(1);
  });
