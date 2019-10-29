import { transformRequest, transformResponse } from 'hapi-lambda'

import { init } from './index'

let server

exports.handler = async (event) => {
  if (!server) {
    server = await init()
  }

  const req = transformRequest(event)
  req.headers['Access-Control-Allow-Origin'] = '*'
  req.headers['Access-Control-Allow-Credentials'] = true

  const response = await server.inject(req)

  return transformResponse(response)
}
