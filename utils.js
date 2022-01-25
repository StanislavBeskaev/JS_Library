const Author = require("./DB/models/Author")

function randomNumber(min, max) {
  return Math.round(min + Math.random() * (max - min))
}


async function createTestAuthors(number) {
  const newAuthors = []
  for(let i = 1; i <= number; i++) {
    newAuthors.push({
      name: `Имя тестового автора ${i}`,
      surname: `Фамилия тестового автора ${i}`,
      birth_year: randomNumber(1, new Date().getFullYear())
    })
  }
  await Author.bulkCreate(newAuthors)
}

async function calculateTotalAuthorsBirthYear() {
  const authors = await Author.findAll()
  const total = authors.reduce((total, author) => total + author.birth_year, 0)
  return total
}


module.exports = { createTestAuthors, calculateTotalAuthorsBirthYear }