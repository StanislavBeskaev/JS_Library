const express = require("express")
const {
  createAuthorHandler,
  getAuthorsHandler,
  getDetailedAuthorHandler,
  deleteAuthorHandler
} = require("./handlers")
const router = express.Router()


router.route("/")
  .get(getAuthorsHandler)
  .post(createAuthorHandler)

router.route("/:id")
  .get(getDetailedAuthorHandler)
  .delete(deleteAuthorHandler)


module.exports = router