const {getWhereDataByNumberParams, NumberGetParam} = require("../../utils")

const ID_ATTRIBUTE = "id"
const BIRTH_YEAR_ATTRIBUTE = "birth_year"
const GTE_OPERATOR = "gte"
const LTE_OPERATOR = "lte"

// Получение sequelize выражение фильтрации(where) по get параметрам
function getAuthorsWhereClause(query) {
  let whereClause = {}

  const idWhereData = getIdWhereData(query)
  if (idWhereData.need) {
    whereClause[ID_ATTRIBUTE] = idWhereData.clause
  }

  const birthYearWhereData = getBirthYearWhereData(query)
  if (birthYearWhereData.need) {
    whereClause[BIRTH_YEAR_ATTRIBUTE] = birthYearWhereData.clause
  }

  console.log("whereClause:" , whereClause)
  return whereClause
}

// Получение объекта с данными фильтрации по ID автора, флаг необходимости фильтрации и выражение фильтрации
function getIdWhereData(query) {
  const idNumberParams = [
    new NumberGetParam(ID_ATTRIBUTE, GTE_OPERATOR),
    new NumberGetParam(ID_ATTRIBUTE, LTE_OPERATOR)
  ]
  const idWhereData = getWhereDataByNumberParams(query, idNumberParams)

  console.log("idWhereData: ", idWhereData)
  return idWhereData
}

// Получение объекта с данными фильтрации по birth_year автора, флаг необходимости фильтрации и выражение фильтрации
function getBirthYearWhereData(query) {
  const birthYearNumberParams = [
    new NumberGetParam(BIRTH_YEAR_ATTRIBUTE, GTE_OPERATOR),
    new NumberGetParam(BIRTH_YEAR_ATTRIBUTE, LTE_OPERATOR)
  ]
  const birthYearWhereData = getWhereDataByNumberParams(query, birthYearNumberParams)

  console.log("birthYearWhereData: ", birthYearWhereData)
  return birthYearWhereData
}

module.exports = {
  getAuthorsWhereClause
}