import * as Joi from '@hapi/joi'

import { deleteDictionary, getDictionary, patchDictionary } from '../../services/dictionary'

export const dictionary = [
  {
    method: 'GET',
    options: {
      description: 'Retrieve cSpell config file',
      handler: (req, h) => getDictionary(),
      tags: ['api']
    },
    path: '/dictionary'
  },
  {
    method: 'PATCH',
    options: {
      description: 'Add new words to API',
      handler: (req, h) => patchDictionary(req.payload.words),
      tags: ['api'],
      validate: {
        payload: Joi.object({
          words: Joi.array().items(Joi.string())
        })
      }
    },
    path: '/dictionary'
  },
  {
    method: 'DELETE',
    options: {
      description: 'Delete word from API',
      handler: (req, h) => deleteDictionary(req.payload.words),
      tags: ['api'],
      validate: {
        payload: Joi.object({
          words: Joi.string()
        })
      }
    },
    path: '/dictionary'
  },
]
