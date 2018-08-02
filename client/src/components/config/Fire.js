import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCGyfwSt_X1JxdYfNQIA-Zykb1VW3mSxEY",
  authDomain: "your-perfect-recipes.firebaseapp.com",
  databaseURL: "https://your-perfect-recipes.firebaseio.com",
  projectId: "your-perfect-recipes",
  storageBucket: "your-perfect-recipes.appspot.com",
  messagingSenderId: "426444960395"
};
const fire = firebase.initializeApp(config);
export default fire;