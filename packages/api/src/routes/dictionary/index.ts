import * as Joi from '@hapi/joi'

import {
  deleteItemFromDictionary,
  getDictionary,
  patchDictionary
} from '../../services/dictionary'

export const dictionary = {
  name: 'dictionary',
  register: async (server, option) => {
    server.route({
      handler: (req, h) => getDictionary(),
      method: 'GET',
      options: {
        description: 'Retrieve cSpell config file',
        tags: ['api']
      },
      path: '/dictionary'
    })
    server.route({
      handler: (req, h) => patchDictionary(req.payload.words),
      method: 'PATCH',
      options: {
        description: 'Add new words to API',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            words: Joi.array().items(Joi.string())
          })
        }
      },
      path: '/dictionary'
    })
    server.route({
      handler: (req, h) => deleteItemFromDictionary(req.payload.words),
      method: 'DELETE',
      options: {
        description: 'Delete word from API',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            words: Joi.string()
          })
        }
      },
      path: '/dictionary'
    })
  },
  version: '1.0.0',
}
