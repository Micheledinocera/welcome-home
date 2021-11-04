import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfigDev = {
  apiKey: "AIzaSyAX5Fff5zCNGwdYNMUNBz6SE6FDBePp5FY",
  authDomain: "welcome-home-dev.firebaseapp.com",
  projectId: "welcome-home-dev",
  storageBucket: "welcome-home-dev.appspot.com",
  messagingSenderId: "1036132358788",
  appId: "1:1036132358788:web:3477abe7bf019c3c8140d1",
};

export const db = firebase.initializeApp(firebaseConfigDev).firestore();
