const AWS_SDK = require('aws-sdk')
const express = require('express')
const cors = require('cors')
const PORT = 8000

require('dotenv').config()

const app = express()
app.use(cors())

AWS_SDK.config.update({
    region: process.env.REGION_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoDB = new AWS_SDK.DynamoDB({apiVersion: '2012-08-10'});

const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME, 
  };

  
//   dynamoDB.describeTable(params, (err, data) => {
//     if (err) {
//       console.error('Error', err);
//     } else {
//       console.log('Success', data.Table);
//     }
//   });
async function getRandomItems(tableName, numberOfItems) {
    const params = {
        TableName: tableName,
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        const items = data.Items;
        const randomItems = [];

        // Shuffle array and pick first N items
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        for (let i = 0; i < numberOfItems && i < items.length; i++) {
            randomItems.push(items[i]);
        }

        return randomItems;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const processData = (data) => {
    return data.map(item => {
      const processedItem = {};
      Object.keys(item).forEach(key => {
        const valueObject = item[key];
        // Check if the value is of type 'N' (Number)
        if (valueObject.hasOwnProperty('N')) {
          // Convert 'N' values from string to float
          processedItem[key] = parseFloat(valueObject.N);
        } else if (valueObject.hasOwnProperty('S')) {
          // Directly assign 'S' values
          processedItem[key] = valueObject.S;
        }
        // Add more conditionals here if you have other types like 'B', 'BOOL', etc.
      });
      return processedItem;
    });
  };
  
  // Example usage with the
  

app.get('/', (req, res) => {

    const tableName = 'TopFive';
    const numberOfItems = 5;
    getRandomItems(tableName, numberOfItems).then(randomItems => {
        res.send({"data": processData(randomItems)})
})
   
})

app.listen(PORT, () => {

})