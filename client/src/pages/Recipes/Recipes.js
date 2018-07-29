import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

// S A V E D   R E C I P E S   L I S T

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      name: "",
      ingredients: "",
      description: "",
      origin: "",
      labels: "",
      user: ""
    };
  }

  // When the component mounts, load all recipes and save them to this.state.recipes
  componentDidMount() {
    this.loadRecipes();
  }

  // Loads all recipes  and sets them to this.state.recipes
  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin:"", labels:""  })
      )
      .catch(err => console.log(err));
  };

  // Deletes a recipe from the database with a given id, then reloads recipes from the db
  deleteRecipes = id => {
    API.deleteRecipes(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saverecipe method to save the recipe data
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.ingredients && this.state.description) {
      API.saveRecipes({
        //to add username to db
        user: firebase.auth().currentUser,
        name: this.state.name,
        ingredients: this.state.ingredients,
        description: this.state.description,
        sharable: true,
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
              <h1>Enter New Recipe</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.ingredients}
                onChange={this.handleInputChange}
                name="ingredients"
                placeholder="Ingredients (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (required)"
              />
              <FormBtn
                disabled={!(this.state.name && this.state.ingredients && this.state.description)}
                onClick={this.handleFormSubmit}
              >
                Submit Recipe
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Recipes On My List</h1>
            </Jumbotron>
            {this.state.recipes.length ? (
              <List>
                {this.state.recipes.map(recipes => {
                  return (
                    <ListItem key={recipes._id}>
                      <a href={"/recipes/" + recipes._id}>
                        <strong>
                          {recipes.name}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteRecipes(recipes._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Recipes;
