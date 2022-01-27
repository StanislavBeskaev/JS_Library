const Author = require("./DB/models/Author")
const {Op} = require("sequelize")

const GTE_OPERATOR = "gte"
const LTE_OPERATOR = "lte"

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
  return authors.reduce((total, author) => total + author.birth_year, 0)
}

// Получение объекта с данными фильтрации для числового атрибута numberParam, возвращает объект
// {need, clause}, где need - флаг необходимости фильтрации по атрибуту,
// clause - sequelize выражение фильтрации(where) для этого атрибута
function getWhereDataByNumberParam(query, numberParam,) {
  let clause = {}
  let need = false
  const operators = [GTE_OPERATOR, LTE_OPERATOR]

  for (let operator of operators) {
    const ParamString = `${numberParam}__${operator}`
    if (query?.[ParamString]) {
      need = true
      clause = {...clause, [Op[operator]]: query[ParamString]}
    }}

  return {need, clause}
}


module.exports = {
  createTestAuthors,
  calculateTotalAuthorsBirthYear,
  getWhereDataByNumberParam,
}