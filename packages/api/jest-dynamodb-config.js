module.exports = {
  tables: [
    {
      TableName: 'Dictionary',
      AttributeDefinitions: [
        { AttributeName: 'word', AttributeType: 'S'}
      ],
      KeySchema: [
        { AttributeName: 'word', KeyType: 'HASH'}
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 5
      },
    },
  ],
};
