const  {Model, DataTypes} = require("sequelize")
const sequelize = require("../connection")

class Author extends Model {}

Author.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'author'
})

module.exports = Author