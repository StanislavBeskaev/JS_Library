const Author = require("./DB/models/Author")
const {Op} = require("sequelize")

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

class NumberGetParam {
  constructor(attribute, operator) {
    this.attribute = attribute
    this.operator = operator
  }
}

// Получение объекта с данными фильтрации для атрибута по переданному списку объектов NumberGetParam, возвращает объект
// {need, clause}, где need - флаг необходимости фильтрации, clause - sequelize выражение фильтрации(where)
function getWhereDataByNumberParams(query, numberParams,) {
  let clause = {}
  let need = false
  for (let numberParam of numberParams) {
    const paramString = `${numberParam.attribute}__${numberParam.operator}`
    if (query?.[paramString]) {
      need = true
      clause = {...clause, [Op[numberParam.operator]]: query[paramString]}
    }
  }
  return {need, clause}
}


module.exports = {
  createTestAuthors,
  calculateTotalAuthorsBirthYear,
  getWhereDataByNumberParams,
  NumberGetParam
}