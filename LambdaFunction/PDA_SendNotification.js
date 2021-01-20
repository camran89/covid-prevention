/*
const AWS = require("aws-sdk");

exports.handler = function (event, context, callback) {
    AWS.config.update({
        region: "us-east-1"
    });
    console.log('Handling confirmation email to', event);
    console.log('Handling confirmation email to', event.body); 
    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": "Completed SUccessfully",
        "isBase64Encoded": false
    };
    callback(null, response);
};
*/
const AWS = require("aws-sdk");

exports.handler = function (event, context) {
    AWS.config.update({
        region: "us-east-1"
    });
    console.log('Handling confirmation email to', event);

    //Method to handle whether the email is valid or not using regex
    // if (!event.email.match(/^[^@]+@[^@]+$/)) {
    //     console.log('Not sending: invalid email address', event);
    //     context.done(null, "Failed");
    //     return;
    // }

    // const name = event.name.substr(0, 40).replace(/[^\w\s]/g, '');
    // const name = "Gribesh"
    const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <p>Hi, We need your help. Please donate your plasma.</p>
        <p>...</p>
      </body>
    </html>
  `;

    const textBody = `
    Hi, We need your help. Please donate your plasma.
  `;

    const fromBase64 = Buffer.from('PDA Application').toString('base64');
    // event.email=["gribeshdhakal@gmail.com", "gribeshdhakal2019@gmail.com"];
    // Create sendEmail params
    const params = {
        Destination: {
            // ToAddresses: [event.email]
            ToAddresses: event.body['email']
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlBody
                },
                Text: {
                    Charset: "UTF-8",
                    Data: textBody
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Thanks for help"
            }
        },
        Source: `=?utf-8?B?${fromBase64}?= <gribeshdhakal@gmail.com>`,
    };

    // Create the promise and SES service object
    const sendPromise = new AWS.SES({
            apiVersion: "2010-12-01"
        })
        .sendEmail(params)
        .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
        .then(data => {
            console.log(data.MessageId);
            context.done(null, "Success");
        })
        .catch(err => {
            console.error(err, err.stack);
            context.done(null, "Failed");
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