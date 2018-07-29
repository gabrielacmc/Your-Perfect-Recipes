import React from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

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


  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };


  render() {
    return (
      <Container fluid>
        <Row>

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
