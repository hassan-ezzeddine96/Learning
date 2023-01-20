import firebase from "firebase";
const config = {
    apiKey: "AIzaSyBFy8H4Q50dyd2XLdS-KE-d1-5jX-aNSpc",
    authDomain: "learning-52fbe.firebaseapp.com",
    databaseURL: "https://learning-52fbe.firebaseio.com",
    projectId: "learning-52fbe",
    storageBucket: "learning-52fbe.appspot.com",
    messagingSenderId: "92257685623",
    appId: "1:92257685623:web:ed6562e2a145954fc83672"
  };
  !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
  const database = firebase.database();

  export {
    database,
  };
