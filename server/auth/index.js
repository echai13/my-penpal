const router = require('express').Router()
const User = require('../db/models/user')
const satelize = require('satelize')
module.exports = router

router.post('/login', (req, res, next) => {
  console.log(req.body)
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(`ip: `, ip)

  satelize.satelize({ ip: '71.190.247.98' }, function(err, payload) {
    req.body.location = payload.country.en
    req.body.continent = payload.continent.en
    if (err) next(err)
  })


  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
