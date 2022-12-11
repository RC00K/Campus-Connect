const staticCache = "Static-cache-v9";
const dynamicCache = "Dynamic-cache-v9";

const assets = [
  "/",
  "/index.html",
  "/404.html",
  "/landing.html",
  "/pages/calendar/calendar.html",
  "/pages/groups/groups.html",
  "/pages/messages/messages.html",
  "/pages/news/news.html",
  "//pages/prayer/prayer.html",
  "/pages/prayer/request.html",
  "/js/app.js",
  "/js/ui.js",
  "/css/bootstrap/bootstrap.min.css",
  "/js/bootstrap/bootstrap.min.js",
  "/css/ccstyle.css",
  "/css/navigation.css",
  "/css/post.css",
  "/images/sci-fi_header.png",
  "/images/campusconnect_logo.png",
  "/images/campusconnect_light.png",
  "/images/campusconnect_dark.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

//Cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", function (event) {
  //fires when the browser install the app
  //here we're just logging the event and the contents of the object passed to the event.
  //the purpose of this event is to give the service worker a place to setup the local
  //environment after the installation completes.
  console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      console.log("SW: Precaching App shell");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function (event) {
  //fires after the service worker completes its installation.
  // It's a place for the service worker to clean up from
  // previous service worker versions.
  // console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key != staticCache && key != dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});
//comment
self.addEventListener("fetch", function (event) {
  //fires whenever the app requests a resource (file or data)
  // console.log(`SW: Fetching ${event.request.url}`);
  //next, go get the requested resource from the network
  if (event.request.url.indexOf("firestore.googleapis.com") == -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 3);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => caches.match("/pages/404.html"))
    );
  }
});