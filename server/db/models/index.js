const User = require('./user')
const Message = require('./message')
const Preference = require('./preference')
const Interest = require('./interest')
const Penpal = require('./penpal')

Message.belongsTo(User, { as: 'sender' })
Message.belongsTo(User, { as: 'receiver' })
Interest.belongsToMany(User, { through: 'userInterest' })
User.belongsToMany(Interest, { through: 'userInterest' })
User.hasOne(Preference)
User.belongsToMany(User, { as: 'friends', through: Penpal })


module.exports = {
  User,
  Message,
  Preference,
  Interest,
  Penpal
}
