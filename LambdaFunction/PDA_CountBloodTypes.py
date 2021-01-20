import json
import boto3
from boto3.dynamodb.conditions import Key
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('users')

def lambda_handler(event,context):
    grps = ["O Positive","A Positive","B Positive","AB Positive","O Negative","A Negative","B Negative","AB Negative"]
    vals = []
    for i in grps:
        response = table.scan(FilterExpression=Key('blood_type').eq(i))
        vals.append(len(response['Items']))
    returnObj = {
      "returnObj":vals  
    }
    return {
        'statusCode':200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'body': json.dumps(returnObj['returnObj']) 
    }
    # return vals
