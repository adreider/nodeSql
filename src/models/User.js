const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        setterMethods: {
          generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8))
          },
          validPassoword(password) {
            return bcrypt.compare(password, this.password)
          },
        },
      },
    )
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
    this.belongsToMany(models.Tech, {
      foreignKey: 'user_id',
      through: 'user_techs',
      as: 'techs',
    })
  }
}

module.exports = User
