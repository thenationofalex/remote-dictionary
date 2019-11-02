import * as Package from '../../package.json'

const { env } = process
const { version } = Package

export const Config = {
  app: {
    host: 'localhost',
    port: 3000,
    version
  },
  aws: {
    dynamo: {
      endpoint: env.DYNAMO_ENDPOINT || 'http://localhost:8000',
      region: env.NODE_ENV === 'local' ? 'local' : 'ap-southeast-2',
      tableName: env.DYNAMO_TABLE_NAME || 'Dictionary'
    }
  },
  swaggerOptions: {
    info: {
      title: 'Remote Dictionary API',
      version
    }
  }
}
