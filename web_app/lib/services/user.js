const {kdf, verifyKdf, params} = require('scrypt')
const {db, helpers: {insert}} = require('../adapters/postgres')

async function createUser ({username, password, firstName, lastName}) {
  const params = await params(0.1)
  const hashed = await kdf(password, params)
  password = hashed.toString('base64')

  const sql = insert({username, password, firstName, lastName}, null, 'users')

  const result = await db.any(sql)
  console.log('result')
  return result
}

async function login ({username, password}) {
  const user = await db.oneOrNone('SELECT * FROM users WHERE username = ${username}', {username})
  if (user) {
    console.log(user, password)
    const correct = await verifyKdf(Buffer.from(user.password, 'base64'), password)
    if (correct) {
      return user
    }
  }
  throw new Error('Wrong username or password')
}

module.exports = {
  createUser,
  login
}
