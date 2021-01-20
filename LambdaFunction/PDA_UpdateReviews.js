var AWS = require('aws-sdk'); 
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event,context, callback) => { 
    console.log(event);
    console.log(event.body);
    console.log(typeof(event.body)); 
    var reviews = JSON.parse(event.body);
    console.log(reviews); 
    console.log(reviews.date);
    console.log(reviews['date']);
    
var params = {
    TableName:"user_review",
    Key:{
        "id": reviews['id']
    },
    UpdateExpression: "set review = :r, username=:u, #dates=:d",
    ExpressionAttributeValues:{
        ":r":reviews['review'],
        ":u":reviews['username'],
        ":d": reviews['date']
    },
    ExpressionAttributeNames:{
    "#dates": "date"
  },
    ReturnValues:"UPDATED_NEW"
};
var result="Updating Item"; 
console.log("Updating the item...");
await docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        result="Error";
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        result="Success";
    }
});

    var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": result,
            "isBase64Encoded": false
        };
        callback(null, response);
};