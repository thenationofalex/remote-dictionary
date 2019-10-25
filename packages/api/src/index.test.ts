import server from './index'

beforeAll((done) => {
  server.events.on('start', () => {
    done()
  })
})

afterAll((done) => {
  server.events.on('stop', () => {
    done()
  })
  server.stop()
})

test('should success with healthcheck', async (done) => {
  const options = {
      method: 'GET',
      url: '/healthcheck'
  }
  const data = await server.inject(options)
  expect(data.statusCode).toBe(200)
  expect(data.payload).toBe(JSON.stringify({ hapi: 'happy' }))
  done()
})
