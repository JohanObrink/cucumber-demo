const pgp = require('pg-promise')()
const config = require('./config')

module.exports = pgp(config.postgres)
