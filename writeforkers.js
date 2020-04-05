import { getForkers } from './src/scripts/api'
import fs from 'fs'

async function init() {
  const APIBASEURL = 'https://api.github.com/repos'
  const GITUSER = 'cmda-minor-web'
  const REPONAME = 'progressive-web-apps-1920'
  const FETCHURL = `${APIBASEURL}/${GITUSER}/${REPONAME}`

  const forkers = await getForkers(FETCHURL)
    .then(async (entrys) => {
      writeForkers(JSON.stringify(entrys,null,2))
    })
}

function writeForkers(forkers) {
  fs.writeFileSync(`${__dirname}/data/forkers.json`, forkers, {
    flag: 'w'
  })
}

init()

