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

router.post(`/:userId`, (req, res, next) => {
  Message.create({ senderId: req.body.sender.id, receiverId: req.body.receiver.id, content: req.body.content, status: 'DRAFT', fromLocation: req.body.sender.location, toLocation: req.body.receiver.location })
    .then(message => res.json(message))
    .catch(next)
})

router.put(`/:userId`, (req, res, next) => {
  console.log(req.body)
  if (req.body.messageId) {
    Message.findById(req.body.messageId)
      .then(message => {
        message.update({ status: 'SENT' })
      })
      .catch(next)
  } else {
    Message.create({ senderId: req.body.sender.id, receiverId: req.body.receiver.id, content: req.body.content, status: 'SENT', fromLocation: req.body.sender.location, toLocation: req.body.receiver.location })
      .then(message => res.json(message))
      .catch(next)
  }
})
