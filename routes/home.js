import fs from 'fs'
import {getCommits} from '../src/scripts/api'
import {cleanGithubData, sortCommits} from '../src/scripts/data'

export default async function(req,res,COMPONENTPATH,BUNDLE,FORKERS) {
  const APIBASEURL = 'https://api.github.com/repos'
  const GITUSER = 'cmda-minor-web'
  const REPONAME = 'progressive-web-apps-1920'
  const FETCHURL = `${APIBASEURL}/${GITUSER}/${REPONAME}`

  const forkerCommits = await getCommits(APIBASEURL, JSON.parse(FORKERS))
  console.log(forkerCommits)

  const cleanedForkers = await cleanGithubData(forkerCommits)
    .then(async (entrys) => {
      return await sortCommits(entrys)
    })

  res.render(`${COMPONENTPATH}/base/views/home`, {
    title: 'Overview',
    bundledCSS: BUNDLE['main.css'],
    bundledJS: BUNDLE['main.js'],
    serviceWorker: BUNDLE['service-worker.js'],
    forkers: cleanedForkers
  })
}
