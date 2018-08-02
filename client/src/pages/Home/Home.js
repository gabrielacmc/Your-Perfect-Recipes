import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import fire from '../../components/config/Fire'

  class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Welcome to Home</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );

    }

}

export default Home;
