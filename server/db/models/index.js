const User = require('./user')
const Message = require('./message')
const Preference = require('./preference')
const Interest = require('./interest')

Message.belongsTo(User, { as: 'sender' })
Message.belongsTo(User, { as: 'receiver' })
Interest.belongsToMany(User, { through: 'userInterest' })
User.belongsToMany(Interest, { through: 'userInterest' })
User.hasOne(Preference)


module.exports = {
  User,
  Message,
  Preference,
  Interest
}
