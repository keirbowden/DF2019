/* eslint-disable no-console */
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var config=require('../modules/config').config;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get(config.login);
driver.wait(until.elementsLocated(By.name('username')), 10000);
driver.findElement(By.name('username')).sendKeys(config.username);

let text=driver.findElement(By.name('username')).getAttribute("value");
if (text===config.username) {
    console.log('Found text as expected');
}
else {
    console.log('Error - expected to find the keys I sent');
}

