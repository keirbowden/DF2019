var login=require('../modules/login');
var config=require('../modules/config').config;

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

login.login(driver);

// Wait for the new opportunity page/button to load
driver.get('https://' + config.instance + '/lightning/o/Opportunity/list');
driver.wait(until.elementsLocated(By.className('forceObjectHomeDesktop')), 10000).then (_ => console.log('Found object home'));
driver.findElement(By.className('forceObjectHomeDesktop')).then(function(ele){
    console.log('Found desktop home eles');
    driver.wait(until.elementsLocated(By.css('a[title="New"]')), 10000).then (_ => console.log('Found object home'));
    ele.findElement(By.css('a[title="New"]')).click();
});    

// Populate opportunity name
driver.wait(until.elementsLocated(By.xpath('//label/span[contains(text(), "Opportunity Name")]')), 10000).then (_ => console.log('Found Opportunity Name label'));
driver.findElement(By.xpath('//label/span[contains(text(), "Opportunity Name")]/../../input')).sendKeys('Keir Test Opportunity');

// Populate the account details
driver.findElement(By.xpath('//label/span[contains(text(), "Account Name")]/../..//input')).sendKeys('GenePoint');
driver.wait(until.elementsLocated(By.xpath('//div[@title="GenePoint"]')), 10000).then (_ => console.log('GenePoint in dropdown!'));
driver.findElement(By.xpath('//div[@title="GenePoint"]/../..')).click();

// Populate the other required fields
driver.findElement(By.xpath('//label/span[contains(text(), "Amount")]/../../input')).sendKeys('100000');
driver.findElement(By.xpath('//label/span[contains(text(), "Close Date")]/../..//input')).sendKeys('21/12/2019');

// Choose Qualification from the Stage picklist
driver.findElement(By.xpath('//span[contains(@class, "label")]/span[contains(text(), "Stage")]/../..//a')).click();
driver.findElement(By.xpath('//a[@title="Qualification"]')).click();

// Save the record
driver.findElement(By.xpath('//button[@title="Save"]')).click();

// Wait until the view page is rendered
driver.wait(until.elementsLocated(By.xpath('//span[contains(@class, "uiOutputText") and contains(text(), "Keir Test Opportunity")]')), 10000).then (_ => console.log('On oppportunity view page'));
