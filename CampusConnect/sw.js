const assets = [
    '/',
    "/index.html",
    "/js/app.js",
    "js/ui.js",
    "css/style.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://unicons.iconscout.com/release/v4.0.0/css/line.css"   
]

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
    console.log(`SW: Event fired: ${event.type}`);
});

self.addEventListener("fetch", function(event) {
    // Fires whenever the app requests a resource (file or data)
    console.log(`SW: Event fired: ${event.request.url}`);
    // Go get the requested resource from the network
    event.respondWith(fetch(event.request));
    caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    });
});