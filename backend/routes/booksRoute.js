import express from 'express'
import {Book} from '../models/bookModel.js'

const router=express.Router();

router.post("/", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book); // Use 201 for successful creation
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json(books);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      // Validate the required fields
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Please provide all required fields: title, author, publishYear",
        });
      }
  
      const { id } = req.params;
      // Use the variable `id` correctly
      const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Return the updated book
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  });
  

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "book deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;