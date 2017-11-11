const router = require('express').Router()
const { Interest } = require('../db/models')
module.exports = router

router.get(`/`, async (req, res, next) => {
  const interests = await Interest.findAll()
  res.json(interests)
  .catch(next)
})
