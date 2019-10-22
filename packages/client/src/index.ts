import * as program from 'commander'
import * as shortid from 'shortid'
import * as tmp from 'tmp'

program
  .version('0.0.0-alpha')
  .option('-r, --remote', 'API Endpoint')
  .option('-d, --dir', 'Src directory')
  .parse(process.argv)
