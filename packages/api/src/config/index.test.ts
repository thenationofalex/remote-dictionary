
const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules()
  process.env = { ...OLD_ENV };
  delete process.env.NODE_ENV;
});

afterEach(() => {
  process.env = OLD_ENV;
});

test('Dynamo Region - Local', () => {
  process.env.NODE_ENV = 'local'

  const { Config } = require('./index')
  expect(Config.aws.dynamo.region).toBe('local')
})
