const express = require('express')
const router = express.Router()
const {login} = require('../services/user')

/* GET users listing. */
router.get('/me', (req, res, next) => {
  if (!req.session.user) {
    res.redirect(303, '/login')
  } else {
    res.render('profile', {title: 'Profile', user: req.session.user})
  }
})
router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login', username: '', password: '', errors: []})
})
router.post('/login', async (req, res, next) => {
  const {username, password} = req.body
  try {
    const user = await login({username, password})
    req.session.user = user
    res.redirect(303, '/me')
  } catch (err) {
    console.error(err)
    res.status(401).render('login', {title: 'Login', username, password, errors: ['Wrong username or password']})
  }
})

module.exports = router
