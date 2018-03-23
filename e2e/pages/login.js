const Page = require('./Page')

const url = '/login'

class LoginPage extends Page {
  constructor () {
    super(url)
  }
  async login (username, password) {
    return this.browser
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .click('input[type=submit]')
  }
  async assertErrorMessage (msg) {
    return this.browser
      .assert
      .containsText('ul.errors > li', msg)
  }
}

module.exports = () => new LoginPage()
