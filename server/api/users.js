const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get(`/:userId/friends`, (req, res, next) => {
  User.findOne({ where: { id: req.params.userId }, include: [{ model: User, as: 'friends' }]})
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.get(`/:userId/penpals`, (req, res, next) => {
  User.findOne({ where: { id: req.params.userId }, include: [{ model: User, as: 'friends' }]})
    .then(async user => {
      const allUsers = await User.findAll()
      const userFriends = await user.friends.map(friend => friend.id)
      const filteredPenpals = allUsers.filter(penpal => {
        return penpal.location === user.preference.location && penpal.gender === user.preference.gender && penpal.id !== user.id && !userFriends.includes(penpal.id)
      })

      const userArr = user.interests.map(interest => interest.id).sort()
      const finalList = filteredPenpals.filter(penpal => {
        return (penpal.interests.filter(interest => userArr.includes(interest.id))).length > 0
      })
      res.json(finalList)
    })
    .catch(next)
})
