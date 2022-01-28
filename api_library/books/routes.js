const express = require("express")
const {
  createBookHandler,
  getBooksHandler,
  getDetailedBookHandler,
  deleteBookHandler,
  changeBookHandler,
} = require("./handlers")
const router = express.Router()


router.route("/")
  .get(getBooksHandler)
  .post(createBookHandler)

router.route("/:id")
  .get(getDetailedBookHandler)
  .delete(deleteBookHandler)
  .put(changeBookHandler)

module.exports = router
