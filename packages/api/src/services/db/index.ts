import * as AWS from 'aws-sdk'
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service'
import * as _ from 'lodash/fp'

import { Config } from '../../config'

const serviceConfigurationOptions: ServiceConfigurationOptions = {
  endpoint: Config.aws.dynamo.endpoint,
  region: Config.aws.dynamo.region
}

const dynamodb = new AWS.DynamoDB(serviceConfigurationOptions)

const params = {
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
  TableName: Config.aws.dynamo.tableName
}

const createTable = async () => dynamodb.createTable(params, (err) => {
  if (err) {
    if (_.has('code')(err) && err.code === 'ResourceInUseException') {
      return false
    }
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
  } else {
    console.log('Created table')
  }
})

export {
  dynamodb,
  createTable
}
