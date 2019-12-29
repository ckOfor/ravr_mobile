import firebase  from 'firebase'

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCR4NbErk9NyMctFUT0xXtzFVOCQOd7M28",
	authDomain: "ravr-56ee2.firebaseapp.com",
	databaseURL: "https://ravr-56ee2.firebaseio.com",
	projectId: "ravr-56ee2",
	storageBucket: "ravr-56ee2.appspot.com",
	messagingSenderId: "547133332369",
	appId: "1:547133332369:web:c2706c99ae3d2da1cdd830",
	measurementId: "G-EED3CBDLT0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
