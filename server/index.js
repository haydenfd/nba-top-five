const AWS_SDK = require('aws-sdk')
require('dotenv').config()


AWS_SDK.config.update({
    region: process.env.REGION_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoDB = new AWS_SDK.DynamoDB({apiVersion: '2012-08-10'});

const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME, 
  };
  
  dynamoDB.describeTable(params, (err, data) => {
    if (err) {
      console.error('Error', err);
    } else {
      console.log('Success', data.Table);
    }
  });