const express = require('express');
const cors = require('cors');
const { DescribeTableCommand } = require('@aws-sdk/client-dynamodb');
const dbClient = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/status/:region', async (req, res) => {
  const { region } = req.params;
  
  let dynamoDbStatus = 'Unknown';
  try {
    const command = new DescribeTableCommand({ TableName: 'sovereign-data-table' });
    await dbClient.send(command);
    dynamoDbStatus = 'Connected';
  } catch (err) {
    console.error(`DynamoDB Error [${region}]:`, err.message);
    dynamoDbStatus = 'Disconnected';
  }

  // Simulated metrics for effect
  const activeConnections = Math.floor(Math.random() * 500) + 150;
  const uptime = `${Math.floor(Math.random() * 30) + 1}d ${Math.floor(Math.random() * 24)}h`;

  res.json({
    status: 'ONLINE',
    region: region === 'ap-south-1' ? 'Mumbai (ap-south-1)' : 'Frankfurt (eu-west-1)',
    uptime,
    activeConnections,
    dynamoDbStatus
  });
});

app.listen(PORT, () => {
  console.log(`Sovereign Cloud Engine API running on port ${PORT}`);
});
