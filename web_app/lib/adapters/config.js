const nconf = require('nconf').argv().env({separator: '_', lowerCase: true})

module.exports = {
  postgres: {
    host: nconf.get('postgres:host'),
    port: nconf.get('postgres:port'),
    database: nconf.get('postgres:db'),
    user: nconf.get('postgres:user'),
    password: nconf.get('postgres:password')
  }
}
