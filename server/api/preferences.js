const router = require('express').Router()
const { Interest, User, Preference } = require('../db/models')
module.exports = router

router.put(`/:userId`, (req, res, next) => {
  Preference.findOne({
    where: {
      userId: req.body.userId
    }
  })
    .then(preferences => {
      preferences.update({
        gender: req.body.gender || preferences.gender,
        location: req.body.location || preferences.location
      })
    })
    .then(() => {
      User.findById(req.body.userId)
        .then(user => user.setInterests(req.body.interests))
        .then(_ => res.sendStatus(200))
        .catch(next)
    })
})

router.get(`/interests`, (req, res, next) => {
  Interest.findAll()
    .then(interests => res.json(interests))
    .catch(next)
})
