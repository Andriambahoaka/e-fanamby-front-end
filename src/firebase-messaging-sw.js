importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');
firebase.initializeApp({
 apiKey: "AIzaSyAtNcW0sCT-Wwuh5lx_lZMCgxazP8WlY7Y",
 authDomain:"cnm-front.firebaseapp.com",
 //databaseURL: “from firebase config”,
 projectId:"cnm-front",
 storageBucket: "cnm-front.appspot.com",
 messagingSenderId: "171413793893",
 appId: "1:171413793893:web:a1ff8cdff6f306a6b82a8c",
 measurementId: "G-3MT6TFTHJL"
});
const messaging = firebase.messaging();
/*

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      data: payload.data
  };
  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

*/
