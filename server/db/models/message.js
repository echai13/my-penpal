const { STRING, ENUM, TEXT, VIRTUAL } = require('sequelize')
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

Message.prototype.readyForDelivery = async function() {
  const messageSent = this.updatedAt.getTime()
  const now = Date.now()

  const delivery = await Delivery.findOne({
    where: {
      fromContinent: this.fromContinent,
      toContinent: this.toContinent
    }
  })
  const deliveryTime = delivery.dataValues.timeDuration
  console.log(delivery.dataValues.timeDuration)
  console.log(messageSent)
  console.log(now)
  let ready = false

  if (now - messageSent >= deliveryTime) {
    this.update({ status: 'DELIVERED' })
    ready = true
  }
  return ready
}

module.exports = Message
