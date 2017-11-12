const { STRING, INTEGER } = require('sequelize')
const db = require('../db')

const Delivery = db.define('delivery', {
  fromContinent: {
    type: STRING
  },
  toContinent: {
    type: STRING
  },
  timeDuration: {
    type: INTEGER
  }
})

module.exports = Delivery
