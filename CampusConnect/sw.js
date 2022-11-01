const staticCache = "Static-cache-v1";
const dynamicCache = "Dynamic-cache-v1";

const assets = [
    '/',
    "/index.html",
    "/js/app.js",
    "js/ui.js",
    "css/style.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://unicons.iconscout.com/release/v4.0.0/css/line.css"   
]

// Cache sieze limit
const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        caches.open(name).then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}

self.addEventListener("install", function(event) {
    // Fires whent the browser installs the app
    // Logging the event and the contents of the object passed to the event.
    // This event is give the service worker a place to setup the local
    // environment after the installation completes
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.open('static').then(function(cache) {
            console.log("SW: Precaching App Shell");
            cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", function(event) {
    // Fires when the service worker completes its installation
    // A place for the service worker to clean up from
    // previous service worker versions
    // console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                .filter((key) => key !== staticCache)
                .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    // Fires whenever the app requests a resource (file or data)
    // console.log(`SW: Event fired: ${event.request.url}`);
    // Go get the requested resource from the network
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return (
                    response ||
                    fetch(event.request).then((fetchRes) => {
                        return caches.open('dynamicCache').then((cache) => {
                            cache.put(event.request.url, fetchRes.clone());
                            return fetchRes;
                        });
                    })
                );
            })
            .catch(() => caches.match("/pages/fallback.html"))
    );
});