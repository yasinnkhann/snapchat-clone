import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAM0EaL_RhnUyUGViPeRKsNRAtFRjuYS-0',
  authDomain: 'snapchat-clone-10002.firebaseapp.com',
  projectId: 'snapchat-clone-10002',
  storageBucket: 'snapchat-clone-10002.appspot.com',
  messagingSenderId: '1074064033085',
  appId: '1:1074064033085:web:604fd7a9f07f2e19043154',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
