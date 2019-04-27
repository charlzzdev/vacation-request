import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';

firebase.initializeApp({
      apiKey: "AIzaSyA0TE9Ro_4d053IklE1PkpQ6sT6irvcklg",
      authDomain: "szabadnap-precise-elektrik.firebaseapp.com",
      databaseURL: "https://szabadnap-precise-elektrik.firebaseio.com",
      projectId: "szabadnap-precise-elektrik",
      storageBucket: "szabadnap-precise-elektrik.appspot.com",
      messagingSenderId: "1040303550277"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
