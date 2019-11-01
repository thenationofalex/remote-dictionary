export const healthcheck = {
  method: 'GET',
  options: {
    description: 'API Status',
    handler: (req, h) => ({hapi: 'happy'}),
    tags: ['api']
  },
  path: '/'
}
