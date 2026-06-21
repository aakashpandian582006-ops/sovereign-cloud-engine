#!/bin/bash
echo "Initializing LocalStack infrastructure..."
awslocal dynamodb create-table \
    --table-name SovereignRecords \
    --attribute-definitions AttributeName=Id,AttributeType=S \
    --key-schema AttributeName=Id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region ap-south-1
echo "Table SovereignRecords created in ap-south-1"
