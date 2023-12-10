const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 5000;
const KEYS = require("./Keys.js");
require("./models/book.js");
const Books = mongoose.model("Book");
const client = require("prom-client");
console.log("keys is",KEYS);
// mongoDB setup
mongoose.connect(KEYS.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahhh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("/abc", (req, res, next) => {
  console.log("/ works!");
  res.send("hi");
  // res.status(200).json("it works");
});

app.get("/api/books", (req, res, next) => {
  Books.find()
    .then((entries) => {
      return res.status(200).json(entries);
    })
    .catch((err) => {
      console.log("cannot find entries!");
      return res.status(404).json(err);
    });
});

app.post("/api/books", (req, res, next) => {
  const { name, author } = req.body;
  if (!name || !author) {
    return res.status(422).json("Add all the fields first");
  }
  const newBook = new Books({
    bookName: name,
    bookAuthor: author,
  });
  newBook
    .save()
    .then((result) => {
      return res.status(200).json({ newBook: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).json(err);
    });
});

app.put("/api/books/:bookId", (req, res, next) => {
  const { name, author } = req.body;
  if (!name || !author) {
    return res.status(422).json("Add all fields to be updated");
  }
  Books.findByIdAndUpdate(
    req.params.bookId,
    { bookName: name, bookAuthor: author },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log("app is running on", PORT);
});
// this is the commit made in main
