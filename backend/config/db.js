const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:4566',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
});

module.exports = client;
