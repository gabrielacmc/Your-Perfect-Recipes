import React, { Component } from "react";
import API from "../../utils/API";
import firebase from "../config/constants";
// import "./dashboard.css";

export default class SignInScreen extends Component {
  state = {
    isSignedIn: false, //Local signed-in state.
    uid: firebase.auth().currentUser.uid
  };

  //Configure FirebaseUI
  uiConfig = {
    //Popup signin
    signInFlow: 'popup',
    //Display Google as auth providers
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      //Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //Listen to the Firebase Auth state and set the local state
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  //Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  saveLogin = (name, uid) => {
    API.saveLogin({ loginName: name, uid }).then(() => {
      this.getUserInfo(this.state.uid);
    });
  };

  getUserInfo = uid => {
    console.log(uid);
    API.getUserInfo(uid)
      .then(res => this.setState({ lName: "" }))
      .catch(err => console.log(err + "failed to get login"));
  };

  deleteUserInfo = watchId => {
    API.deleteUserInfo(watchId).then(res => this.getUserInfo(this.state.uid));
  };

  render() {
    if(!this.state.isSignedIn){
      return (
        <div>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
      );
    }
    return (
      <div>
        <p>Welcome {firebase.auth().currentUser.displayName}! </p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}