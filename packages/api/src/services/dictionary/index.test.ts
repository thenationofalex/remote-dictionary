import { Config } from '../../config'
import * as dB from '../db'
import {
  deleteItemFromDictionary,
  getDictionary,
  patchDictionary
} from './index'

const TableName = Config.aws.dynamo.tableName

const putItem = async () => dB.dynamodb.putItem({
  Item: { word: {S: 'foo'} },
  TableName: Config.aws.dynamo.tableName
}).promise()

test('gets word list', async () => {
  await putItem()

  expect(await getDictionary()).toMatchObject({ words: ['foo'] })
})

test('patch word list', async () => {
  await putItem()
  const wordsToAdd = ['word']

  expect(await patchDictionary(wordsToAdd)).toBe(true)
})

test('delete word from list', async () => {
  const wordTodelete = 'foo'

  await dB.dynamodb.deleteItem({
    Key: {
      word: {S: wordTodelete}
    },
    TableName
  }).promise()

  expect(await deleteItemFromDictionary(wordTodelete)).toBe(true)
})
