const Book = require("../../DB/models/Book")
const { geBooksWhereClause } = require("./services")


const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

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
    const page = parseInt(req.query?.page) || DEFAULT_PAGE
    const pageSize = parseInt(req.query?.page_size) || DEFAULT_PAGE_SIZE
    let books = await Book.findAndCountAll({
      order: [["id", "desc"]],
      where: geBooksWhereClause(req.query),
      limit: pageSize,
      offset: (page - 1) * pageSize
    })

    return res.json({
      count: books.count,
      page,
      page_size: pageSize,
      results: books.rows
    })
  } catch (e) {
    return res.json(e)
  }
}

async function getDetailedBookHandler(req, res) {
  try {
    const bookId = req.params.id
    const book = await Book.findOne({where: {id: bookId}})
    return res.json(book)
  } catch (e) {
    return res.json(e)
  }
}

async function deleteBookHandler(req, res) {
  const bookId = req.params.id
  try {
    await Book.destroy({where: { id: bookId }})
    res.json({message: `book ${bookId} deleted`})
  } catch (e) {
    console.log(`error while deleting book with id ${bookId}: ${e}`)
    res.json(e)
  }
}

async function changeBookHandler(req, res) {
  const bookId = req.params.id
  try {
    console.log(`trying to change book with id=${bookId}, with data:`, req.body)
    const changedBook = await Book.update(req.body, {where: {id: bookId}})
    res.json(changedBook)
  } catch (e) {
    res.json(e)
  }
}

module.exports = {
  createBookHandler,
  getBooksHandler,
  getDetailedBookHandler,
  deleteBookHandler,
  changeBookHandler
}