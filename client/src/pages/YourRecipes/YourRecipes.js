import React from "react";
import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";



class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            searchRecipes: [],
            name: "",
            ingredients: "",
            description: "",
            origin: "",
            labels: "",
            selectedOption: "share",
            queryString: "",
            user: 'test'
        };
    }

    componentDidMount(user) {

        user = this.state.user;
        this.loadUserRecipes(user);

    }

    handleUpdate(isUpdate) {
        this.setState({ isUpdate: isUpdate })
    }


    //Load recipes associated wit that user
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
            .then(res => this.loadUserRecipes(this.state.user))
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
                user: this.state.user,
                name: this.state.name,
                ingredients: this.state.ingredients,
                description: this.state.description,
                sharable: this.state.selectedOption === "share"
            })
                .then(res => this.loadUserRecipes(this.state.user))
                .catch(err => console.log(err));
        }
    };

    //When a user searches for something, use the API to search for the term for that user
    handleSearchSubmit = (event, user) => {
        event.preventDefault();
        user = this.state.user
        if (this.state.queryString) {
            API.getRecipesUserQuery(user, this.state.queryString)
                .then(res => {
                    this.setState({ searchRecipes: res.data, name: "", ingredients: "", description: "", origin: "", labels: "" })
                }
                    // this.setState({ recipeResults: res.data.hits, image: res.data.hits[0].recipe.image, recipeName: res.data.hits[0].recipe.label, recipeLink: res.data.hits[0].recipe.url })
                ).then(
                )
                .catch(err => console.log(err));

        }
    };

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    buttonCreate = () => (
        <button onClick={() => this.handleUpdate(true)}>Create Recipe</button>

    )


    createRecipe = () => (
        <Col size="md-6 sm-12">
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
                <FormBtn
                    disabled={!(this.state.name && this.state.ingredients && this.state.description)}
                    onClick={this.handleFormSubmit}>
                    Submit Recipe
                     </FormBtn>
            </form>
        </Col>
    );



    favRecipe = () => (
        <div className="md-6 sm-12 offset-6">
            <Row>
                <Col size="md-4 sm-12">
                    <form>
                        <Input
                            value={this.state.queryString}
                            onChange={this.handleInputChange}
                            name="queryString"
                            placeholder="Search"
                        />
                        <FormBtn
                            disabled={!(this.state.queryString)}
                            onClick={this.handleSearchSubmit}
                        >
                            Search!
              </FormBtn>
                    </form>
                </Col>
            </Row>
            {this.state.searchRecipes.length ? (
                <List>
                    {this.state.searchRecipes.map(searchRecipes => {
                        return (
                            <ListItem key={searchRecipes._id}
                                recipeLink={"/recipes/" + searchRecipes._id}
                                recipeName={searchRecipes.name}
                                deleteRecipe={() => this.deleteRecipes(searchRecipes._id)}>
                            </ListItem>

                        );
                    })}
                </List>
            ) : (
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
                    </List>)}
        </div>

    )


    render() {
        if (this.state.isUpdate) 
            return (
                [this.createRecipe(), this.favRecipe()]
            )
        else return (
            [this.buttonCreate(), this.favRecipe()]
        );
    }

}

export default TestPage;