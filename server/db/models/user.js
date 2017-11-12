const crypto = require('crypto')
const { STRING, ENUM } = require('sequelize')
const db = require('../db')
const Interest = require('./interest')
const Preference = require('./preference')
const Penpal = require('./penpal')


const User = db.define('user', {
  username: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: STRING
  },
  gender: {
    type: ENUM('F', 'M')
  },
  location: {
    type: STRING,
    defaultValue: 'Venus'
  },
  salt: {
    type: STRING
  },
  googleId: {
    type: STRING
  }
}, {
    defaultScope: {
      include: [
        { model: Interest }, { model: Preference }]
    }
})

module.exports = User


/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
