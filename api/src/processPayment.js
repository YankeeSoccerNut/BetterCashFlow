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
"messageId": "2017-12-03T05:22:28.000Z",
"clientId": "B2BWS_1_1_9999",
"buyerId": 9999,
"actionType": 1,
"payment": {
"accountNumber": 4111111111111111,
"accountType": 2,
"accountLimit": 100,
"cardAccountExpiryDate": "10/2022",
"paymentGrossAmount": 200,
"currencyCode": "USD",
"paymentExpiryDate": "2017-03-10",
"paymentRequestDate": "2017-02-01",
"paymentType": "CCC",
"supplier": {
"supplierId": 111111,
"supplierName": "TestVPASupplier111111",
"supplierAddressLine1": "Address1",
"supplierAddressLine2": "Address2",
"supplierCity": "Austin",
"supplierState": "TX",
"supplierPostalCode": 78759,
"supplierCountryCode": "USA",
"primaryEmailAddress": "aaa@bbb.com",
"alternateEmailAddresses": [
{
"alternateEmailAddress": "aaa1@bbb.com"
},
{
"alternateEmailAddress": "aaa2@bbb.com"
},
{
"alternateEmailAddress": "aaa3@bbb.com"
},
{
"alternateEmailAddress": "aaa4@bbb.com"
},
{
"alternateEmailAddress": "aaa5@bbb.com"
}
],
"emailNotes": "Email Notes"
},
"invoices": [
{
"invoiceNumber": "INV01",
"invoiceDate": "2017-02-01",
"invoiceAmount": 100,
"purchaseOrderNumber": "PO1234",
"purchaseOrderDate": "2017-02-01"
},
{
"invoiceNumber": "INV02",
"invoiceDate": "2017-03-01",
"invoiceAmount": 200,
"purchaseOrderNumber": "PO1234",
"purchaseOrderDate": "2017-03-01"
}
]
}
});

console.log(keyFile);
console.log(certificateFile);


var baseUri = 'vpa/v1/payment/';
var resourcePath = 'ProcessPayments';
visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, mVisaTransactionRequest, 'POST', {},
function(err, responseCode) {
  if(!err) {
    assert.equal(responseCode, 200);
  } else {
    assert(false);
  }
});
