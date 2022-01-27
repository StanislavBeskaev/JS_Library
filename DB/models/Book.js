const  {Model, DataTypes} = require("sequelize")
const Author = require("./Author")
const sequelize = require("../connection")

class Book extends Model {}

Book.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Author,
      key: 'id'
    }
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  issue_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  page_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  sequelize,
  modelName: 'book'
})

module.exports = Book