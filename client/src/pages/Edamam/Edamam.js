import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import Wrapper from "../../components/Wrapper";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


let searchResults = [];
let cardID = [];

// S E A R C H  E D A M A M   A P I

class EdamamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // recipeResults: [],
      queryString: "",
      recipeID: [],
      // recipeName: "",
      // image: "",
      // recipeLink: "",
      showCard: false,
      like: false,
      save: false
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
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
      // loadEdamamRecipes(this.state.queryString);
      // API.searchEdamam(this.state.queryString)
      //   .then(res => this.loadEdamamRecipes(this.state.queryString))
      //   .catch(err => console.log(err));
      API.searchEdamam(this.state.queryString)
        .then(res => {
          searchResults = res.data.hits;
          // for(var i=0; i<searchResults.length; i++) {
          //   cardID.push(i);
          // };
          this.setState({ 
            showCard: true
           })
        }
          // this.setState({ recipeResults: res.data.hits, image: res.data.hits[0].recipe.image, recipeName: res.data.hits[0].recipe.label, recipeLink: res.data.hits[0].recipe.url })
        )
        .catch(err => console.log(err));

    }
  };

  //FIXXXXXXX :(
  handleBtnClick = (event, id) => {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("data-value").value;
    console.log(btnType);
    console.log(this.state);
    // const newState = { ...this.state };
    //mark recipe as "liked"
    if (btnType === "heart") {
      this.setState(prevState => ({
        like: !prevState.like
      }));
      // saveEdamamRecipe();

      console.log(this.props);  
      console.log(searchResults);
      // recipeFunctions.create( searchResults.)
    } else if (btnType === "bookmark") {
      this.setState(prevState => ({
        save: !prevState.save
      }));
    }    
  };
  
  saveEdamamRecipe = () => {
console.log("test");
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
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
          <Col size="md-9">
          <h1>Search Results</h1>
          <Wrapper showCard={this.state.showCard}>
            {searchResults.map((results, index) => (
              <Card 
                key={results.recipe.shareAs}
                image={results.recipe.image} 
                recipeName={results.recipe.label}
                recipeLink={results.recipe.url}
                recipeIngredients={results.recipe.ingredientLines}
                handleBtnClick={this.handleBtnClick}
                like={this.state.like ? "liked" : "unliked"}
                save={this.state.save ? "saved" : "unsaved"}
                recipeID={index}
              />
            ))}
          </Wrapper>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EdamamSearch;