var AWS = require('aws-sdk');
var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event,context, callback) => { 
    console.log(event);
    console.log(event.body);
    console.log(typeof(event.body)); 
    var reviews = JSON.parse(event.body);
    console.log(reviews); 
    console.log(reviews.date);
    console.log(reviews['date']);
    
    var params = { 
  TableName: 'user_review',
  Item: {
   id:{S: reviews['username'].charAt(0)+Math.floor((Math.random() * 10) + 1)+reviews['username'].charCodeAt(0)+Math.floor((Math.random() * 100) + 1)+Math.floor((Math.random() * 1000) + 1)},
   review:{S:reviews['review']},
   date:{S:reviews['date']}, 
   username:{S: reviews['username']}
  }
};
console.log(params);  
var result='';
   db.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    result="Error";
  } else {
    console.log("Success", data);
    result="Data written successfully"
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