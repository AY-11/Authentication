import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCJT0jwNhHmtW8uyfovpF2Z6pANg1eqa64",
    authDomain: "emailauthentication-app.firebaseapp.com",
    projectId: "emailauthentication-app",
    storageBucket: "emailauthentication-app.appspot.com",
    messagingSenderId: "989380987087",
    appId: "1:989380987087:web:dd9ee833f9abf2937c8fba"
  };

const app = initializeApp(firebaseConfig);

export {app};

