import { healthcheck } from './routes/healthcheck'
import server from './server'
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

test('should resolve healthcheck url `/`', async (done) => {
  const options = {
      method: 'GET',
      url: '/'
  }
  const data = await server.inject(options)
  // @ts-ignore
  dB.createTable = jest.fn().mockResolvedValueOnce(true)

  expect(data.statusCode).toBe(200)
  expect(data.payload).toBe(JSON.stringify({ hapi: 'happy' }))
  done()
})
