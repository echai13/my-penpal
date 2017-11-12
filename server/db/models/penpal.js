const { BOOLEAN } = require('sequelize')
const db = require('../db')

const Penpal = db.define('penpal', {
  accepted: {
    type: BOOLEAN,
    defaultValue: false
  }
})

module.exports = Penpal
