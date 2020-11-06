import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC6cxzJj3Sow7JncgWztKP0UY2Yq0Pi9sY",
    authDomain: "social-media-app-cfc18.firebaseapp.com",
    databaseURL: "https://social-media-app-cfc18.firebaseio.com",
    projectId: "social-media-app-cfc18",
    storageBucket: "social-media-app-cfc18.appspot.com",
    messagingSenderId: "1042271569742",
    appId: "1:1042271569742:web:00cf796fd39720ef8e001f",
    measurementId: "G-42VY6QZNYM"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };