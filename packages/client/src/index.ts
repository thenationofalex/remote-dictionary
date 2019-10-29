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
      // tslint:disable-next-line: no-http-string
      default: 'http://127.0.0.1:3000/dictionary',
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

    if (!flags.api || !flags.src) {
      this.log('Missing params, using defaults')
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

      // Run spell check
      this.log(`👓 Spell checking ${flags.src}`)
      const cSpellPath = `${path.resolve(__dirname, '..')}/node_modules/.bin/cspell`

      exec(`node ${cSpellPath} ${flags.src} --config ${fetchedDictionary.name}`, (err, stdout, stderr) => {
        if (err) {
          this.log(err.toString())
          //return
        }

        this.log(stdout)
        this.log(stderr)
        // Clean up
        this.log('🧹 Cleaning up')
        fetchedDictionary.removeCallback()
      })

    } catch (e) {
      this.error(e)
    }
  }

}

export = RemoteDictionaryClient
