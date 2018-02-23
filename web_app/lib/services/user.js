const {kdf, verifyKdf, params} = require('scrypt')
const db = require('../adapters/postgres')

async function createUser ({username, password, firstName, lastName}) {
  const params = await params(0.1)
  const hashed = await kdf(password, params)
  password = hashed.toString('base64')

  const result = await db.any(`
    INSERT INTO users(username, password, firstName, lastName)
    VALUES(\${username}, \${password}, \${firstName}, \${lastName})
  `, {username, password, firstName, lastName})
  console.log('result')
  return result
}

async function login ({username, password}) {
  const user = await db.any('SELECT * FROM users WHERE username = ${username}')
  const correct = await verifyKdf(user.password, password)
  if (correct) {
    return user
  } else {
    throw new Error('Wrong username or password')
  }
}

module.exports = {
  createUser,
  login
}
