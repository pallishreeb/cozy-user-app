const firebaseConfig = {
  apiKey: 'AIzaSyC5vwwnf4uVTxeL_jxOCDpQf32VKWmlf5Y',
  authDomain: 'cozy-6d2b9.firebaseapp.com',
  projectId: 'cozy-6d2b9',
  storageBucket: 'cozy-6d2b9.appspot.com',
  messagingSenderId: '778884578932',
  appId: '1:778884578932:web:58ad997e276e66c48f5b21',
};

import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// import {getAuth} from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export {db};
