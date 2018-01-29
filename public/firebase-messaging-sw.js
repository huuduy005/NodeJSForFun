// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': '568560799016'
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
var messaging = firebase.messaging();

// Installs service worker
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

self.addEventListener('notificationclick', (event) => {
    // Event actions derived from event.notification.data from data received
    var eventURL = event.notification.data;
    event.notification.close();
    if (event.action === 'confirmAttendance') {
        clients.openWindow(eventURL.confirm);
    } else {
        clients.openWindow(eventURL.decline);
    }
}, false);

messaging.setBackgroundMessageHandler((payload) => {
    // Parses data received and sets accordingly
    const data = JSON.parse(payload.data.notification);
    console.log(data)
    const notificationTitle = data.title;
    data.confirm = data.click_action;
    data.decline = 'https://jira.vexere.net/secure/Dashboard.jspa';
    const notificationOptions = {
        body: data.body,
        icon: '/images/jira.png',
        actions: [
            {action: 'confirmAttendance', title: '👍 Confirm attendance'},
            {action: 'cancel', title: '👎 Not coming'}
        ],
        // For additional data to be sent to event listeners, needs to be set in this data {}
        data: {confirm: data.confirm, decline: data.decline}
    };

    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
    // return self.registration.showNotification(notificationTitle, notificationOptions);
});
