const express = require("express")
const sequelize = require("./DB/connection")
const Author = require("./DB/models/Author")

sequelize.sync().then(() => console.log("DB is ready"))

const app = express()

app.use(express.json())


app.get("/", (req, res) => {
  return res.json({message: "Hello from Express"})
})


app.post("/authors", async (req, res) => {
  console.log(`body: ${req.body}`)
  try {
    await Author.create(req.body)
    return res.json({message: "Author created"})
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

app.get("/authors", async (req, res) => {
  let authors = await Author.findAll({attributes: ['id', 'name']})
  res.json(authors)
})

app.get("/authors/:id", async (req, res) => {
  try {
    const authorId = req.params.id
    const author = await Author.findOne({ where: {id: authorId}})
    return res.json(author)
  } catch (e) {
    console.log(`detailed author error: ${e}`)
    res.json(e)
  }
})

app.delete("/authors/:id", async (req, res) => {
  const authorId = req.params.id
  try {
    await Author.destroy({where: { id: authorId }})
    res.json({message: `author ${authorId} deleted`})
  } catch (e) {
    console.log(`error while deleting author with id ${authorId}: ${e}`)
    res.json(e)
  }
})

app.listen(3000, () => {
  console.log("JS Library API is running")
})