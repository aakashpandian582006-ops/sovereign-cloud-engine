const express = require('express');
const cors = require('cors');
const { DescribeTableCommand } = require('@aws-sdk/client-dynamodb');
const dbClient = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Geographic sovereignty middleware
const sovereigntyVerification = (req, res, next) => {
  const userRegion = req.headers['x-user-region'] || req.query.region || 'ap-south-1';
  req.sovereigntyZone = userRegion === 'eu-west-1' ? 'Frankfurt Hub (EU)' : 'Mumbai Hub (AP)';
  
  // Enforce cross-border compliance rules
  if (userRegion === 'eu-west-1') {
    req.complianceLevel = 'STRICT_GDPR';
    req.dynamoTable = 'SovereignRecords'; 
  } else {
    req.complianceLevel = 'STANDARD_AP';
    req.dynamoTable = 'SovereignRecords';
  }
  next();
};

app.use(sovereigntyVerification);

app.get('/api/status', async (req, res) => {
  let dynamoDbStatus = 'Unknown';
  try {
    const command = new DescribeTableCommand({ TableName: req.dynamoTable });
    await dbClient.send(command);
    dynamoDbStatus = 'Connected';
  } catch (err) {
    console.error(`DynamoDB Error [${req.sovereigntyZone}]:`, err.message);
    dynamoDbStatus = 'Disconnected';
  }

  // Simulated metrics matching the complex UI layout requirements
  const activeConnections = Math.floor(Math.random() * 500) + 1200;
  const uptime = `${Math.floor(Math.random() * 30) + 1}d ${Math.floor(Math.random() * 24)}h`;
  const requests = Math.floor(Math.random() * 10000) + 20000;

  res.json({
    status: 'ONLINE',
    region: req.sovereigntyZone,
    complianceLevel: req.complianceLevel,
    uptime,
    activeConnections,
    dynamoDbStatus,
    telemetry: {
      requests,
      cpu: `${Math.floor(Math.random() * 40) + 20}%`,
      memory: `${Math.floor(Math.random() * 30) + 40}%`
    }
  });
});

app.listen(PORT, () => {
  console.log(`[CORE GATEWAY] Sovereign Cloud Engine API listening on port ${PORT}`);
});
