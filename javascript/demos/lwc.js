var login=require('../modules/login');
var config=require('../modules/config').config;

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

login.login(driver);

driver.get('https://' + config.instance + '/lightning/n/SearchContacts');
driver.wait(until.elementsLocated(By.name('searchNameInput')), 10000).then (_ => console.log('Found search name input'));

driver.findElement(By.name('searchNameInput')).sendKeys('Sean');
driver.findElement(By.name('searchContacts')).click();

driver.wait(until.elementsLocated(By.xpath('//span[contains(text(), "sean@edge.com")]')), 10000).then (_ => console.log('Found expected result'));
