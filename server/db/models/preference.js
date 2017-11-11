const { STRING, ENUM } = require('sequelize')
const db = require('../db')

const Preference = db.define('preference', {
  gender: {
    type: ENUM('M', 'F', 'No Preference'),
    defaultValue: 'No Preference'
  },
  location: {
    type: STRING,
    defaultValue: 'Venus'
  }
})

module.exports = Preference
