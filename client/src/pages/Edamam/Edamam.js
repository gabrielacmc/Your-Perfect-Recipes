import React from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

// S E A R C H  E D A M A M   A P I

class EdamamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeResults: [],
      queryString: "",
      recipeName: "",
      image: "",
      recipeLink: ""
    };
  }

  // When the component mounts, load featured recipe
  componentDidMount() {
    this.loadRecipes();
  }

  // Loads FEATURED RECIPE ******* need to fix
  // loadRecipes = () => {
  //   API.getOneRecipe()
  //     .then(res =>
  //       this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin:"", labels:""  })
  //     )
  //     .catch(err => console.log(err));
  // };

    // Searches recipes using querystring
    searchEdamam = () => {
      API.searchRecipes()
        .then(res =>
          this.setState({ receipeResults: res.data, name: "", ingredients: "", description: "", origin:"", labels:""  })
        )
        .catch(err => console.log(err));
    };

  // When the form is submitted, use the API.searchRecipes method to get the recipe data from Edamam
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.queryString) {
      API.searchRecipes({
        name: this.state.recipeName,
        image: this.state.image,
        link: this.state.recipeLink
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for a Recipe!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.queryString}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Search"
              />
              <FormBtn
                disabled={!(this.state.queryString)}
                onClick={this.handleFormSubmit}
              >
                Search!
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EdamamSearch;
