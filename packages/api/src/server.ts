import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiSwagger from 'hapi-swagger'

import { Config } from './config'
import { dictionary } from './routes/dictionary'
import { healthcheck } from './routes/healthcheck'
const { app: { host, port, version }, swaggerOptions } = Config
import * as dB from './services/db'

const server = Hapi.server({
  compression: {
    minBytes: 1024
  },
  host,
  port,
})

export const init = async () => {
  await dB.createTable()
  await server.register([
    Inert,
    Vision,
    {
      options: swaggerOptions,
      plugin: HapiSwagger
    },
    dictionary,
    healthcheck
  ])
  await server.start()
  console.log(`📚 dictionary running - ${host}:${port} - ${version}`)
}

export default server
