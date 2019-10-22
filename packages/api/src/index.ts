import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiSwagger from 'hapi-swagger'

import { Config } from './config'
import routes from './routes'
import * as dB from './services/db'

const server = Hapi.server({
  host: Config.app.host,
  port: Config.app.port
})

const swaggerOptions = {
  info: {
    title: 'Remote Dictionary API',
    version: '0.0.1-alpha'
  }
}

const init = async () => {
  await dB.createTable()
  await server.register([
    Inert,
    Vision,
    {
      options: swaggerOptions,
      plugin: HapiSwagger
    }
  ])
  await server.route(routes)
  await server.start()

  console.log(`📚 dictionary running`)
}

init()

export default server
