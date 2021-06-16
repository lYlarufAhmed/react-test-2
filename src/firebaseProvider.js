import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyDyARogyyb0MyUD9TJoINWoJcNjq9WFIS8",
    authDomain: "inventory-management-42e1a.firebaseapp.com",
    projectId: "inventory-management-42e1a",
    storageBucket: "inventory-management-42e1a.appspot.com",
    messagingSenderId: "520446782492",
    appId: "1:520446782492:web:1b1043b069a81b0e34c3d9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const firestore = firebase.firestore()