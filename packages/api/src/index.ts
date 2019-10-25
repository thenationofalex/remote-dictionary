import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiSwagger from 'hapi-swagger'
import * as Package from '../package.json'

import { Config } from './config'
import routes from './routes'
import * as dB from './services/db'

const { app: { host, port } } = Config
const server = Hapi.server({ host, port })

const swaggerOptions = {
  info: {
    title: 'Remote Dictionary API',
    version: Package.version
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
  console.log(`📚 dictionary running - ${host}:${port} - ${Package.version}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

export default server
