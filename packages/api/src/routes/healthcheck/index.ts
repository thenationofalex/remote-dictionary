export const healthcheck = {
  method: 'GET',
  path: '/version',
  options: {
    description: 'API Status',
    handler: (req, h) => ({hapi: 'happy'}),
    tags: ['api']
  }
}
