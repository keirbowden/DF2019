var login=require('../modules/login');

var config=require('../modules/config').config;

/* eslint-disable no-console */
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

login.login(driver);

driver.get('https://' + config.instance + '/lightning/o/Opportunity/list');
driver.wait(until.elementsLocated(By.className('forceObjectHomeDesktop')), 10000).then (() => console.log('Found object home'));
