import firebase from "firebase";

export function firebaseInit(){
    var firebaseConfig = {
        apiKey: "AIzaSyCxEbGu3YmVjIVa58nSU4f71J33mXwZlzU",
        authDomain: "moveit-5d519.firebaseapp.com",
        databaseURL: "https://moveit-5d519-default-rtdb.firebaseio.com",
        projectId: "moveit-5d519",
        storageBucket: "moveit-5d519.appspot.com",
        messagingSenderId: "979794970655",
        appId: "1:979794970655:web:f357c492112137bc44ad2a",
        measurementId: "G-022496E0KY"
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }   
}

export function getDatabase(){
    if (firebase.apps.length === 0) {
        firebaseInit();
    } 
    return firebase.firestore();
}