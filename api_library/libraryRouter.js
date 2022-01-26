const express = require('express')
const apiLibraryRouter = express.Router()
const authorsRouter = require("./authors/routes")
const booksRouter = require("./books/routes")

apiLibraryRouter.use("/authors", authorsRouter)
apiLibraryRouter.use("/books", booksRouter)

module.exports = apiLibraryRouter


