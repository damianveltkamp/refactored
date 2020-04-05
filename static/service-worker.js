const CORE_CACHE_VERSION = 'v1'
const PREFIXEDASSETS= serviceWorkerOption.assets.map(asset => {
  return `/bundle${asset}`
})
const CORE_ASSETS = [
  '/offline'
].concat(PREFIXEDASSETS)

self.addEventListener('install', event => {
  console.log('Installing Service Worker')
  event.waitUntil(
    caches.open(CORE_CACHE_VERSION)
    .then((cache) => cache.addAll(CORE_ASSETS))
    .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  console.log('Activating service worker')
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', event => {
  if (isCoreGetRequest(event.request)) {
    console.log('Core get request: ', event.request.url)
    event.respondWith(
      caches.open(CORE_CACHE_VERSION)
      .then(cache => cache.match(event.request.url))
    )
  } else if (isHtmlGetRequest(event.request)) {
    console.log('html get request', event.request.url)

    event.respondWith(
      caches.open('html-cache')
      .then(cache => cache.match(event.request.url))
      .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
      .catch(e => {
        return caches.open(CORE_CACHE_VERSION)
          .then(cache => cache.match('/offline'))
      })
    )
  }
})

function fetchAndCache(request, cacheName) {
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new TypeError('Bad response status');
      }

      const clone = response.clone()
      caches.open(cacheName).then((cache) => cache.put(request, clone))
      return response
    })
}

// Check functions
function isHtmlGetRequest(request) {
  return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}

function isCoreGetRequest(request) {
  return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}

function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}
