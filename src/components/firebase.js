import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA6vKVFike_pHQQYK0hWYxPeqyduJI0SUs",
    authDomain: "fir-pineapple-c91f0.firebaseapp.com",
    projectId: "fir-pineapple-c91f0",
    storageBucket: "fir-pineapple-c91f0.appspot.com",
    messagingSenderId: "419786831295",
    appId: "1:419786831295:web:2090d1a7409b3aea741d0a"
  };

firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();


  

export default firebase;
