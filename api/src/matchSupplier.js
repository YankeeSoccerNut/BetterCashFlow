var request = require('request');
var fs = require('fs');
var config = require('../config/configuration.json');
var VisaAPIClient = require('../libs/visaapiclient.js');
var assert = require('chai').assert;
var randomstring = require('randomstring');

var req = request.defaults();
var userId = config.userId ;
var password = config.password;
var keyFile = config.key;
var certificateFile = config.cert;

var visaAPIClient = new VisaAPIClient();
var strDate = new Date().toISOString().replace(/Z/, '').replace(/\..+/, '');
var mVisaTransactionRequest = JSON.stringify({
"messageId": "2017-12-03T02:56:15.000Z",
"clientId": "B2BWS_1_1_9999",
"buyerId": 9999,
"accountNumber": 4111111111111111,
"proxyPoolId": "M7test",
"employee": {
"firstName": "fname",
"lastName": "lname",
"employeeId": 772288,
"companyAdminEMailId": "compAdmin@bbb.com",
"eMailId": "aaa1@bbb.com",
"costCenter": 12,
"gl": 12,
"address": {
"addressLine1": "Address1",
"addressLine2": "Address2",
"city": "FC",
"state": "CA",
"postalCode": 94404,
"countryCode": "USA"
}
},
"optionalField1": "optionalField1",
"optionalField2": "optionalField2",
"optionalField3": "optionalField3",
"optionalField4": "optionalField4",
"optionalField5": "optionalField5",
"requisitionDetails": [
{
"startDate": "2017-02-01",
"endDate": "2020-03-01",
"timeZone": "UTC-6",
"rules": [
{
"ruleCode": "VPAS",
"overrides": [
{
"sequence": 0,
"overrideCode": "amount",
"overrideValue": 840
},
{
"sequence": 0,
"overrideCode": "amount",
"overrideValue": 55
}
]
}
]
}
]
});

console.log(keyFile);
console.log(certificateFile);

// https://sandbox.api.visa.com/visasuppliermatchingservice/v1/search?supplierName=supplier1&supplierCountryCode=840

var baseUri = 'visasuppliermatchingservice/v1/';
var resourcePath = 'search?supplierName=supplier1&supplierCountryCode=840';
visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, mVisaTransactionRequest, 'POST', {},
function(err, responseCode) {
  if(!err) {
    assert.equal(responseCode, 200);
  } else {
    assert(false);
  }
});
