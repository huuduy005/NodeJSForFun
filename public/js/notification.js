// Initialises firebase
// TODO: fill in firebase config information
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCE2baOi7OvUrIKbMRfCRIDPlf01s16OKE",
    authDomain: "hanghoa-vxr-72b12.firebaseapp.com",
    databaseURL: "https://hanghoa-vxr-72b12.firebaseio.com",
    projectId: "hanghoa-vxr-72b12",
    storageBucket: "hanghoa-vxr-72b12.appspot.com",
    messagingSenderId: "568560799016"
};
firebase.initializeApp(config);
var messaging = firebase.messaging();

// On load register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
                // Successfully registers service worker
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                messaging.useServiceWorker(registration);
            })
            .then(() => {
                // Requests user browser permission
                return messaging.requestPermission();
            })
            .then(() => {
                // Gets token
                return messaging.getToken();
            })
            .then((token) => {
                console.log(token)
                // Simple ajax call to send user token to server for saving
                if(!id) return;
                $.ajax({
                    type: 'POST',
                    url: '/firebase/setToken',
                    dataType: 'json',
                    data: JSON.stringify({token: token, jira_id: id}),
                    contentType: 'application/json',
                    success: (data) => {
                        console.log('Success ', data);
                    },
                    error: (err) => {
                        console.log('Error ', err);
                    }
                })
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    // ...
    const notificationTitle = 'onMessage';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };
    // return self.registration.showNotification(notificationTitle,
    //     notificationOptions);
});
