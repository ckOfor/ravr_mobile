import firebase  from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrl8D5WbhGfQdm3kol2OfM5gu3YVZK_Oo",
  authDomain: "moovrider.firebaseapp.com",
  databaseURL: "https://moovrider.firebaseio.com",
  projectId: "moovrider",
  storageBucket: "moovrider.appspot.com",
  messagingSenderId: "961590332627"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
