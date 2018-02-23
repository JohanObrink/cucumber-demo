const {Before, After, Given, When, Then} = require('cucumber')
const {Builder, By, Key, until} = require('selenium-webdriver')
const {expect} = require('chai')
const {clearDb, insertUsers, getUrl} = require('./helpers')

const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay))

let browser

Before(async () => {
  await clearDb()
  browser = await new Builder().forBrowser('chrome').build()
})

After(async () => {
  await clearDb()
  await browser.quit()
})

Given(/The following users exist in the database/, async function (users) {
  await insertUsers(users.hashes())
})

When(/I try to login with the username "(.*)" and the password "(.*)"/, async function (username, password) {
  const url = getUrl('login page')
  await browser.get(url)

  await browser.findElement(By.name('username')).sendKeys(username)
  await browser.findElement(By.name('password')).sendKeys(password)

  // await wait(1000)
  await browser.findElement(By.name('submit')).click()
})

Then(/I should see the (.*)/, async function (pageName) {
  await browser.wait(until.urlIs(getUrl(pageName)))
})

Then(/There should be one error saying "(.*)"/, async function (expectedMessage) {
  // await wait(1000)
  const errorMessage = await browser.findElement(By.css('ul.errors > li')).getText()
  expect(errorMessage).to.equal(expectedMessage)
})

Then(/The headline should be "(.*)"/, async function (expectedGreeting) {
  // await wait(1000)
  const greeting = await browser.findElement(By.css('h1')).getText()
  expect(greeting).to.equal(expectedGreeting)
})
