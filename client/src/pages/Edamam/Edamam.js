import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import Wrapper from "../../components/Wrapper";
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
      recipeName: [],
      image: [],
      recipeLink: []
    };
  }

  // When the component mounts, load featured recipe
  // componentDidMount() {
  //   this.loadEdamamRecipes();
  // }

  // Loads FEATURED RECIPE ******* need to fix
  // loadRecipes = () => {
  //   API.getOneRecipe()
  //     .then(res =>
  //       this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin:"", labels:""  })
  //     )
  //     .catch(err => console.log(err));
  // };

    // Searches recipes using queryString
    loadEdamamRecipes = (queryString) => {
      API.searchEdamam(queryString)
        .then(res =>
          this.setState({ recipeResults: res.data.hits, image: res.data.hits[0].recipe.image, recipeName: res.data.hits[0].recipe.label, recipeLink: res.data.hits[0].recipe.url })
        )
        .catch(err => console.log(err));

    };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.searchRecipes method to get the recipe data from Edamam
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.queryString) {
      console.log(this.state.queryString);
      API.searchEdamam(this.state.queryString)
      //   {
      //   name: this.state.recipeName,
      //   image: this.state.image,
      //   link: this.state.recipeLink
      // })
        .then(res => this.loadEdamamRecipes(this.state.queryString))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            {/* <Jumbotron> */}
              <h1>Search</h1>
            {/* </Jumbotron> */}
            <form>
              <Input
                value={this.state.queryString}
                onChange={this.handleInputChange}
                name="queryString"
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
          <Col size="md-6">
          <h1>Search Results</h1>
          <Wrapper>
            {/* {this.state.receipeResults.map( */}
            <Card image={this.state.image} recipeName={this.state.recipeName} recipeLink={this.state.recipeLink} />
            {/* )} */}
          </Wrapper>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EdamamSearch;
