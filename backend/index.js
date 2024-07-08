import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
  origin:'http://localhost:5173',
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type'],
  })
);

app.get("/", (req, res) => {
  return res.status(234).send("Hello from Sahebrao");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((err) => console.log(err));
