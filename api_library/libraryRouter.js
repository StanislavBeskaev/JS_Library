const express = require('express')
const apiLibraryRouter = express.Router()
const authorsRouter = require("./authors")
const booksRouter = require("./books")

apiLibraryRouter.use("/authors", authorsRouter)
apiLibraryRouter.use("/books", booksRouter)

module.exports = apiLibraryRouter


