var request = require('request');

// Set the headers
var headers = {
    'Content-Type':'application/json'
}

//Current fundstransfer is a stub at USB bank...these are the hard-coded values
var body = JSON.stringify({
       "personalUserID" : "M01260604",
       "channelCode" : "OLB_MM",
       "transactionTypeCode" : "REGPMT",
       "fromOperatingCompanyIdentifier" : "288",
       "fromProductCode" : "DDA",
       "fromPrimaryAccountIdentifier" : "100100511516",
       "fromAccountType" : "SAVINGS",
       "toOperatingCompanyIdentifier" : "52",
       "toProductCode" : "CCD",
       "toPrimaryAccountIdentifier" : "4718240047142264",
       "requestedTransferAmount" : "200",
       "identityIdentifier" : "MOBLBNKG",
       "paymentType" : "OtherAmount",
       "paymentTypeCode" : "FUTUREPMTMADETHRUWEB",
       "effectiveDate" : "2016-01-21",
       "isRecurring" : "true",
       "selectedDayOfMOnth" : "25",
       "enhancedAutoPayTypeCode" : "F"
});
// Configure the request
var options = {
    url: 'https://api132269live.gateway.akana.com:443/fundstransfer',
    method: 'POST',
    headers: headers,
    body: body
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        var myTest = body.Status

        console.log(myTest);
        console.log(body);
        // Loop through the account list....
        // for (var account in body.AccessibleAccountDetailList) {
        //   console.log (account.ProductCode, account.BasicAccountDetail.Balances);
        // }

    } else {
      console.log(error)
    }
});
