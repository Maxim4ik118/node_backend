import mongoose from "mongoose";

import { app } from "./app";
import { ServerError } from "./models";

const DB_HOST = process.env.DB_HOST;

//   "engines": {
// "node": ">=14 <15"
//   },
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST || "")
  .then(() => {
    app.listen(port, () => console.log("Server running on port: " + port));
  })
  .catch((err) => {
    const error = err as ServerError;
    console.log(error.message);
    process.exit(1);
  });
