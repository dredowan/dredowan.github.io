if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function () {
        console.log('Service worker registered!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log("GET IN");
  deferredPrompt = e;
});
