importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const config = {
  apiKey: "AIzaSyDhLpyewy-F8gsE2YZ4fKe5Wqp1-0n57ec",
  authDomain: "aiiiis.firebaseapp.com",
  projectId: "aiiiis",
  storageBucket: "aiiiis.appspot.com",
  messagingSenderId: "22446133337",
  appId: "1:22446133337:web:9896215f75bbd9ad2b6148",
  measurementId: "G-6VQ5LLY7TZ"
};

firebase.initializeApp({
  messagingSenderId: '22446133337'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});