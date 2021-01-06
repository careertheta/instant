import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDPmWHPmG1CDpxFc3zzNU4exlbgOvHQfOQ",
    authDomain: "crystaltouch-73474.firebaseapp.com",
    projectId: "crystaltouch-73474",
    storageBucket: "crystaltouch-73474.appspot.com",
    messagingSenderId: "663968379230",
    appId: "1:663968379230:web:f13a8b156d8d61a80e9fcf",
    measurementId: "G-D0CGL54FK2"
  };

  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db , auth, storage};