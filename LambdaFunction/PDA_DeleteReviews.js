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
    }
};
var result="Deleting Item"; 
console.log("Deleting the item...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        result="Error";
    } else {
        console.log("Delete succeeded:", JSON.stringify(data, null, 2));
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