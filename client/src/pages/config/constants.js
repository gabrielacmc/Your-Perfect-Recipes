import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCGyfwSt_X1JxdYfNQIA-Zykb1VW3mSxEY",
    authDomain: "your-perfect-recipes.firebaseapp.com",
    databaseURL: "https://your-perfect-recipes.firebaseio.com",
    projectId: "your-perfect-recipes",
    storageBucket: "your-perfect-recipes.appspot.com",
    messagingSenderId: "426444960395"
  };
  firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const reference = firebase
export default firebase;