const { STRING } = require('sequelize')
const db = require('../db')

const Interest = db.define('interest', {
  category: {
    type: STRING,
    defaultValue: 'All'
  }
})

module.exports = Interest
