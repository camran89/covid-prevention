import boto3
import json
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('users')
def lambda_handler(event,context):
    event = event['queryStringParameters']
    email=event['email']
    print(email)
    resp = table.get_item(Key={"email":email})
    return {
        'statusCode':200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'body':json.dumps(resp['Item'])
    }
    #return resp['Item']
