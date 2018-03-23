const nconf = require('nconf').argv().env({separator: '_', lowerCase: true})
const {kdfSync, params} = require('scrypt')
const pgp = require('pg-promise')()
const db = pgp(nconf.get('database:url'))
const reqdir = require('require-dir')

async function clearDb () {
  await db.tx(t => t.batch([
    t.none('TRUNCATE TABLE users')
  ]))
}

const pages = reqdir('../pages')
function getPage (name) {
  if (pages[name]) {
    return pages[name]()
  } else {
    throw new Error (`No such page found: '${name}'`)
  }
}

async function insertUsers (users) {
  const p = await params(0.1)
  await db.tx(t => {
    const inserts = users
      .map(user => {
        user = Object.assign({}, user)
        const hash = kdfSync(user.password, p)
        user.password = hash.toString('base64')
        const sql = pgp.helpers.insert(user, null, 'users')
        return t.any(sql)
      })
    return t.batch(inserts)
  })
}

const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay))

module.exports = {
  clearDb,
  getPage,
  insertUsers,
  wait
}
