const express = require("express")
const { Op } =require("express")
const Author = require("../DB/models/Author")
const router = express.Router()


router.post("/", async (req, res) => {
  console.log('authors body:', req.body)
  try {
    await Author.create(req.body)
    return res.json({message: "Author created"})
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

router.get("/", async (req, res) => {
  try {
    let authors = await Author.findAll({ attributes: ["id", "name"] })
    res.json(authors)
  } catch (e) {
    console.log(e)
  }

})

router.get("/:id", async (req, res) => {
  try {
    const authorId = req.params.id
    const author = await Author.findOne({ where: {id: authorId}})
    return res.json(author)
  } catch (e) {
    console.log(`detailed author error: ${e}`)
    res.json(e)
  }
})

router.delete("/:id", async (req, res) => {
  const authorId = req.params.id
  try {
    await Author.destroy({where: { id: authorId }})
    res.json({message: `author ${authorId} deleted`})
  } catch (e) {
    console.log(`error while deleting author with id ${authorId}: ${e}`)
    res.json(e)
  }
})

module.exports = router