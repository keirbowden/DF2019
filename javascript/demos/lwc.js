/* eslint-disable no-console */
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

driver.wait(until.elementsLocated(By.tagName('c-search-contacts')), 10000).then (() => console.log('Found search contacts component'));

driver.findElement(By.tagName('c-search-contacts'))
.then((shadowHost) => {
                console.log('Getting shadow root');
                return driver.executeScript("return arguments[0].shadowRoot",
                shadowHost)})
.then((result) => {
                console.log('Got shadow root');
                result.findElement(By.name('searchNameInput')).sendKeys('Sean');
                driver.sleep(3000);

                result.findElement(By.name('searchContacts')).click();
                driver.sleep(3000);
                
                return result.findElement(By.css("[id^=searchContactsResults]"));
                })
.then((ele) => {
                return driver.wait(() =>
                    ele.findElements(By.xpath('//span[contains(text(), "sean@edge.com")]'))
                    .then(elements => {
                      let result=false;
                      if(elements.length !== 0){
                        result=elements[0];
                      }
                      return result;
                    }), 5000);                                 
})
.then(() => console.log('Found results with sean@edge.com'));
