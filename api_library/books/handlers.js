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
    let books = await Book.findAll({
      order: [["id", "desc"]],
      where: geBooksWhereClause(req.query)
    })

    if (req.query?.name) {
      books = books.filter(book => book.name.toLowerCase().indexOf(req.query.name.toLowerCase()) >= 0)
    }

    return res.json({count: books.length, results: books})
  } catch (e) {
    return res.json(e)
  }
}

module.exports = {
  createBookHandler,
  getBooksHandler
}