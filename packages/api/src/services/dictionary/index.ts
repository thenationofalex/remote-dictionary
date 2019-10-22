import * as _ from 'lodash/fp'

import { Config } from '../../config'
import * as db from '../db'
import { IDictionary, IWord } from './interface'

const { aws: { dynamo: { tableName: TableName }} } = Config

export const getDictionary = async (): Promise<IDictionary|boolean> => {
  try {
    const getWords = await db.dynamodb.scan({ TableName }, (err, data) => {
      if (err) {
        return err
      }
      return data
    }).promise()

    const words = _.map((word: IWord) => word.word.S)(getWords.Items)

    return {
      dictionaries: ['typescript', 'node', 'npm', 'en-gb', 'companies', 'misc'],
      flagWords: [],
      language: 'en-GB',
      version: '0.1',
      words
    }
  } catch (e) {
    return false
  }
}

export const patchDictionary = (words: Array<string>): boolean => {
  try {
    _.each((word: string) => {
      db.dynamodb.putItem({
        Item: {
          word: {S: word}
        },
        TableName
      }, (err) => {
        if (err) {
          console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
        }
      })
    })(words)

    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const deleteDictionary = async (word: string): Promise<boolean> => {
  try {
    await db.dynamodb.deleteItem({
      Key: {
        word: {S: word}
      },
      TableName
    }, (err, data) => {
      if (err) {
        return err
      }
      return data
    }).promise()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
