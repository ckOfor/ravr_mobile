import firebase  from 'firebase'

// Initialize Firebase
const driverFirebaseConfig = {
  apiKey: "AIzaSyCqMmYi3RJULoL5Zw84GOwB3dZ8xEm1EjU",
  authDomain: "moovdriver-b06c6.firebaseapp.com",
  databaseURL: "https://moovdriver-b06c6.firebaseio.com",
  projectId: "moovdriver-b06c6",
  storageBucket: "moovdriver-b06c6.appspot.com",
  messagingSenderId: "417994827469"
};

const firebaseDriverApp = firebase.initializeApp(driverFirebaseConfig, "driverApp")

export default firebaseDriverApp
