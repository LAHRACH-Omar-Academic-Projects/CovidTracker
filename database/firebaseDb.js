import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import auth from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB5YVd4yUoqrkMBZuW0kajISavK_tn-p4E",
    authDomain: "covidtracker-ea3ef.firebaseapp.com",
    databaseURL: "https://covidtracker-ea3ef.firebaseio.com",
    projectId: "covidtracker-ea3ef",
    storageBucket: "covidtracker-ea3ef.appspot.com",
    messagingSenderId: "477758766465",
    appId: "1:477758766465:web:35fc98ce376e8ce6f0fc80",
    measurementId: "G-8PSJR2NTLM"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

firebase.auth();

export default firebase;