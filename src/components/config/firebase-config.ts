import firebase from 'firebase/app';
import 'firebase/firestore';


// App's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDt9nDGhuLjR084dqvR9XuLHWW0-L4nPuo",
    authDomain: "hospital-locator-app.firebaseapp.com",
    databaseURL: "https://hospital-locator-app.firebaseio.com",
    projectId: "hospital-locator-app",
    storageBucket: "hospital-locator-app.appspot.com",
    messagingSenderId: "619310474807",
    appId: "1:619310474807:web:9bc3343ad4781d972a81b2",
    measurementId: "G-HRW5JLXYCT"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;