import boto3
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('users')
def lambda_handler(event, context):
    # TODO implement
    print(event)
    event = event['queryStringParameters']
    email = event['email']
    data = {"email":email}
    print("This is email:   " + email)
    print("This is data")
    print(data)
    table.put_item(Item=event)
    return {
        'statusCode':200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'body':'Registration successful'
    }
    # return {"code":200, 'headers': {"Content-Type": "application/json","Access-Control-Allow-Origin":"*"},"message":""}

