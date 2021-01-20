import json
import boto3
from boto3.dynamodb.conditions import Key
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('users')
def lambda_handler(event,context):
    event = event['queryStringParameters']
    blood = event['blood']
    print(blood)
    response = table.scan(FilterExpression=Key('blood_type').eq(blood))
    print(response['Items'])
    return {
        'statusCode':200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'body':json.dumps(response['Items'])
    }
    # return response['Items']