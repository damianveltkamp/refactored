export default function(req,res,COMPONENTPATH,BUNDLE) {
  res.render(`${COMPONENTPATH}/detail/views/detail`, {
    BASEPARTIALPATH: `${COMPONENTPATH}/base/views/partials`,
    bundledCSS: BUNDLE['main.css'],
    bundledJS: BUNDLE['main.js'],
    serviceWorker: BUNDLE['service-worker.js']
  })
}
