const Page = require('./Page')

const url = '/me'

class ProfilePage extends Page {
  constructor () {
    super(url)
  }
  async assertHeadline (text) {
    return this.browser
      .assert
      .containsText('h1', text)
  }
}

module.exports = () => new ProfilePage()
