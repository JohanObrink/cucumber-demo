const express = require('express')
const router = express.Router()
const {login} = require('../services/user')

/* GET users listing. */
router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.redirect(303, '/users/login')
  } else {
    res.render('profile', {title: 'Profile', user: req.session.user})
  }
})
router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login'})
})
router.post('/login', async (req, res, next) => {
  try {
    const user = await login(req.body)
    req.session.user = user
    res.redirect(303, '/users')
  } catch (err) {
    console.error(err)
    res.status(401).render('login', {title: 'Login', errors: ['Wrong username or password']})
  }
})

module.exports = router
