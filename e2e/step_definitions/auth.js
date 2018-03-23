const {Given, When, Then} = require('cucumber')
const {insertUsers, getPage, wait} = require('./_helpers')

Given(/The following users exist in the database/, async function (users) {
  await insertUsers(users.hashes())
})

When(/I try to login with the username "(.*)" and the password "(.*)"/, async function (username, password) {
  this.page = getPage('login')
  await this.page.goto()
  // await wait(1000)
  await this.page.login(username, password)
})

Then(/I should see the (.*) page/, async function (pageName) {
  const page = getPage(pageName)
  // await page.isCurrent()
  this.page = page
})

Then(/There should be one error saying "(.*)"/, async function (errorMessage) {
  // await wait(1000)
  await this.page.assertErrorMessage(errorMessage)
})

Then(/The headline should be "(.*)"/, async function (greeting) {
  // await wait(1000)
  await this.page.assertHeadline(greeting)
})
