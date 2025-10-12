// Service Worker for caching and offline support
const CACHE_NAME = "prime-logic-cache-v1"

// Assets to cache on install
const PRECACHE_ASSETS = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  "/offline.html", // Create this file for offline fallback
]

// Install event - precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name !== CACHE_NAME
            })
            .map((name) => {
              return caches.delete(name)
            }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - network first with cache fallback strategy
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and browser extensions
  if (
    event.request.method !== "GET" ||
    event.request.url.startsWith("chrome-extension") ||
    event.request.url.includes("extension") ||
    // Skip analytics and tracking requests
    event.request.url.includes("analytics") ||
    event.request.url.includes("tracking")
  ) {
    return
  }

  // For HTML pages - network first, then cache
  if (event.request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match("/offline.html")
          })
        }),
    )
    return
  }

  // For images - cache first, then network
  if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            const responseClone = fetchResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone)
            })
            return fetchResponse
          })
        )
      }),
    )
    return
  }

  // For other assets - stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
          .catch(() => {
            // If network fails and we don't have a cached response, return offline fallback
            if (!cachedResponse) {
              return caches.match("/offline.html")
            }
          })

        return cachedResponse || fetchPromise
      })
    }),
  )
})

// Handle push notifications (if needed)
self.addEventListener("push", (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})
