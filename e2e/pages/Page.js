const {URL} = require('url')
const {client} = require('nightwatch-cucumber')
const nconf = require('nconf').argv().env({separator: '_', lowerCase: true})
const host = nconf.get('app:host')

class Page {
  constructor (url) {
    this.url = new URL(url, host).href
    this.adminMenu = 'nav ul li.admin'
    this.browser = client
  }
  async goto () {
    return this.browser.url(this.url).waitForElementVisible('body', 1000)
    return this
  }
  async isCurrent () {
    return this.browser
      .assert
      .urlEquals(this.url)
  }
}

module.exports = Page
