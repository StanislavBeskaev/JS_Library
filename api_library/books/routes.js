const express = require("express")
const Book = require("../../DB/models/Book")
const { createBookHandler, getBooksHandler } = require("./handlers")
const router = express.Router()


router.route("/")
  .get(getBooksHandler)
  .post(createBookHandler)

module.exports = router