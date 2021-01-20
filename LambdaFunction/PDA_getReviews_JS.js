var AWS = require("aws-sdk"); 
var documentClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => { 
    // TODO implement
    const params = {
        TableName: "user_review", 
    }; 

    let scanResults = [];  
    let items;
    do{
        items =  await documentClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");

    // return scanResults;
    
    const response = {
		statusCode: 200,
		headers: {
		    'Content-Type': 'application/json', 
			'Access-Control-Allow-Origin': '*'
		},
		isBase64Encoded: false,
		body: JSON.stringify(scanResults, undefined, 4)
	};
	return response;
};
