import { Config } from '../../config'
import * as dB from '../db'
import { getDictionary } from './index'

test('gets word list', async () => {
  await dB.dynamodb.putItem({
    Item: { word: {S: 'foo'} },
    TableName: Config.aws.dynamo.tableName
  }).promise()

  expect(await getDictionary()).toMatchObject({ words: ['foo'] })
})
