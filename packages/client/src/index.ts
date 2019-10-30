import {Command, flags} from '@oclif/command'
import axios from 'axios'
import {exec} from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import * as tmp from 'tmp'

class RemoteDictionaryClient extends Command {
  static description = 'Fetch cSpell dictionary from remote source'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    api: flags.string({
      char: 'a',
      description: 'API endpoint'
    }),
    src: flags.string({
      char: 's',
      default: 'src/**/*.js',
      description: 'Src directory to check e.g: `src/**/*.js`'
    })
  }

  async run() {
    const {flags} = this.parse(RemoteDictionaryClient)

    if (!flags.api) {
      this.log('Missing api endpoint - ending')
      return false
    }

    if (!flags.src) {
      this.log('Missing src params, using defaults')
    }

    try {
      this.log(`📡 Fetching word list from ${flags.api}`)
      const fetchedDictionary = await axios.get(flags.api)
        .then(resp => {
          const tmpFile = tmp.fileSync({mode: 0o644, postfix: '.json'})
          this.log(`📚 Saving tmp file to ${tmpFile.name}`)
          fs.writeFileSync(tmpFile.name, JSON.stringify(resp.data))
          return tmpFile
        })
        .catch(e => this.error(`Failed to fetch dictionary: ${e}`))

      this.log(`👓 Spell checking ${flags.src}`)
      const cSpellPath = `${path.resolve(__dirname, '..')}/node_modules/.bin/cspell`

      exec(`node ${cSpellPath} ${flags.src} --config ${fetchedDictionary.name}`, (_err, stdout, stderr) => {
        if (stdout) {
          this.log(stdout)
        }

        this.log(stderr)
        this.log('🧹 Cleaning up')
        fetchedDictionary.removeCallback()
      })

    } catch (e) {
      this.error(e)
    }
  }

}

export = RemoteDictionaryClient
