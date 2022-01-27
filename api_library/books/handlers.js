const Book = require("../../DB/models/Book")
const { geBooksWhereClause } = require("./services")


async function createBookHandler(req, res) {
  try{
    const newBook = await Book.create(req.body)
    return res.json(newBook)
  } catch (e) {
    return res.json(e)
  }
}

async function getBooksHandler(req, res) {
  try {
    console.log("query:", req.query)
    const books = await Book.findAll({
      order: [["id", "desc"]],
      where: geBooksWhereClause(req.query)
    })
    return res.json(books)
  } catch (e) {
    return res.json(e)
  }
}

module.exports = {
  createBookHandler,
  getBooksHandler
}