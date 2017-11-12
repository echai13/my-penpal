const { STRING, ENUM, TEXT } = require('sequelize')
const db = require('../db')
const Delivery = require('./delivery')

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

Message.prototype.readyForDelivery = function() {
  const messageSent = this.updatedAt
  const now = Date.now()

  return Delivery.findOne({
    where: {
      fromContinent: this.fromContinent,
      toContinent: this.toContinent
    }
  })
    .then(delivery => {
      console.log(delivery.dataValues.timeDuration)
      console.log(messageSent.getTime())
      console.log(now)
      if (now - messageSent.getTime() >= delivery.dataValues.timeDuration) {
        this.update({ status: 'DELIVERED' })
        return true
      } else {
        return false
      }
    })
}

module.exports = Message
