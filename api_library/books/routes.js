const express = require("express")
const {
  createBookHandler,
  getBooksHandler,
  getDetailedBookHandler,
  deleteBookHandler
} = require("./handlers")
const router = express.Router()


router.route("/")
  .get(getBooksHandler)
  .post(createBookHandler)

router.route("/:id")
  .get(getDetailedBookHandler)
  .delete(deleteBookHandler)

module.exports = router
