const pgp = require('pg-promise')()
const config = require('./config')

module.exports = {
  db: pgp(config.postgres),
  helpers: pgp.helpers
}
