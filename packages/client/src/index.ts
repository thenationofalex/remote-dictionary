import {Command, flags} from '@oclif/command'
import axios from 'axios'
import * as fs from 'fs'
import * as tmp from 'tmp'

class RemoteDictionaryClient extends Command {
  static description = 'Fetch cSpell dictionary from remote source'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    api: flags.string({char: 'a', description: 'API endpoint'}),
    src: flags.string({char: 's', description: 'Src directory to check e.g: `src/**/*.js`'})
  }

  async run() {
    const {flags} = this.parse(RemoteDictionaryClient)

    if (!flags.api || !flags.src) {
      this.log('Missing params, using defaults')
      return false
    }

    try {
      axios.get(flags.api)
        .then(resp => {
          const tmpFile = tmp.fileSync({mode: 0o644, postfix: '.json'})
          fs.writeFileSync(tmpFile.name, JSON.stringify(resp.data))

          const tmpWords = require(tmpFile.name)

          tmpFile.removeCallback()
        })
        .catch(e => this.error(`Failed to fetch dictionary: ${e}`))
    } catch (e) {
      this.error(e)
    }
  }
}

export = RemoteDictionaryClient
