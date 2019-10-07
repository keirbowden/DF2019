var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var config=require('../modules/config').config;

function login(driver)
{
    console.log('Opening Salesforce');
    driver.get(config.login);
    driver.wait(until.elementsLocated(By.name('username')), 10000).then (_ => console.log('About to login'));
    driver.findElement(By.name('username')).sendKeys(config.username);
    driver.findElement(By.name('pw')).sendKeys(config.password);
    driver.findElement(By.name('Login')).click();
}

exports.login=login;
