import React, { Component } from "react";
import API from "../../utils/API";
import firebase from "../config/constants";
// import "./dashboard.css";

export default class SignInScreen extends Component {
  state = {
    uid: firebase.auth().currentUser.uid
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.getUserInfo(this.state.uid);
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
    return (
      <div>
        <div className="row">
          <label>Login Name</label>
          <input
            value={this.state.lName}
            onChange={this.handleInputChange}
            name="lName"
          />
          <a
            className="wave-effect wave-light btn black"
            onClick={() =>
              this.saveLogin(
                this.state.lName,
                this.state.uid
              )
            }
          >
            Submit
          </a>
        </div>
        <ul className="collection with-header">
          <h4 className="collection-header">Users</h4>
          {this.state.users.map(users => (
            <li key={users._id} className="row">
              <div className="users__name col m4 center">
                {users.loginName}
              </div>
              <div className="col m4">
                <a
                  className="wave-effect wave-light btn right pink"
                  onClick={() => this.deleteUserInfo(users._id)}
                >
                  Delete
                      </a>
              </div>

            </li>

          ))}


        </ul>

      </div>
    );
  }
}
