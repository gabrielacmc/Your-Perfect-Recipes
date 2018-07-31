import React from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, RadioBtn } from "../../components/Form";
// import SignInScreen from "../Login"

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
      selectedOption:"share",
      user:'gabi'

    };
  }

  // When the component mounts, load all recipes and save them to this.state.recipes
  componentDidMount(user) {
    
    user = this.state.user;
    console.log(user);
    
    this.loadUserRecipes(user);

    
    
  }

  // Loads all recipes  and sets them to this.state.recipes
  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin: "", labels: "" })
      )
      .catch(err => console.log(err));
  };

  loadUserRecipes = (user) => {
    API.getRecipesUser(user)
    .then(res =>
      this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin: "", labels: "" })
    )
    .catch(err => console.log(err));
  }

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
    if (this.state.name && this.state.ingredients && this.state.description ) {
      API.saveRecipes({
        user: "gabi",
        name: this.state.name,
        ingredients: this.state.ingredients,
        description: this.state.description,
        sharable: this.state.selectedOption==="share"
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <TextArea
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
              <div className="radio">
                <RadioBtn
                  onChange={this.handleOptionChange}
                  name="share"
                  value="share"
                  checked = {this.state.selectedOption==="share"}>
                  Share
              </RadioBtn>
                <RadioBtn
                  onChange={this.handleOptionChange}
                  name="noShare"
                  value="noShare"
                  checked = {this.state.selectedOption==="noShare" }>
                  Do not Share
              </RadioBtn>
              </div>
                <FormBtn
                  disabled={!(this.state.name && this.state.ingredients && this.state.description)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Recipe
              </FormBtn>
            </form>
          </Col>
            <Col size="md-6 sm-12">
            
            {this.state.recipes.length ? (
              <List>
                {this.state.recipes.map(recipes => {
                  return (
                    <ListItem key={recipes._id}
                    recipeLink={"/recipes/" + recipes._id}
                    recipeName={recipes.name} 
                    deleteRecipe={() => this.deleteRecipes(recipes._id)}>
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
