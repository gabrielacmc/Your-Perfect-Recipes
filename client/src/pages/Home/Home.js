import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import firebase from "../config/constants";

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {

    return (
      <div className="App">
        {this.state.user ? (<Home />) : (<Login />)}
      </div>
    );

    // <Container fluid>
    //   <Row>
    //     <Col size="md-12">

    //         <h1>Welcome</h1>

    //     </Col>
    //   </Row>
    // </Container>
  }
}

export default NoMatch;
