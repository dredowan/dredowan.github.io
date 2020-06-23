var firebaseConfig = {
    apiKey: "AIzaSyDb-ySFEOmjcLyNmdZSQt8EyciMnr-oVwk",
    authDomain: "borutoujmp.firebaseapp.com",
    databaseURL: "https://borutoujmp.firebaseio.com",
    projectId: "borutoujmp",
    storageBucket: "borutoujmp.appspot.com",
    messagingSenderId: "813637273069",
    appId: "1:813637273069:web:f28d9259a17cdd59d013e4"
};
firebase.initializeApp(firebaseConfig);
  function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    localStorage.userid = profile.getId();
    console.log('Name: ' + profile.getName());
    localStorage.playername = profile.getName();
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    window.location.href="menu.html";
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear();
      window.location.href="index.html";
    });
  }
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  var condition = navigator.onLine ? "online" : "offline";
  console.log(condition);
  if(condition == "online"){
    console.log("UPDATE ke database");
     var db = firebase.firestore();
    db.collection("leaderboard").doc(localStorage.userid).set({
        name: localStorage.playername,
        highscore: parseInt(localStorage.currentHighscore)
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });  
  }else{
    console.log("TETAP OFFLINE");
  }
}
