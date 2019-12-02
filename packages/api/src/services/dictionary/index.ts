import * as _ from 'lodash/fp'

import { Config } from '../../config'
import * as db from '../db'
import { IDictionary, IWord } from './interface'

const { aws: { dynamo: { tableName: TableName }} } = Config

export const getDictionary = async (): Promise<IDictionary|boolean> => {
  try {
    const getWords = await db.dynamodb.scan({
      TableName
    }, (err, data) => {
      if (err) {
        return err
      }
      return data
    }).promise()

    const words = !_.isEmpty(getWords.Items)
      ? _.map((Item: IWord) => Item.word.S)(getWords.Items)
      : []

    return {
      dictionaries: ['typescript', 'node', 'npm', 'en-gb', 'companies', 'misc'],
      flagWords: [],
      language: 'en-GB',
      version: '0.1',
      words
    }
  } catch (e) {
    console.error(e)
    return false
  }
}

export const patchDictionary = async (words: Array<string>): Promise<boolean> => {
  const wordList = []
  const formatWordItems = (word: string) => new Promise((resolve) => wordList.push({
    PutRequest: {
      Item: { word: { S: _.lowerCase(word) } }
    }
  }))

  const prepareWordList = _.each((word: string) => formatWordItems(word))(words)

  return Promise.all(prepareWordList)
    .then(async () => {
      try {
        await db.dynamodb.batchWriteItem({
          RequestItems: {
            [TableName]: wordList
          }
        }, (err) => {
          if (err) {
            console.error('Unable to add item.', JSON.stringify(err))
          }
        }).promise()
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    })
}

export const deleteItemFromDictionary = async (word: string): Promise<boolean> => {
  try {
    await db.dynamodb.deleteItem({
      Key: {
        word: {S: word}
      },
      TableName
    }, (deleteErr, deleteData) => {
      if (deleteErr) {
        return deleteErr
      }
      return deleteData
    }).promise()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
