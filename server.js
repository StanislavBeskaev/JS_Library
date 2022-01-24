const express = require("express")
const sequelize = require("./DB/connection")
const Author = require("./DB/models/Author")

sequelize.sync().then(() => console.log("DB is ready"))

const app = express()

app.use(express.json())


app.get("/", (req, res) => {
  return res.json({message: "Hello from Express"})
})


app.post("/authors", (req, res) => {
  console.log(`body: ${req.body}`)
  Author.create(req.body).then(() => {
    return res.json({message: "Author created"})
  })
})

app.listen(3000, () => {
  console.log("JS Library API is running")
})