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
"requisitionDetails": {
"rules": [
{
"overrides": [
{
"overrideValue": "840",
"overrideCode": "amountCurrencyCode",
"sequence": "0"
},
{
"overrideValue": "55",
"overrideCode": "amountValue",
"sequence": "0"
}
],
"ruleCode": "VPAS"
}
],
"timeZone": "8",
"endDate": "2017-12-14",
"startDate": "2017-01-13"
},
"optionalInfo": [
{
"optionalFiledValue": "12345678901234567",
"optionalFieldName": "TWOTewst"
},
{
"optionalFiledValue": "12345112",
"optionalFieldName": "12345"
}
],
"numberOfCards": "1",
"action": "A",
"proxyPoolId": "12345",
"accountNumber": "1234567123456",
"buyerId": "107777",
"clientId": "B2BWS_107777_5126",
"messageId": "2017-12-03T05:28:29.000Z"
});

console.log(keyFile);
console.log(certificateFile);

var baseUri = 'vpa/v1/requisitionService/';
var resourcePath = '';
visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, mVisaTransactionRequest, 'POST', {},
function(err, responseCode) {
  if(!err) {
    assert.equal(responseCode, 200);
  } else {
    assert(false);
  }
});
