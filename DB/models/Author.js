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
    type: DataTypes.NUMBER,
    allowNull: false,
    validateYear(value) {
      if (value <= 0) {
        throw new Error("Год должен быть больше 0")
      }
    }
  }
}, {
  sequelize,
  modelName: 'author'
})

module.exports = Author