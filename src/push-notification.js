import firebase from 'firebase';

import apiConfig from "./util/apiConfig";
export const initializeFirebase = () => {

  if(!firebase.apps.length){
firebase.initializeApp({
  apiKey: apiConfig.apiKey,
  authDomain: apiConfig.authDomain,
  messagingSenderId: apiConfig.messagingSenderId
});
  }
// navigator.serviceWorker
//     .register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('Service worker registration succeeded:', registration);
//       firebase.messaging().useServiceWorker(registration);
//     });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        console.log('here in ask for permission....... :');
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      localStorage.setItem("notification-token",token);
      console.log('the token ....... :', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
  }