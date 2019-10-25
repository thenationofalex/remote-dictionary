import server from './index'
import * as dB from './services/db'
jest.mock('./services/db')

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
  // @ts-ignore
  dB.createTable = jest.fn().mockResolvedValueOnce(true)

  expect(data.statusCode).toBe(200)
  expect(data.payload).toBe(JSON.stringify({ hapi: 'happy' }))
  done()
})
