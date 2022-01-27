const Author = require("../../DB/models/Author")
const {getAuthorsWhereClause} = require("./services")

async function createAuthorHandler(req, res) {
  console.log('authors body:', req.body)
  // TODO валидация входных данных
  try {
    const newAuthor = await Author.create(req.body)
    return res.json(newAuthor)
  } catch (e) {
    console.log(e)
    res.json(e)
  }
}

async function getAuthorsHandler(req, res) {
  try {
    console.log("query: ", req.query)

    const authors = await Author.findAll({
      // attributes: ["id", "name"],
      order: [["id", "desc"]],
      where: getAuthorsWhereClause(req.query)
    })
    res.json(authors)
  } catch (e) {
    console.log(e)
  }
}

async function getDetailedAuthorHandler(req, res) {
  try {
    const authorId = req.params.id
    const author = await Author.findOne({ where: {id: authorId}})
    return res.json(author)
  } catch (e) {
    console.log(`detailed author error: ${e}`)
    res.json(e)
  }
}

async function deleteAuthorHandler(req, res) {
  const authorId = req.params.id
  try {
    await Author.destroy({where: { id: authorId }})
    res.json({message: `author ${authorId} deleted`})
  } catch (e) {
    console.log(`error while deleting author with id ${authorId}: ${e}`)
    res.json(e)
  }
}

module.exports = {
  createAuthorHandler,
  getAuthorsHandler,
  getDetailedAuthorHandler,
  deleteAuthorHandler
}