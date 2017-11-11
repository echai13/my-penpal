const router = require('express').Router()
const { Message } = require('../db/models')
module.exports = router

router.get('/:userId/received', (req, res, next) => {
  Message.findAll({
    where: {
      receiverId: req.params.userId,
      status: 'DELIVERED'
    }
  })
    .then(messages => {
      res.json(messages)
    })
    .catch(next)
})

router.get('/:userId/sent', (req, res, next) => {
  Message.findAll({
    where: {
      senderId: req.params.userId,
      status: 'SENT' || 'DELIVERED'
    }
  })
    .then(messages => {
      res.json(messages)
    })
    .catch(next)
})

router.get('/:userId/drafts', (req, res, next) => {
  Message.findAll({
    where: {
      senderId: req.params.userId,
      status: 'DRAFT'
    }
  })
    .then(messages => res.json(messages))
})
