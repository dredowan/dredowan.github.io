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
var ref = firebase.firestore().ref("/online/kTpCAcfzOqvGkV5kLRCb/status");
ref.onDisconnect().set(false);
// ... sometime later
ref.onDisconnect().cancel();
