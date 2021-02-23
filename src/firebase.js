import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDioOVM8m6nsEbyCWLntO9xTv5gGpFVi3U",
  authDomain: "chatroom-6f641.firebaseapp.com",
  projectId: "chatroom-6f641",
  storageBucket: "chatroom-6f641.appspot.com",
  messagingSenderId: "1041151400714",
  appId: "1:1041151400714:web:a4432b37e4c8c6eac638f3",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
