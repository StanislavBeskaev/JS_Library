const { getWhereDataByNumberParam } = require("../../utils")
const { Op } = require("sequelize")

// Получение sequelize выражение фильтрации(where) по get параметрам
function geBooksWhereClause(query) {
  let whereClause = {}
  const numberParams = ["id", "issue_year", "page_count"]
  for (let numberParam of numberParams) {
    const attributeWhereData = getWhereDataByNumberParam(query, numberParam)
    if (attributeWhereData.need) {
      whereClause[numberParam] = attributeWhereData.clause
    }
  }

  if (query?.author) {
    whereClause["author"] = query.author
  }

  console.log("whereClause:" , whereClause)
  return whereClause
}

module.exports = {
  geBooksWhereClause
}