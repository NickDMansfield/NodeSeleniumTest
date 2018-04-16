var webdriver = require('selenium-webdriver');
const should = require('should');
const assert = require('assert');
const test = require('selenium-webdriver/testing');
const until = webdriver.until;


const feID = function(str) {
  try {
    return fe(webdriver.By.id, str);
  }catch(ex) {
    return null;
  }
};
const fe = function(type, str) {
  return driver.findElement(type(str));
}
const feCN = function(str) {
  try {
    return fe(webdriver.By.className, str);
  }catch(err) {
    return null;
  }
};
const feName = function(str) {
  try {
    return fe(webdriver.By.name, str);
  }catch(err) {
    return null;
  }
};

var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

   test.describe("Check Login", function() {
   test.it("should login successfully", function() {
     driver.get('https://app.freightrover.com');
     var emailField = feName('Email');
     emailField.sendKeys("email");
     var passwordField = feName('Password');
     passwordField.sendKeys("password");
     feCN('btn btn-success btn-lg col-xs-12 signin_icon ').click();

     // Open settings
     feCN('icon frw-settings pull-left').click();
     feID('UserProfile').click();
     driver.sleep(500);
    feCN('settings-tab').click();
     driver.wait(until.elementLocated(webdriver.By.id("FirstName")));
     feID('FirstName').getAttribute('value').then(firstNameVal => {
       assert.equal(firstNameVal,'tommy');
     });
  });

  test.it("should have correct last name", function() {
    feID("LastName").getAttribute('value').then(lastNameVal => {
      assert.equal(lastNameVal,'test');
    });
 });

 test.it("should change first and last name", function () {
   const txtFirstName = feID("FirstName");
   const txtLastName = feID("LastName");
   txtFirstName.clear();
   txtFirstName.sendKeys("tommy");
   txtLastName.clear();
   txtLastName.sendKeys("test");
   driver.sleep(3000);
   if (feID("Save-User") != null) {
     feID("Save-User").click();
   }
   driver.sleep(3000);
 });
});
