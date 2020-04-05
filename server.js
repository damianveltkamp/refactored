import express from 'express'
import compression from 'compression'
import fs from 'fs'

// Custom imports
import { getForkers, getCommits } from './src/scripts/api'
import { cleanGithubData, sortCommits } from './src/scripts/data'

const PORT = process.env.PORT || 4000,
      app = express(),
      COMPONENTPATH = `${__dirname}/src/components`,
      BUNDLE = getBundleUrls()

app
  .use(compression())
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'src/components')

// ROUTES
import home from './routes/home.js'
import detail from './routes/detail.js'
import offline from './routes/offline.js'
const FORKERS = fs.readFileSync('./data/forkers.json')

app
  .get('/', (req,res) => home(req,res,COMPONENTPATH,BUNDLE,FORKERS))
  .get('/detail/:id', (req,res) => detail(req,res,COMPONENTPATH,BUNDLE))
  .get('/offline', (req,res) => offline(req,res,COMPONENTPATH,BUNDLE))
  .listen(PORT, () => console.log(`Using port: ${PORT}`))


function getBundleUrls() {
  const BUNDLEFILENAMES = JSON.parse(fs.readFileSync(`static/bundle/manifest.json`))
  return BUNDLEFILENAMES
}
