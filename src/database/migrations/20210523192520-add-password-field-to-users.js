'use strict'

const sequelize = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'password',
      {
        type: Sequelize.STRING,
      },
      {
        allowNull: false,
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  },
}
