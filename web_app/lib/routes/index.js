const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/health', function(req, res, next) {
  res.status(200).send({})
})

module.exports = router
