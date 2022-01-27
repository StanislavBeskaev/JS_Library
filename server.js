const express = require("express")
const sequelize = require("./DB/connection")
const {createTestAuthors, calculateTotalAuthorsBirthYear, createTestBooks} = require("./utils")
const apiLibraryRouter = require("./api_library/libraryRouter")
const Author = require("./DB/models/Author")
const Book = require("./DB/models/Book")

sequelize.sync().then(async () => {
  Book.sync({force:true})
  const authorCount = await Author.count()
  if (authorCount === 0) {
    await createTestAuthors(100)
  }

  const bookCount = await Book.count()
  if (bookCount === 0) {
    await createTestBooks(1000)
  }

  console.log("DB is ready")
  const totalYears = await calculateTotalAuthorsBirthYear()
  console.log(`Сумма годов рождения авторов: ${totalYears.toLocaleString('ru-RU')}`)
})


const app = express()

app.use(express.json())
app.use("/api_library", apiLibraryRouter)


app.get("/", (req, res) => {
  return res.json({message: "Hello from Express"})
})

app.listen(3000, () => {
  console.log("JS Library API is running")
})