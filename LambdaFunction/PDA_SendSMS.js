var AWS = require('aws-sdk');
var SNS = new AWS.SNS();



exports.handler = async (event,context, callback) => { 
    console.log(event)
    console.log(event.body)
    console.log(typeof(event.body))
    var phonenumber = JSON.parse(event.body)
    console.log(phonenumber['phone'])  
    var params = {
    PhoneNumber:phonenumber['phone'],  
    Message: 'Hey this is alert from PDA.',
    MessageAttributes:{
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        },
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: 'AlertPDA'
        },
    }
};
    new Promise(function(resolve, reject) {
        SNS.publish(params, function(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
    var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": "Completed Successfully",
            "isBase64Encoded": false
        };
        callback(null, response);
};