import { concat } from 'lodash/fp'

import { dictionary } from './dictionary'
import { healthcheck } from './healthcheck'

export default concat(dictionary, healthcheck)
