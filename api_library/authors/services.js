const {getWhereDataByNumberParam} = require("../../utils")

const ID_ATTRIBUTE = "id"
const BIRTH_YEAR_ATTRIBUTE = "birth_year"

// Получение sequelize выражение фильтрации(where) по get параметрам
function getAuthorsWhereClause(query) {
  let whereClause = {}
  const numberParams = [ID_ATTRIBUTE, BIRTH_YEAR_ATTRIBUTE]
  for (let numberParam of numberParams) {
    const attributeWhereData = getWhereDataByNumberParam(query, numberParam)
    if (attributeWhereData.need) {
      whereClause[numberParam] = attributeWhereData.clause
    }
  }

  console.log("whereClause:" , whereClause)
  return whereClause
}

module.exports = {
  getAuthorsWhereClause
}