const { env } = process

export const Config = {
  app: {
    host: 'localhost',
    port: 3000,
  },
  aws: {
    dynamo: {
      endpoint: env.DYNAMO_ENDPOINT || 'http://localhost:8000',
      region: env.NODE_ENV === 'local' ? 'local' : 'ap-southeast-2',
      tableName: env.DYNAMO_TABLE_NAME || 'Dictionary'
    }
  }
}
