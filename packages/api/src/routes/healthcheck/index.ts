export const healthcheck = {
  name: 'healthcheck',
  register: async (server, option) => {
    server.route({
      handler: (req, h) => ({hapi: 'happy'}),
      method: 'GET',
      options: {
        description: 'API Status',
        tags: ['api']
      },
      path: '/'
    })
  },
  version: '1.0.0'
}
