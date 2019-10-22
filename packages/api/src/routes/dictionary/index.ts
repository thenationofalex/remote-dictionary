import * as Joi from '@hapi/joi'

import { deleteDictionary, getDictionary, patchDictionary } from '../../services/dictionary'

export const dictionary = [
  {
    method: 'GET',
    path: '/dictionary',
    options: {
      description: 'Retrieve cSpell config file',
      handler: (req, h) => getDictionary(),
      tags: ['api']
    }
  },
  {
    method: 'PATCH',
    path: '/dictionary',
    options: {
      description: 'Add new words to API',
      handler: (req, h) => patchDictionary(req.payload.words),
      tags: ['api'],
      validate: {
        payload: Joi.object({
          words: Joi.array().items(Joi.string())
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/dictionary',
    options: {
      description: 'Delete word from API',
      handler: (req, h) => deleteDictionary(req.payload.words),
      tags: ['api'],
      validate: {
        payload: Joi.object({
          words: Joi.string()
        })
      }
    }
  },
]
