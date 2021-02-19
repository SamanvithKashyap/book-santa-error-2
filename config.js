import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyB7iwhG7tzPsmxP-JuonNHNLElnEYs0lvU",
    authDomain: "book-santa-49705.firebaseapp.com",
    projectId: "book-santa-49705",
    storageBucket: "book-santa-49705.appspot.com",
    messagingSenderId: "250133184431",
    appId: "1:250133184431:web:b4818c7c092b35b582f95a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();