'use strict'

const sequelize = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'age'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  },
}
