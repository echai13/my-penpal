const { STRING, ENUM, TEXT } = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  content: {
    type: TEXT,
    allowNull: false
  },
  fromLocation: {
    type: STRING,
    allowNull: false
  },
  toLocation: {
    type: STRING,
    allowNull: false
  },
  fromContinent: {
    type: STRING,
    defaultValue: 'North America'
  },
  toContinent: {
    type: STRING,
    defaultValue: 'Europe'
  },
  status: {
    type: ENUM('DRAFT', 'SENT', 'DELIVERED'),
    defaultValue: 'DRAFT'
  }
})

module.exports = Message
