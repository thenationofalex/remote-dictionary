import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiSwagger from 'hapi-swagger'

import { Config } from './config'
import { dictionary } from './routes/dictionary'
import { healthcheck } from './routes/healthcheck'
import server from './server'
import * as dB from './services/db'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  await dB.createTable()
  await server.register([
    Inert,
    Vision,
    {
      options: Config.swaggerOptions,
      plugin: HapiSwagger
    },
    dictionary,
    healthcheck
  ])

  let path = event.path || '/'

  if (event.queryStringParameters) {
    const qs = Object.keys(event.queryStringParameters).map((key) => key + '=' + event.queryStringParameters[key])
    if (qs.length > 0) {
      path += '?' + qs.join('&')
    }
  }

  const options = {
    headers: event.headers,
    method: event.httpMethod,
    payload: event.body,
    url: path,
    validate: false,
  }

  const res = await server.inject(options)
  delete res.headers['content-encoding']
  delete res.headers['transfer-encoding']

  res.headers['Access-Control-Allow-Origin'] = '*'
  res.headers['Access-Control-Allow-Credentials'] = true

  const response = {
    body: typeof res.result === 'string' ? res.result : JSON.stringify(res.result),
    headers: res.headers,
    statusCode: res.statusCode,
  }

  return response

}
