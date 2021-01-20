var response ={
    resource: '/sendemailnotification',
    path: '/sendemailnotification',
    httpMethod: 'POST',
    headers: {
        '"Content-Type"': '"application/json"'
    },
    multiValueHeaders: {
        '"Content-Type"': ['"application/json"']
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
        resourceId: '6q2en5',
        resourcePath: '/sendemailnotification',
        httpMethod: 'POST',
        extendedRequestId: 'Wu2WXEnaIAMFVjg=',
        requestTime: '28/Nov/2020:18:58:10 +0000',
        path: '/sendemailnotification',
        accountId: '731082486540',
        protocol: 'HTTP/1.1',
        stage: 'test-invoke-stage',
        domainPrefix: 'testPrefix',
        requestTimeEpoch: 1606589890300,
        requestId: '0dc174e8-ca75-4839-81a3-d56f46bd7426',
        identity: {
            cognitoIdentityPoolId: null,
            cognitoIdentityId: null,
            apiKey: 'test-invoke-api-key',
            principalOrgId: null,
            cognitoAuthenticationType: null,
            userArn: 'arn:aws:iam::731082486540:root',
            apiKeyId: 'test-invoke-api-key-id',
            userAgent: 'aws-internal/3 aws-sdk-java/1.11.864 Linux/4.9.217-0.3.ac.206.84.332.metal1.x86_64 OpenJDK_64-Bit_Server_VM/25.262-b10 java/1.8.0_262 vendor/Oracle_Corporation',
            accountId: '731082486540',
            caller: '731082486540',
            sourceIp: 'test-invoke-source-ip',
            accessKey: 'ASIA2UN7JOMGNA5HSSKC',
            cognitoAuthenticationProvider: null,
            user: '731082486540'
        },
        domainName: 'testPrefix.testDomainName',
        apiId: '4x7nowvr36'
    },
    body: '{\n    "email":"gribeshdhakal@gmail.com"\n}',
    isBase64Encoded: false
}
// console.log(response.body)
// console.log(typeof(response.body))

var value= {
    "email": [
        "test2@yahoo.com",
        "test@gmail.com"
    ]
}
console.log(value['email'])