const express = require("express")
const sequelize = require("./DB/connection")
const {createTestAuthors, calculateTotalAuthorsBirthYear, createTestBooks} = require("./utils")
const apiLibraryRouter = require("./api_library/libraryRouter")
const Author = require("./DB/models/Author")
const Book = require("./DB/models/Book")
const cors = require("cors")
const path = require("path")

sequelize.sync().then(async () => {
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
app.use(cors())
app.use("/api_library", apiLibraryRouter)

app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})


app.listen(3001, () => {
  console.log("JS Library API is running")
})