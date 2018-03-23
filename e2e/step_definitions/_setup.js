const {BeforeAll, Before, After, AfterAll} = require('cucumber')
const {clearDb} = require('./_helpers')

BeforeAll(() => {})

AfterAll(() => {
  // You're my Wonderwall!
})

Before(async function() {
  await clearDb()
})

After(async function () {
  await clearDb()
})
